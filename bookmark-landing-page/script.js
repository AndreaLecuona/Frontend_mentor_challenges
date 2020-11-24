const toggle = document.querySelector('.toggle-btn');
const mobileNav = document.querySelector('.navbar');
const mobileLogo = document.querySelector('.logo-container img')


//Mobile Menu
toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('active');
    if(mobileNav.className == 'navbar active'){
        mobileLogo.setAttribute('src', 'img/logo-bookmark-white.svg');
    } else {
        mobileLogo.setAttribute('src', 'img/logo-bookmark.svg');
    }
});


//Tabs
const defaultTab = document.getElementById('defaultTab');
const tabsContents = document.querySelectorAll('.tabs-content');

function openTab(order){
    defaultTab.classList.remove('defaultBorder');
    tabsContents.forEach(content => content.style.display = 'none');
    document.getElementById(order).style.display = 'block';
} 


//Accordion
const questions = document.querySelectorAll('.accordion-bar');


questions.forEach(question => question.addEventListener('click', openAccordion));

function openAccordion(){
    const answers = this.nextElementSibling;
    const arrow = this.lastChild;

    if (answers.style.maxHeight) {
        answers.style.maxHeight = null;
    } else {
        answers.style.maxHeight = answers.scrollHeight + "px";
    };

    arrow.classList.toggle('icon-dropped');
    
};


//Email validation
const form = document.querySelector('#contact-form');
const input = document.getElementById('email');
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const errorMsg = document.querySelector('.input-container .error-message');
const errorIcon = document.querySelector('.input-container .error-icon');

form.addEventListener('submit', (e) => {

    e.preventDefault()
    let inputValue = input.value.trim();

    if(emailValidation(inputValue)){
        clearErrors();
        // form.submit();
    }
});


function emailValidation(value){

    if( value == '' || (!emailPattern.test(value)) ){
        errorMsg.style.display = 'block';
        errorIcon.style.visibility = 'visible';
        input.classList.add('error');
        return false;
    } else { 
        return true;
    };
};

function clearErrors(){
    input.value = "";
    errorMsg.style.display = 'none';
    errorIcon.style.visibility = 'hidden';
    input.classList.remove('error');
};