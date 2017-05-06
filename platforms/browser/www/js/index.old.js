
if ("geolocation" in navigator) {
  $('.geo-button').show(); 
} else {
  $('.geo-button').hide();
}



$('.geo-button').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); 
  });
});


$(document).ready(function() {
  loadWeather('Cracow',''); 
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = weather.temp + weather.units.temp;
      html += weather.city;
      html += weather.currently;


      for(var i=0;i<5;i++) {
        html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].m.high+'</p>';
      }
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}


