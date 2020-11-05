const switchToggle = document.querySelector('.switch input');
const card1 = document.querySelector('.card.basic span');
const card2 = document.querySelector('.card.professional span')
const card3 = document.querySelector('.card.master span')

function priceChange(){
    if(switchToggle.checked){
        card1.textContent = "$19.99";
        card2.textContent = "$24.99";
        card3.textContent = "$39.99";
    } else {
        card1.textContent = "$199.99";
        card2.textContent = "$249.99";
        card3.textContent = "$399.99";
    } 
}

switchToggle.addEventListener('change', function(){
    priceChange();
});

document.addEventListener('keydown', function(e){
    const key = e.keyCode;
    if(key === 39){
        switchToggle.checked = true;
        priceChange();
    } else if (key === 37){
        switchToggle.checked = false;
        priceChange();
    }
});