const email_login = document.querySelector('.email-login');
const password_login = document.querySelector('.password-login');
const email_signup = document.querySelector('.email-signup');
const password_signup = document.querySelector('.password-signup');
const form_login = document.querySelector('.form-signin');
const form_signup = document.querySelector('.form-signup');
const login_button  = document.querySelector('.btn-login');
const submit_login = document.querySelector('.btn-submit-login');
const signup_button = document.querySelector('.btn-signup');
const submit_signup = document.querySelector('.btn-submit-signup');
const welcome = document.querySelector('.text-welcome');
const publication_button = document.querySelector('.publication');
const search_field = document.querySelector('.search');
const success_register = document.querySelector('.success-msg');
const logout_button = document.querySelector('.btn-logout');
const upload = document.querySelector('.content-upload');

submit_login.addEventListener('click', () => {
    let email = email_login.value;
    let password = password_login.value;

    if(email.length >= 3 && password.length >= 3) {
        axios.post('http://localhost:3000/user/login', {
            email: email,
            password: password
        })
        .then(Response => {
           localStorage.setItem("Token", Response.data.token);
           location.reload();
        })
        .catch(error => {
            document.querySelector('.error-login').classList.remove('d-none');
            console.log(error);
        });
    }else{
        document.querySelector('.error-login').classList.remove('d-none');
    }
});

submit_signup.addEventListener('click', () => {
    let email = email_signup.value;
    let password = password_signup.value;
    
    if(email.length >= 3 && password.length >= 3) {
        axios.post('http://localhost:3000/user/register', {
            email: email,
            password: password
        })
        .then(() => {
            success_register.classList.remove('d-none');
            email_signup.value = '';
            password_signup.value = '';
        })
        .catch(error => {
            document.querySelector('.error-signup').classList.remove('d-none');
            console.log(error);
        });
    }else{
        console.log('error');
        document.querySelector('.error-signup').classList.remove('d-none');
    }
});

const isLogado = () => {
    if (localStorage.getItem("Token")) return true;
        return false;
};

if (isLogado() === true) {
    form_login.classList.add('d-none');
    login_button.classList.add('d-none');
    logout_button.classList.remove('d-none');
    signup_button.classList.add('d-none');
    welcome.classList.remove('d-none');
    publication_button.classList.remove('d-none');
    upload.classList.remove('d-none');
}

logout_button.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

login_button.addEventListener('click', () => {
    form_login.classList.remove('d-none');
    form_signup.classList.add('d-none');
});

signup_button.addEventListener('click', () => {
    welcome.classList.add('d-none');
    publication_button.classList.add('d-none');
    logout_button.classList.add('d-none');
    form_signup.classList.remove('d-none');
    form_login.classList.add('d-none');
});
