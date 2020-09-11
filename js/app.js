let API__URL = "https://api.openweathermap.org/data/2.5/weather?q="
let API_UNITS = "&units=metric"
let API__KEY = "&appid=146e9d8ecf3687541626d9fb3d111734"
let cityInput = document.getElementById('city-input')
let cityName = document.querySelector('.city-name')
let checkCity = document.getElementById('check-city')
let currentLocation = document.getElementById('current-loctaion')
// let showCurrentLocation = document.querySelector('.show-currentLocation')
let showWeatherVideo = document.querySelector('#wheater-video')
let date = new Date();
let hour = date.getHours();


// Event handling for buttons "Check"

// Click for Check City button
checkCity.addEventListener('click', _ => getWeather(cityInput.value))

// Click for Check current location
currentLocation.addEventListener("click", function() {getLocation()});


// Create Function (Get Current Loacation)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        cityName.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayLocation(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            cityName.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            cityName.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            cityName.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            cityName.innerHTML = "An unknown error occurred."
            break;
    }
}


//Create Function (Display Location)
function displayLocation(latitude, longitude) {
    let geocoder
    geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({
            'latLng': latlng
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    let add = results[0].formatted_address;
                    let value = add.split(",");

                    count = value.length;
                    country = value[count - 1];
                    city = value[count - 2];
                    adress = value[count - 3];
                    correct = true;
                    cityName.innerHTML = city;


                    getWeather(city);

                } else {
                    cityName.innerHTML = "address not found";
                }
            } else {
                cityName.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
}


// Create (Get Weather) function
function getWeather(city) {
    $.getJSON(API__URL + city + API_UNITS + API__KEY,
        function (response) {
            let City = city;
            let country = response.sys.country;
            let wheater = response.weather[0].main;
            let temp = response.main.temp;
            let pressure = response.main.pressure;
            let windSpeed = response.wind.speed;
            weatherSet(City, country, wheater, temp, pressure, windSpeed);
        });
}

// Create (Weather Set) Function
function weatherSet(city, country, wheater, temp, pressure, windSpeed) {
    if (wheater == "Clear") {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/clearNight.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Clear" && (hour <= 20 && hour >= 6)) {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/clearDay.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Rain") {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/rain.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Clouds") {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/cloudsNight.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Clouds" && (hour <= 20 && hour >= 6)) {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/clouds.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Snow") {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/snow.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Mist") {
        showWeatherVideo.innerHTML =`
            <video autoplay muted loop id="myVideo">
                <source src="videos/mist.mp4" type="video/mp4">
            </video>`
    }
    if (wheater == "Thunderstorm") {
        showWeatherVideo.innerHTML = `
            <video autoplay muted loop id="myVideo">
                <source src="videos/thunderstorm.mp4" type="video/mp4">
            </video>`
    }

    // Show Output
    document.getElementById('city-info').innerHTML = `${city}  ${country}`
    document.getElementById('wheat-info').innerHTML = wheater
    document.getElementById('temp-info').innerHTML = `${temp} &deg;C`
    document.getElementById('pressure-info').innerHTML = `${pressure} hPa`
    document.getElementById('windSpeed-info').innerHTML = `${windSpeed} m/s`
    $("#wheater-info").show()
}