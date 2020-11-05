//Elementos del DOM
const form = document.querySelector('#trial-form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

//Manejo de envío de formulario
form.addEventListener('submit', function(event) {   
    if(validFirstName() && validLastName() && validEmail() && validPassword()){
        form.setAttribute("invalid", false);
        form.reset();
        form.submit();
        console.log('formulario enviado');

    } else {
        event.preventDefault();
        console.log('formulario incompleto');
    };
});

//Validación de campos
function validFirstName(){
    if (firstName.value.trim() !== ''){
        handleSuccess(firstName); return true;

    } else {handleError(firstName);};
};

function validLastName(){
    if (lastName.value.trim() !== ''){
        handleSuccess(lastName); return true;

    } else {handleError(lastName);};
};

function validEmail(){
    if (email.value.trim() !== '' && emailPattern(email.value)){
        handleSuccess(email); return true;

    } else {handleError(email); 
        document.getElementById('email').placeholder = 'email@example/com'; 
    };
};

function validPassword(){
    if (password.value.trim() !== ''){
        handleSuccess(password); return true;

    } else {handleError(password);};
};

//Validación de formato de email
function emailPattern(email){
    let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(email);
};

//Manejo de aciertos y errores
function handleSuccess(input){
    const icon = input.parentElement.querySelector('.icon');
    const msg = input.parentElement.querySelector('.msg');

    input.style.setProperty('border', '2px solid var(--primary-green)');

    icon.classList.remove('icon-error');

    msg.classList.remove('msg-error');
};

function handleError(input){
    const icon = input.parentElement.querySelector('.icon');
    const msg = input.parentElement.querySelector('.msg');

    input.style.setProperty('border', '2px solid var(--primary-red)');

    icon.classList.add('icon-error');

    msg.classList.add('msg-error');
};