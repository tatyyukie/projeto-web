const email_input = document.querySelector('#email-input');
const password_input = document.querySelector('#password-input');
const login_button  = document.querySelector('.btn-login');
const logout_button = document.querySelector('.logout');

//Elementos da API OpenWeather
const api_key = '6235a22f6692e222b786ecbb1a900192';
const city_input = document.querySelector('.search-content .form-input');
const search_button = document.querySelector('.btn-search');
const city_label = document.querySelector('.city-name');
const temperature_label = document.querySelector('.temperature');
const weather_content = document.querySelector('.weather-content');
const weather_info = document.querySelector('.weather-item');
const weather_icon = document.querySelector('.weather-icon');

logout_button.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

if(localStorage.getItem('logado')){
    document.querySelector('.content.search').classList.remove('hidden');
    document.querySelector('.content.login').classList.add('hidden');
}

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
            localStorage.setItem('logado', true);
        })
        .catch(error => {
            console.log(error);
            document.querySelector('.error-msg').classList.remove('hidden');
        });
    }
});

//Função da API OpenWeather
search_button.addEventListener('click', () => {
    let city_name = city_input.value;

    if(city_name.length >= 3){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&APPID=${api_key}&units=metric`)
        .then(response => {
            city_label.innerHTML = response.data.name;
            temperature_label.innerHTML = Math.round(response.data.main.temp) +'°';
            weather_icon.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
            weather_info.classList.remove('hidden');
            weather_content.classList.remove('hidden');
        })
        .catch(error => {
            city_label.innerHTML = 'Insira uma cidade válida';
            weather_info.classList.add('hidden');
            weather_content.classList.remove('hidden');
        })
    }else{
        city_label.innerHTML = 'Insira uma cidade válida';
        weather_info.classList.add('hidden');
        weather_content.classList.remove('hidden');
    }
});