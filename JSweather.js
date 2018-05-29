var city = "test";
var unit = "metric";
var apiKey = 'b86573efac7f1356d2e37b635803f799'; //YOU NEED YOUR OWN API KEY
var url = "";
var units = {
    "metric": {
        "apihandle": "metric",
        "windtext": "m/s",
        "temptext": "°C",
    },
    "imperial": {
        "apihandle": "imperial",
        "windtext": "miles/h",
        "temptext": "°F",
    }
};

//MORE PRECISELY THAN LONGITUDE AND LATITUDE AND NO ALERTS
function getcity(unit) {
    $.getJSON("http://freegeoip.net/json/?callback=?", function (datas) {
        city = datas.city;
        getweather(unit);
    });
}

function apiUrl(unit) {
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=" + unit + "";
}

function getweather(test) {
    apiUrl(test.apihandle);
    $.getJSON(url, function (data) {
        $('#location').html(city);
        var icon = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        $('#img').attr('src', iconurl);
        $('#desc').html(data.weather[0].description);
        $('#temp').html(data.main.temp + ' ' + test.temptext);
        $('#windspeed').html(data.wind.speed + ' ' + test.windtext);
        $('#clouds').html(data.clouds.all + ' %');
    });
};


$("#temp").click(function () {
    unit = unit === "imperial" ? "metric" : "imperial";
    if (unit === "imperial") {
        getweather(units.imperial);
    } else {
        getweather(units.metric);
    }
    //     unit = unit === "imperial" ? "metric" : "imperial"; // IF THIS WILL BE HERE, YOU NEED TO CLICK TWICE A BUTTON AT FIRST TIME AFTER LOAD
    if (unit == "metric") {
        $("#temp").text("°C");
    } else {
        $("#temp").text("°F");
    }
});


$(document).ready(function () {
    getcity(units.metric);
});

document.body.style.backgroundColor = "#415403";
