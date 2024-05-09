
const html = document.querySelector('html'); 
const botonCorto = document.querySelector('.app__card-button--corto');
const  botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
// el banner es la referencia de la imagen que se tiene que cambiar al momento de dar click en el boton de enfoque o de descanso largo o corto 
const banner = document.querySelector('.app__image');
// aqui se tiene que cambiar el texto cuando cambiamos los botones 
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
// colocacion de imagen en el boton de comenzar, poner la imagen de pausa y pause arrow 
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

// declaraciones para poner audio en la pagina 
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPause = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3'); 



let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;


musica.loop  = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});


function cambiarContexto(contexto){
    mostrarTiempo()
    // sirve para limpiar el enfoque o la activacion de los botones cuando los cliqueamos 
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`    

            break;
        case "descanso-corto":
            titulo.innerHTML = ` 
            ¿Qué tal tomar un respiro? 
                <strong class="app__title-strong">¡Haz una pausa corta!</strong> `

            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`

            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('Tiempo final')
        reiniciar()
        return;
    }
    textoIniciarPausar.textContent = "Pausar";/*el textContent se utiliza cuando queremos agregar texto al html*/
    iconoIniciarPausar.setAttribute('src', `./imagenes/pause.png`); /* poner el icono de pause || en el boton de comenzar*/
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        audioPause.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

function reiniciar() {
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `./imagenes/play_arrow.png`)
    idIntervalo = null;
}

function mostrarTiempo() {
    // esta variable es para convertir el tiempo en segundos, min,hrs, etc
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo()







// en este codigo se repiten muchos las variables y no es lo indicado 
// botonCorto.addEventListener('click', () => {
//     html.setAttribute('data-contexto','descanso-corto')
//     banner.setAttribute('src','./imagenes/descanso-corto.png')
// });

// botonEnfoque.addEventListener('click', () => {
//     html.setAttribute('data-contexto','enfoque')
//     banner.setAttribute('src','./imagenes/enfoque.png')
// });

// botonLargo.addEventListener('click', () => {
//     html.setAttribute('data-contexto','descanso-largo')
//     banner.setAttribute('src','./imagenes/descanso-largo.png')
// });
