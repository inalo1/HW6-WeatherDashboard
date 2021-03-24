let apiKey = '919bda9b353ff6878f6c6628a095441a'
let cityName = "";
let curName = "";
let curTemp = "";
let curHumid = "";
let curWind = "";
let curUV = "";
let curIcon = "";
let cities = [];

cityWeather();
init();
fiveDay();

function cityWeather() {

    let today = moment().format("MM/D/YY");
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    $.ajax({
        url: queryURL
    }).then(response => {

        $.ajax(`https://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${apiKey}`).then(uvResp => {
            let uvData = `<p>UV Index: ${uvResp.value} </p>`
            $("#mainData").append(uvData)
        })
        curName = response.name;
        curTemp = response.main.temp;
        curWind = response.wind.speed;
        curHumid = response.main.humidity;
        curIcon = response.weather[0].icon;
        let mainData = `<h2>${curName} (${today})<img src="http://openweathermap.org/img/w/${curIcon}.png"></img></h2>
                            <p>Temperature: ${curTemp} °F</p>
                            <p>Humidity: ${curHumid}%</p>
                            <p>Wind Speed: ${curWind} MPH</p>
                           `
        $("#mainData").append(mainData)

    });
};

function fiveDay() {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=0&units=imperial&appid=${apiKey}`
    $.ajax({
        url: queryURL
    }).then(forecast => {
        console.log(forecast)
        for (let i = 0; i < 40; i += 8) {
            foreDate = (forecast.list[i].dt_txt).slice(0, -8)
            foreTemp = forecast.list[i].main.temp
            foreIcon = forecast.list[i].weather[0].icon
            foreHumid = forecast.list[i].main.humidity
            let cardData = `<div class="card mx-1 border-light bg-primary rounded" style="width: 10rem;">
                              <div class="card-body  text-white">
                               <h5 class="card-title">${foreDate}</h5>
                               <p class="card-text"><img src="http://openweathermap.org/img/w/${foreIcon}.png"></img></p>
                               <p class="card-text">Temp: ${foreTemp} °F</p>
                               <p class="card-text">Humidity: ${foreHumid}%</p>
                              </div>
                            </div>`
            $("#forecast").append(cardData)
        }
    });
}

$("#search").on("click", function(event) {
    event.preventDefault();
    cityName = $("#city").val();
    cities.push(cityName)

    buildList();
    $("#forecast").empty();
    $("#mainData").empty();
    cityWeather(cityName);
    fiveDay(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));

});

function buildList() {
    $("#history").empty();
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i]
        let cityList = `<li id="list" class="list-group-item list-group-item-action">${city}</li>`
        $("#history").prepend(cityList)
    }
};

function init() {
    let citiesSaved = JSON.parse(localStorage.getItem("cities"));
      if (citiesSaved !== null) {
          cities = citiesSaved;
      }
    buildList();
}

$("li").on('click', function(event) {
    event.preventDefault();
    let histSearch = $(this).closest("#list").text()
    console.log(histSearch)
    cityName = histSearch
    $("#forecast").empty();
    $("#mainData").empty();
    cityWeather(cityName);
    fiveDay(cityName);
})