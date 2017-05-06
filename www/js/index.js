(function ($) {
    var maxDays = 6;

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
            success: function (requestData) {
                var data = prepareWeatherData(requestData),
                    template = buildSuccessTemplate(data);

                $("#weather").html(template);
            },
            error: function (error) {
                var template = buildErrorTemplate(error);

                $("#weather").html(template);
            }
        });
    };

    var prepareWeatherData = function (data) {
        var status = '';
        if (data.currently == 'Cloudy') {
            $('body').css('background-image', 'url("img/cloudy.jpeg")');
            status = 'Pochmurnie';
        } else
        if (data.currently == 'Showers') {
            $('body').css('background-image', 'url("img/rainy.jpeg")');
            status = 'Deszczowo';
        } else
        if (data.currently == 'Sunny') {
            $('body').css('background-image', 'url("img/sunny.jpg")');
            status = 'Słonecznie';
        } else
        if (data.currently == 'Mostly Cloudy') {
            $('body').css('background-image', 'url("img/mostlyCloudy.jpeg")');
            status = 'Częściowe Zachmurzenie';
        } else
        if (data.currently)
            status = data.currently;
        return {

            pogoda: status,
            temp: data.temp + '&deg;' + data.units.temp,
            city: data.city,
            currently: data.currently,
            forecastes: data.forecast.map(function (m) {
               if (m.day== 'Sat')
                   m.day = 'Sob';
                else
                if (m.day== 'Sun')
                   m.day = 'Ndz';
                else
                if (m.day== 'Mon')
                   m.day = 'Pon';
                else
                if (m.day== 'Tue')
                   m.day = 'Wto';
                 else
                if (m.day== 'Wed')
                   m.day = 'Śro';
                 else
                if (m.day== 'Thu')
                   m.day = 'Czw';
                 else
                if (m.day== 'Fri')
                   m.day = 'Pt';
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

    $(document).ready(function () {
        loadWeather({
            location: 'riodejaneiro',
            woeid: ''
        });
    });

})(jQuery);
