
// $('body').on('click', cambiarFondo);
// $('body').on('click', colorAleatorio);
$('body').css('background', '#3C89CE');
$(function (){
    cambiarFondo();
    colorAleatorio();
});

function cambiarFondo(){
    $('body').css('background', '#18344E');
    $('body').css('transition', '1s');
    console.log('Fondo cambiado');
}

function dobleFondo(){
    $('body').css('background', randomColorAl);
    $('body').css('transition', '2s');
}

function colorRandom(){
    $('body').css('background', randomColorAl);
    $('body').css('transition', '2s');

}

/* Funciones auxiliares */
// Genero un nro aleatorio entre 0 y 255
function random(number) {
	return Math.floor(Math.random() * (number + 1));
}

// Genero un color aleatorio en formato 'rgb(rrr,ggg,bbb)'
function randomColor() {
	return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
}

// Color aleatorio #??????
function randomColorAl(){
    return '#' + Math.random().toString(16).slice(2,8);
}

// Color en loop
function colorAleatorio(){
    let i = 0;

    let body = $('body');
    let colors = ['red', 'yellow', 'green' , 'aqua' ,'blue', 'fuchsia'];

    body.css('backgroundColor', colors[0]);

    window.setInterval(function(){
        i = i == colors.length ? 0 : i;
        body.animate({backgroundColor: colors[i]}, 3000);
        i++;
    }, 30);
}