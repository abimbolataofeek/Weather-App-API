const { strings } = require("@material/textfield");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const place = req.body.cityName;
    const apiKey = "98c7c32c4a86e78598dd8744ef4d5476";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q= " + place + "&APPID=" + apiKey + "&unit=" + unit + " ";

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
           
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + ".<p>");
            res.write("<h1>The tempreature in "+ place+" is " + temp + " degrees Celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
            
        });
    });
}); 

app.listen("9000", () => {
    console.log("Weather app server is running on port 9000");
});






 // JSON.parse to convert the data to javascript object
            // JSON.stringify turns js Object to  strings
            // we can only one res.send in a server
            // res.write to render multilpe lines to the server

             // console.log(weatherData);
            // console.log(weatherDescription);