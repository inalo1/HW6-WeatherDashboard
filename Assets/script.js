// let cardCityEl = document.getElementById("card-city");
// let cardDateEl = document.getElementById("card-date");
// let cardTempEl = document.getElementById("card-temp");
// let cardHumidEl = document.getElementById("card-humid");
// let cardWindEl = document.getElementById("card-wind");
// let cardUvEl = document.getElementById("card-uv");

var weather = "Dallas";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + weather + "&&appid=919bda9b353ff6878f6c6628a095441a";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response);
    console.log(response.name);
    // console.log(response.weather[0].icon);
    console.log(response.main.temp);
    let fahrenheitTemp = (response.main.temp - 273.15) * 1.80 + 32;
      console.log(fahrenheitTemp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);


     // Code to transfer content to HTML
     let $city = $("#city");
     $city.text(response.name);

    //  let $date = $("#date");
    //  $date.text(response.name);
    
    //  let $icon = $("#icon");
    //  $icon.text(response.weather[0].icon);

     let $temp = $("#temp");
     $temp.text("Temperature: " + fahrenheitTemp + " °F");

     let $humid = $("#humid");
     $humid.text("Humidity: " + response.main.humidity + "%");

     let $wind = $("#wind");
     $wind.text("Wind Speed: " + response.wind.speed + " MPH");
     
    });

