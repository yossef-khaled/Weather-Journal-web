// Setup empty JS object to act as endpoint for all routes
let projectData = { };   

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`It is running on localhost : ${port}`);
};

app.post('/addWeatherData', addWeatherData)

function addWeatherData(req, res) {
    //console.log(req.body);
    retrievedData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData = retrievedData;
}

app.get('/getWeatherData', getWeatherData)

function getWeatherData(req, res) {
    res.send(projectData);
    console.log(projectData);
}
