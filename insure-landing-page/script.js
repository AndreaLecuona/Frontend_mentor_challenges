const btnMenu = document.querySelector('.toggle-button');
const btnIcon = document.querySelector('.toggle-button img')
const linksMenu = document.querySelector('.navbar-links');


btnMenu.addEventListener('click', (e) => {
    
    linksMenu.classList.toggle('active');

    if(linksMenu.className === 'navbar-links active'){
        btnIcon.setAttribute('src', 'img/icon-close.svg');
    } else {
        btnIcon.setAttribute('src', 'img/icon-hamburger.svg');
    }
});