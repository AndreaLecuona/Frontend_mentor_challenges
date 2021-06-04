// Esta es una versión que consumía otra API y requería hacer un POST request. 
//La empresa que proveía ese servicio ya no está disponible y por lo tanto la API ya no funciona.

//This is an older version that consumed a different API through POST requests.
//The provider of this shortening link service it's no longer available and therefore, the API it's no longer working.

///////////////////////////////////////////////////////////////////////////

const form = document.querySelector("#trial-form");
const input = document.querySelector("#userUrl");
const msg = document.querySelector("#trial small");
const urlPattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
const apiUrl = 'https://rel.ink/api/links/';
const parentUl = document.getElementById('api-calls');

// MENÚ MOBILE - animación de ícono y navegación
const toggleMenu = document.querySelector(".toggle-btn");
const menu = document.querySelector(".navigation");

toggleMenu.addEventListener('click', () => {
    toggleMenu.classList.toggle('open');
    menu.classList.toggle('active');
})

// SUBMIT
form.addEventListener('submit', async (e) => {
    
    e.preventDefault()
    let userInputValue = input.value.trim();

    if(validation(userInputValue)) {
        clearErrors();
        const newData = await getShortUrl(userInputValue);
        const { url:oldUrl, hashid } = newData;
        
        const newUrl = `https://rel.ink/${hashid}`;
        
        displayUi(oldUrl, newUrl);
        addSessionStorage(oldUrl, newUrl);
    }
});

// VALIDACIÓN DE URL
function validation(link){
    if( link == "" && (!urlPattern.test(link)) ){
        handleError();
        return false
    } else {
        return true
    }
}
// Indicadores de error
function handleError(){
    msg.classList.add('error');
    input.classList.add('invalid');
};
// Limpieza de indicadores de error
function clearErrors(){
    input.value = "";
    msg.classList.remove('error');
    input.classList.remove('invalid');
};

// PETICIÓN A API 
async function getShortUrl(userInputValue) {
    let body = JSON.stringify({ "url": userInputValue });

    try{
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: body
        })
        const data = await response.json();
        return data;
    } catch (err) {
        alert("Shortlinking service rel.ink and API has been suspended :(");
        console.log(err);
    }
};

// MUESTRO VISUALMENTE LA RESPUESTA DE LA API
function displayUi(oldUrl, newUrl){
    const li = document.createElement('li');
    const p1 = document.createElement('p');
    const div = document.createElement('div');
    const p2 = document.createElement('p');
    const button = document.createElement('button');

    //agrego contenido
    p1.textContent = oldUrl;
    p2.textContent = newUrl;
    button.textContent = 'Copy';

    //agrego estilos y attributos
    li.className = 'api-result';
    p1.className = 'old';
    div.className = 'options';
    p2.className = 'new';
    button.className = 'btn';
    button.setAttribute('id', 'copy');
    button.setAttribute('type', 'button');

    //adjunto div y p1 a li
    li.appendChild(p1);
    li.appendChild(div);
    //adjunto p2 y button a div
    div.appendChild(p2);
    div.appendChild(button);
    //adjunto li a ul en index.html
    document.getElementById('api-calls').appendChild(li);

    // POSIBILIDAD DE COPIAR AL PORTAPAPELES
    //concepto de event delegation: agrego el listener al padre de los elementos generados dinámicamente (donde están los button)
    parentUl.addEventListener('click', event => {
        //guardo el párrafo donde está el link a copiar
        let toCopy = event.target.previousElementSibling;

        //si el lugar donde se hizo click coincide con el id copy, se ejecuta la copia del párrafo y agrego estilos al botón
        if(event.target.id === 'copy') {

            window.navigator.clipboard.writeText(toCopy.innerText); //copia al portapapeles

            event.target.style.backgroundColor = "hsl(257, 27%, 26%)";
            event.target.innerText = "Copied!";
            setTimeout(() => {
                event.target.style.backgroundColor = "hsl(180, 66%, 49%)";
                event.target.innerText = "Copy";
            }, 1000);
        }
    });
};


// AGREGO A SESSION STORAGE
function addSessionStorage(oldUrl, newUrl){
    let newResult = { 'user': oldUrl, 'api': newUrl };

    //chequeo si existe algo ya almacenado
    if(sessionStorage.result){
        result = JSON.parse(sessionStorage.getItem('result'));
    } else {
        //creo un array para almacenar los resultados de cada llamado a la api
        result = [];
    }
    //hago push y me queda un array de objetos. Cada objeto contiene el link del usuario y el nuevo link de la api
    result.push(newResult)
    //ingreso el array de objetos en el session storage
    sessionStorage.setItem('result', JSON.stringify(result));
}

window.onreset = getSessionStorage(); //cuando se actualiza la página se ejecuta la función

// MUESTRO DESDE SESSION STORAGE
function getSessionStorage(){
    let storedResults = sessionStorage.getItem('result');

    let pastResults = JSON.parse(storedResults);

    //mapeo el array de objetos del session storage y los uso para crear los recuadros blancos
    pastResults.map(data => displayUi(data.user, data.api));
}