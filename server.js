const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const Lecture = mongoose.model('Lecture', {
    frames: Array,
    length: Number,
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
    // console.log("src:", req.file.destination + req.file.filename);

    const ngrok = 'https://7542f2fc.ngrok.io';
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
        console.log(response);
    //     return response.json();
    // }).then(resObj => {
    //     console.log(resObj)
    }).catch(err => console.log(err))
});
//CHANGE

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Post to /upload should have a key in body called 'Content' with
//the response to the kairos request as the value
app.post('/upload', function(req, res){
    let mediaObject = req.body.content;
    let frames = [];
    mediaObject.frames.forEach((frame) => {
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
        frames.push(
            {timeStamp: frame.time,
             emotions: {
                    anger: angerSum/totalPeople,
                    disgust: disgustSum/totalPeople,
                    fear: fearSum/totalPeople,
                    joy: joySum/totalPeople,
                    sadness: sadnessSum/totalPeople,
                    surprise: surpriseSum/totalPeople}
            });
    });
    console.log(frames);
    let newLecture = new Lecture({length: mediaObject.time, frames: frames});

    newLecture.save()
        .then((result) => {res.json({id: result.id})})
        .catch((err) => res.status(500).end(err.message));

});

app.post('/upload/test', function(req, res){
    let mediaObject = req.body.content;
    console.log('Getting stuff!');
    console.log(mediaObject);
    res.send('Cool!');

});



app.listen(process.env.PORT || 1337);