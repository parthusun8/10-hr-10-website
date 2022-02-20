const API_URL = "https://api.weatherapi.com/v1";

const API_KEY = "ac6a7d83909f4a25bcd75758222002";
let locationName = "";
const time = new Date();
const timeHour = time.getHours();

// fetchForecastWeatherDetails("Kolkata");

async function fetchWeatherDetails(location){
    const resp = await fetch(API_URL + "/forecast.json?key=" + API_KEY + "&q=" + location + "&days=8"); 

    const respData = await resp.json();
    // console.log(respData);
    return respData;
}


async function addWeather(){
    const details = await fetchWeatherDetails(locationName);
    const name = details.location;
    // console.log(name);

    const currentWeather = details.current;
    const forecastWeather = details.forecast.forecastday;
    console.log(forecastWeather);

    document.body.innerHTML = '';
    const weatherEl = document.createElement('div');
    weatherEl.classList.add("container");

    weatherEl.innerHTML = `<div class="img-container">
        <h1>${name.name}</h1>
        <h2>${currentWeather.temp_c}&#176;</h2>
        <h3>${currentWeather.condition.text}</h3>
        <img src="${currentWeather.condition.icon}"></img>
        </div>
        <div class="forecast-container">
            <div class="forecast">
                <span class="date">${forecastWeather[0].date}</span><span class="temp">${forecastWeather[0].hour[timeHour].temp_c}&#176;</span
                ><img src="${forecastWeather[0].hour[timeHour].condition.icon}" alt="" class="icon" />
            </div>
            <div class="forecast">
                <span class="date">${forecastWeather[1].date}</span><span class="temp">${forecastWeather[1].hour[timeHour].temp_c}&#176;</span
                ><img src="${forecastWeather[1].hour[timeHour].condition.icon}" alt="" class="icon" />
            </div>
            <div class="forecast">
                <span class="date">${forecastWeather[2].date}</span><span class="temp">${forecastWeather[2].hour[timeHour].temp_c}&#176;</span
                ><img src="${forecastWeather[2].hour[timeHour].condition.icon}" alt="" class="icon" />
            </div>
        </div>
    `;

    document.body.appendChild(weatherEl);
}


const inputEl = document.getElementById("location");
const formEl = document.getElementById("form");
// console.log(inputEl);
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    locationName = inputEl.value;
    const str2 = locationName.charAt(0).toUpperCase() + locationName.slice(1);
    locationName = str2;
    addWeather();

});

