console.log("Hola  JS del lado del cliente");

let button = document.getElementById('boton-ocultar');

function hideImage(){
    let imageLogo = document.getElementById('logo-fing');
    imageLogo.style = 'display:none';
}

button.onclick = hideImage;


//Lo mismo que arriba pero con una función flecha.
button.onclick = () =>{
    let imageLogo = document.getElementById('logo-fing');
    imageLogo.style = 'display:none';
};