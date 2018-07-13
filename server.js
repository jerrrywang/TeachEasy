const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
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

app.listen(process.env.PORT || 1337);