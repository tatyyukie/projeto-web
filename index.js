const email_input = document.querySelector('#email-input');
const password_input = document.querySelector('#password-input');
const login_button  = document.querySelector('.btn-login');

//Elementos da API OpenWeather
const api_key = '6235a22f6692e222b786ecbb1a900192';
const city_input = document.querySelector('.search-content .form-input');
const search_button = document.querySelector('.btn-search');
const city_label = document.querySelector('.city-name');
const temperature_label = document.querySelector('.temperature');
const weather = document.querySelector('.weather-content');
const weather_icon = document.querySelector('.weather-icon');

login_button.addEventListener('click', () => {
    let email = email_input.value;
    let password = password_input.value;
  
    if(email.length >= 3 && password.length >= 3) {
        axios.post('https://reqres.in/api/login', {
            email: email,
            password: password
        })
        .then(() => {
            document.querySelector('.content.search').classList.remove('hidden');
            document.querySelector('.content.login').classList.add('hidden');
        })
        .catch(error => {
            console.log(error);
        });
    }
});

//Função da API OpenWeather
search_button.addEventListener('click', () => {
    let city_name = city_input.value;
    if(city_name != ''){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=${api_key}&units=metric`)
        .then(response => {
            city_label.innerHTML = response.data.name;
            temperature_label.innerHTML = Math.round(response.data.main.temp) +'°';
            weather_icon.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
            weather.classList.remove('hidden');
        })
        .catch(error => {
            city_label.innerHTML = 'Insira uma cidade válida';
            temperature_label.innerHTML = '';
            weather.classList.remove('hidden');
        })
    }
});
