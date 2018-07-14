const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.connect(process.env.MONGODB_URI);

const Lecture = mongoose.model('Lecture', {
    length: {
        type: Number,
        required: true
    },
    kid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    impressions: {
        type: Number,
        required: false
    },
    averageEmotion: {
        type: Object,
        required: false
    },
    positivityScore: {
        type: Object,
        required: false
    },
    totalScore: {
        type: Number,
        required: false
    },
    frames: {
        type: Array,
        required: true
    },
});

//CHANGE
const request = require('request');
const rp = require('request-promise');
const fs = require('fs');
//CHANGE
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage: storage});
//CHANGE

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());

app.get('/ping', function (req, res) {
    return res.send('pong');
});
//CHANGE
app.post('/', upload.single('avatar'), (req, res) => {
    console.log('yay');
    let lectureDetails = {title: req.body.title, description: req.body.description, date: req.body.date};
    // console.log("src:", req.file.destination + req.file.filename);

    const ngrok = 'http://e91e45b4.ngrok.io';
    console.log(`${ngrok}/${req.file.destination}${req.file.filename}`);
    console.log(req.file);
    rp({
        url: `https://api.kairos.com/v2/media?source=${ngrok}/${req.file.filename}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "app_id": '2f35f886',
            "app_key": 'e026f72801a50407fe178a5140d4b611'
        }
    })
        .then(response => {
            let resp = JSON.parse(response);
            let result = handleData(resp, lectureDetails);
            res.redirect('localhost:3000/history');
            //res.json(result);
        }).catch(err => {
        console.log(err);
        res.status(500).end(err);
    })
});

app.get('/video/:kid', function(req, res){
    Lecture.findOne({kid: req.params.kid})
        .then((response) => {
            if(!response){
                res.send('Could not find data. It is possible that it is still processing');
            } else{
                res.send(response);
            }
        })
        .catch((err) => {
            res.send(err);
        })
});

app.get('/videoscores/:kid', function(req, res){
    Lecture.findOne({kid: req.params.kid})
        .then((response) => {
            if(!response){
                console.log('Cannot find specific video for /videoscores/');
                res.send('Could not find data. It is possible that it is still processing');
            } else{
                let totalScore = 0;
                let scores = response.frames.map((frame)=> {
                    let emotion = frame.emotions;
                    let time = {};
                    time.timeStamp = frame.timeStamp;
                    let anger = emotion.anger * .2;
                    let disgust = emotion.disgust * .2;
                    let joy = emotion.joy * .3;
                    let sadness = emotion.sadness * .1;
                    let surprise = emotion.surprise * .2;
                    time.score = 50 - anger - disgust - sadness + joy + surprise;
                    totalScore += time.score;
                    return time;
                });
                let avgScore = totalScore/scores.length;
                console.log('Handling request for video analytics');
                res.send({timedScore: scores, aggScore: avgScore});
            }
        })
        .catch((err) => {
            res.send(err);
        })
});

app.get('/videos/all', function(req, res){
    Lecture.find()
        .then(resp => {
            console.log('Handling request for all videos');
            res.send(resp)
        })
        .catch(err => {
            console.log('Error handling request for all videos');
            res.send(err)
        });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Post to /upload should have a key in body called 'Content' with
//the response to the kairos request as the value
function handleData(data, details) {
    let mediaObject = data;
    console.log('Kid assigned: ' + mediaObject.id);
    if(!mediaObject.id){
        console.log('Kid not given!!');
        console.log('Object returned from Kairos: ');
        console.log(mediaObject);
        return {id: undefined};
    }
    console.log('Media is being processed!');
    setTimeout(() => fetchMedia(mediaObject.id, details), 10000);
    return {id: mediaObject.id};
}

function fetchMedia(id, details){
    fetch(`https://api.kairos.com/v2/media/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "app_id": "2f35f886",
            "app_key": "e026f72801a50407fe178a5140d4b611"
        }
    }).then(response => {
        return response.json();
    }).then(resObj => {
        //console.log(resObj);
        let mediaObject = resObj;
        if(mediaObject.status_code === 3){
            console.log(`Invalid ID of '${id}' given to Kairos! No such media exists`);
            return;
        }
        if(!mediaObject.frames){
            console.log('Media is still being processed!');
            setTimeout(() => fetchMedia(id, details), 10000);
        } else{
            let frames = [];
            let avgAnger = 0;
            let avgDisgust = 0;
            let avgFear = 0;
            let avgJoy = 0;
            let avgSadness = 0;
            let avgSurprise = 0;
            mediaObject.frames.forEach((frame, frameIndex) => {
                let totalPeople = frame.people.length;
                let angerSum = 0;
                let disgustSum = 0;
                let fearSum = 0;
                let joySum = 0;
                let sadnessSum = 0;
                let surpriseSum = 0;
                frame.people.forEach((person) => {
                    angerSum += person.emotions.anger;
                    disgustSum += person.emotions.disgust;
                    fearSum += person.emotions.fear;
                    joySum += person.emotions.joy;
                    sadnessSum += person.emotions.sadness;
                    surpriseSum += person.emotions.surprise;
                });
                avgAnger += angerSum / totalPeople;
                avgDisgust += disgustSum / totalPeople;
                avgFear += fearSum / totalPeople;
                avgJoy += joySum / totalPeople;
                avgSadness += sadnessSum / totalPeople;
                avgSurprise += surpriseSum / totalPeople;

                if(frameIndex % 10 === 9){
                    frames.push({
                        timeStamp: frame.time,
                        emotions: {
                            anger: avgAnger/10,
                            disgust: avgDisgust/10,
                            fear: avgFear/10,
                            joy: avgJoy/10,
                            sadness: avgSadness/10,
                            surprise: avgSurprise/10
                        }}
                    );
                    avgAnger = 0;
                    avgDisgust = 0;
                    avgFear = 0;
                    avgJoy = 0;
                    avgSadness = 0;
                    avgSurprise = 0;
                }
            });
            console.log('Media done processing...');
            console.log('Video length is: ' + mediaObject.length);
            console.log('Saving video details');
            let newLecture = new Lecture({
                length: mediaObject.length,
                frames: frames,
                kid: id,
                title: details.title,
                description: details.description,
                date: details.date
            });
            console.log(newLecture);
            newLecture.save()
                .then((resp) => {
                    console.log('Media was saved! ' + resp._id);
                    setTimeout(() => averageAnalytics(id), 1000);
                })
                .catch(err => console.log('Error occurred while saving: ' + err))
        }
    }).catch(err => console.log(err))
}

function averageAnalytics(id){
    fetch(`https://api.kairos.com/v2/analytics/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "app_id": "2f35f886",
            "app_key": "e026f72801a50407fe178a5140d4b611"
        }
    }).then((response) => {
        return response.json();
    }).then((analytics) => {
        let numStudents = analytics.impressions.length;
        let avgAnger = 0;
        let avgDisgust= 0;
        let avgFear = 0;
        let avgJoy = 0;
        let avgSadness = 0;
        let avgSurprise = 0;

        let negativeAvg = 0;
        let neutralAvg = 0;
        let positiveAvg = 0;

        analytics.impressions.forEach((person) => {
            let emotion = person.average_emotion;
            let posScore = person.emotion_score;
            avgAnger += emotion.anger;
            avgDisgust += emotion.disgust;
            avgFear += emotion.fear;
            avgJoy += emotion.joy;
            avgSadness+= emotion.sadness;
            avgSurprise+= emotion.surprise;
            negativeAvg += posScore.negative;
            neutralAvg += posScore.neutral;
            positiveAvg += posScore.positive;
        });

        let avgEmotion = {
            anger: avgAnger/numStudents,
            disgust: avgDisgust/numStudents,
            fear: avgFear/numStudents,
            joy: avgJoy/numStudents,
            sadness: avgSadness/numStudents,
            surprise: avgSurprise/numStudents,
        };
        let posLevel = {
            positive: positiveAvg/numStudents,
            negative: negativeAvg/numStudents,
            neutral: neutralAvg/numStudents
        };

        Lecture.findOneAndUpdate({kid: id},
            {impressions: numStudents,
                averageEmotion: avgEmotion,
                positivityScore: posLevel})
            .then((resp) => {
                if(resp){
                    console.log('Media analytics updated and saved in database!')
                } else{
                    console.log('Something happened when adding analytics to database!')
                }
            })
            .catch((err) => {console.log('An error occurred when saving analytics! ' + err)})
    }).catch((error) => {console.log('Uh oh: An error occurred when fetching analytics ' + error)})
}

app.post('/upload/test', function(req, res){
    let mediaObject = req.body.content;
    console.log('Getting stuff!');
    console.log(mediaObject);
    res.send('Cool!');

});



app.listen(process.env.PORT || 1337);