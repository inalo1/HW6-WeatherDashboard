// let $weather = $("#mySearch")

let weather = "";

$("#searchBtn").on('click', function(){
  weather = $("#searchTerm").val()
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weather + "&&appid=919bda9b353ff6878f6c6628a095441a";
  weatherApiRequest(queryURL)
  })

  function weatherApiRequest(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.name);
      // console.log(LocalDate.now());
      // console.log(response.weather[0].icon);
      console.log(response.main.temp);
      let fahrenheitTemp = (response.main.temp - 273.15) * 1.80 + 32;
      fahrenheitTemp = Math.floor(fahrenheitTemp);
      console.log(fahrenheitTemp);
      console.log(response.main.humidity);
      console.log(response.wind.speed);
      
      
      // Code to transfer content to HTML
      let $city = $("#city");
      $city.text(response.name);
      
      //  let $date = $("#date");
      //  let currentDate = System.out.println(LocalDate.now ());
      //  $date.text(currentDate);
      
      let $icon = $("#icon");
      $icon.text(response.weather[0].icon);
      
      let $temp = $("#temp");
      $temp.text("Temperature: " + fahrenheitTemp + " °F");
      
      let $humid = $("#humid");
      $humid.text("Humidity: " + response.main.humidity + "%");
      
      let $wind = $("#wind");
      $wind.text("Wind Speed: " + response.wind.speed + " MPH");
      
      });
  }
