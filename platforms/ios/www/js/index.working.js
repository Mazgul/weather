(function($) {
    var maxDays = 5;

    var buildErrorTemplate = function (err) {
        return Weather.successTemplate(err);
    };

    var buildSuccessTemplate = function (data) {
        return Weather.successTemplate(data);
    };

    var loadWeather = function (config) {
        $.simpleWeather({
            location: config.location,
            woeid: config.woeid,
            unit: 'c',
            success: function(requestData) {
                var data = prepareWeatherData(requestData),
                    template = buildSuccessTemplate(data);

                $("#weather").html(template);
            },
            error: function(error) {
                var template = buildErrorTemplate(error);

                $("#weather").html(template);
            }
        });
    };

    var prepareWeatherData = function (data) {
        return {
            temp: data.temp + data.units.temp,
            city: data.city,
            currently: data.currently,
            forecastes: data.forecast.map(function (m) {
                    return {
                        day: m.day,
                        high: m.high
                    }
                }).slice(0, maxDays)
        };
    };

    var bindGeoButton = function () {
        $('.geo-button').on('click', function () {
            $('#weather').toggle(500);
        });
    };


    $(document).ready(function() {
        
        loadWeather({
            location: 'Cracow',
            woeid: ''
        });
    });

})(jQuery);
