Weather = (function($) {
    return {
        dynamicForecastesTemplate: function (forecastes) {
            var string = '<ul class="horizontal-list">';

            forecastes.forEach(function(forecast, index) {
                string += '<li id="' + index + '">'
                            + '<div class="high">' + forecast.high + '</div>'
                            + '<div class="day">' + forecast.day + '</div>'
                        + '</li>';
            });
            string += '</ul>';
            return string;
        },
        errorTemplate: function (err) {
            return ''
                + '<div class="hw">'
                    + '<h1>'
                        +  err
                    + '</h1>'
                + '</div>';
        },
        successTemplate: function (data) {
            return ''
                + '<div class="city">'
                    + '<h1 class="miasto">'
                        + data.city
                    + '</h1>'
                + '</div>'
                + '<div class="temp">'
                    + data.temp 
                + '</div>'
               
                + '<div id="currently">'
                    + data.pogoda
                   
                + '</div>'
                + Weather.dynamicForecastesTemplate(data.forecastes);
                
        }
    };
})(jQuery)

