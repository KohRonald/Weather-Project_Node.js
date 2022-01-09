const express = require("express");
const https = require("https");
const app = express();

// Weather Project with Node.js and Open Weather API built by Ronald, with the guide of "The Complete 2022 Web Development Bootcamp Course" by Dr. Angela Yu
// This project does not catch invalid city inputs

app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

    var city = req.body.city;
    const units = "units=metric";
    const apiKey = "appid="; //Enter your apiKey
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&" + units + "&" + apiKey;

    https.get(url, function(response) {
        console.log(response.statusCode); //log status code

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            console.log(weatherDescription, temp); //log information to console
            res.write("<h1>The weather in " + city + " is currently " + weatherDescription + "</h1>");
            res.write("<h2>The temperature is " + temp + " degree Celcius.</h2>");
            res.write("<img src = " + icon + ">");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server is up on Port:3000");
})