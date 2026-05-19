const apiKey = "YOUR_REAL_API_KEY";
const getWeather = (city) => {
    cityName.innerHTML = city
    loading.style.display = "block";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            setTimeout(() => {
                loading.style.display = "none";
            }, 800);
            // cloud_pct.innerHTML = response.main.maincloud_pct
            temp.innerHTML = response.main.temp
            temp2.innerHTML = response.main.temp
            feels_like.innerHTML = response.main.feels_like
            humidity.innerHTML = response.main.humidity
            humidity2.innerHTML = response.main.humidity
            min_temp.innerHTML = response.main.temp_min
            max_temp.innerHTML = response.main.temp_max
            wind_speed.innerHTML = response.wind.speed
            wind_speed2.innerHTML = response.wind.speed
            wind_degrees.innerHTML = response.wind.deg
            sunrise.innerHTML = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
            sunset.innerHTML = new Date(response.sys.sunset * 1000).toLocaleTimeString();


        })
        .catch(err => {

            setTimeout(() => {
                loading.style.display = "none";
            }, 800);


            console.error(err);
        });

}

//  Search button click
submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
})

// ⌨ Enter key triggers search
city.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        getWeather(city.value)
    }
})

//  On page load: fetch Delhi for cards + all table cities
window.addEventListener('DOMContentLoaded', () => {
    getWeather('Delhi');
    loadTableCities();
})