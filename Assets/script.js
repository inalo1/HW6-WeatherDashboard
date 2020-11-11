// let cardCityEl = document.getElementById("card-city");
// let cardDateEl = document.getElementById("card-date");
// let cardTempEl = document.getElementById("card-temp");
// let cardHumidEl = document.getElementById("card-humid");
// let cardWindEl = document.getElementById("card-wind");
// let cardUvEl = document.getElementById("card-uv");

var weather = "Dallas";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + weather + "2e55b9709282b2b6bdccfbaedeb0ba5f";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response)
  
});

