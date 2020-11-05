//Selecciono elementos del DOM
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const quotes = document.querySelectorAll('blockquote');

//A cada slide le corresponde una ubicación en la "tira" del carrusel
slides.forEach(function(slide, index){
    slide.style.left = `${index * 100}%`;
});

//Relacionamos el click en los botones con el movimiento del slide

    // 1.Establezco un contador de clicks
let counter = 0;

function positiveCounter(){
    counter++;
    console.log(counter);
    carousel();
}
function negativeCounter(){
    counter--;
    console.log(counter);
    carousel();
}

    //Event listeners para clicks con el mouse
nextBtn.addEventListener('click', function(){
    positiveCounter()
});
prevBtn.addEventListener('click', function(){
    negativeCounter()
});

    //Event listeners para teclado
document.addEventListener('keydown', function(e){
    const key = e.keyCode;
    if(key === 39){
        positiveCounter();
    } else if (key === 37){
        negativeCounter();
    }
})

    // 2.Relacionamos el contador con el traslado del slide
function carousel(){
    //Cuando llego al final, me regresa al principio, y cuando quiero ir más atrás del prncipio, vuelve el contador a cero
    if(counter === slides.length){
        counter = 0;
    }
    if(counter < 0){
        counter = 0;
    }

    //Traslado propiamente dicho
    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${counter * 100}%`;
    });

    //Animación del texto
    quotes.forEach(function(text){
        text.classList.add('animation');
        text.addEventListener('animationend', () => {
            text.classList.remove('animation');
        })
    });
}