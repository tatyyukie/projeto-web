const api_key = '6235a22f6692e222b786ecbb1a900192';
const input = document.querySelector('.search-content .form-input');
const search_button = document.querySelector('.btn-search');
const city_label = document.querySelector('.city-name');
const temperature_label = document.querySelector('.temperature');
const weather = document.querySelector('.weather-content');

search_button.addEventListener('click', () => {
    let city_name = input.value;
    if(city_name != ''){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=${api_key}&units=metric`)
        .then(response => {
            console.log(response);
            city_label.innerHTML = response.data.name;
            temperature_label.innerHTML = Math.round(response.data.main.temp) +'°';
            weather.classList.remove('hidden');
        })
        .catch(error => {
            city_label.innerHTML = 'Insira uma cidade válida';
            temperature_label.innerHTML = '';
            weather.classList.remove('hidden');
            console.log(error);
        })
    }
});
