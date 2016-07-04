$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = '' + position.coords.latitude;
      var lon = '' + position.coords.longitude;

      var jsonStr = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=de3ff0a0c0bf5f2f15dfc2ba99a90c1c";

      $.getJSON(jsonStr, function(json) {
        $("#location h4").text(json.name + ", " + json.sys.country);
        var ctemp = Math.round(json.main.temp - 273.15),
            ftemp = Math.round(json.main.temp * 9 / 5 - 459.67);
        $("#temperature h4").html(ctemp + "&deg;C");

        $("#ctemp").on("click", function() {
          $("#temperature h4").html(ctemp + "&deg;C");
          $("#ftemp").removeClass("btn-primary");
          $(this).addClass("btn-primary");
        });
        $("#ftemp").on("click", function() {
          $("#temperature h4").html(ftemp + "&deg;F");
          $("#ctemp").removeClass("btn-primary");
          $(this).addClass("btn-primary");
        });

        switch (json.weather.description) {
          case "clear sky":
            $(".icon.sunny").css('display', 'block');
            break;
          case "few clouds":
            $(".icon.cloudy").css('display', 'block');
            break;
          case "scattered clouds":
            $(".icon.cloudy").css('display', 'block');
            break;
          case "broken clouds":
            $(".icon.cloudy").css('display', 'block');
            break;
          case "shower rain":
            $(".icon.sun-shower").css('display', 'block');
            break;
          case "rain":
            $(".icon.rainy").css('display', 'block');
            break;
          case "thunderstorm":
            $(".icon.thunder-storm").css('display', 'block');
            break;
          case "snow":
            $(".icon.flurries").css('display', 'block');
            break;
          case "mist":
            $(".icon.sun-shower").css('display', 'block');
            break;
          default:
            $(".icon.sunny").css('display', 'block');
        }
        
        $("#loading").fadeOut();
        setTimeout(function() {
          $("#all_info").fadeIn();
        }, 500);
        
      });

    });
  } else {
    $("#location").text("You need to allow the browser to see your location.")
  }
});