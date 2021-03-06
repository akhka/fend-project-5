var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//  configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cors
app.use(cors());

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('App listening on port 8080!')
})


let savedTrip = {};

// Endpoints
app.get('/', function (req, res) {
    res.sendFile(path.resolve('/dist/index.html'));
});

app.get('/trip', (req, res) => {

    res.status(200).send(savedTrip);
});

app.post('/save', (req, res) => {

    const reqBody = req.body;

    console.log(reqBody.trip);

    if (!reqBody || !reqBody.trip) {
        return status(400).send("Invalid Request");
    }

    savedTrip.push(reqBody.trip);

    res.status(200).send(savedTrip);
});

app.get('/test', function(req, res){
    res.send('Test');
});

module.exports = {
    app
}