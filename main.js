const email_input = document.querySelector('.email-input');
const password_input = document.querySelector('#password-input');
const login_button  = document.querySelector('.btn-login');
const logout_button = document.querySelector('.logout');

// logout_button.addEventListener('click', () => {
//     localStorage.clear();
//     location.reload();
// });

// if(localStorage.getItem('logado')){
//     document.querySelector('.content.search').classList.remove('hidden');
//     document.querySelector('.content.login').classList.add('hidden');
// }

login_button.addEventListener('click', () => {
    document.querySelector('.form-signin').classList.remove('d-none');
});