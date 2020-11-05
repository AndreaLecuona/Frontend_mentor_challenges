document.querySelector(".article-footer .share").addEventListener("click", popUpFunction);

function popUpFunction() {
    var popup = document.getElementById("popup-social");
    popup.classList.toggle("show");

    var clickedIcon = document.querySelector(".share .share-icon");
    clickedIcon.classList.toggle("clicked");
}
