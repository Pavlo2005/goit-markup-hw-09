import { getRandomHexColor } from "./template/get-random-color";

const element = {
    body: document.body,
    buttonStart: document.querySelector('.js-button-start'),
    buttonStop: document.querySelector('.js-button-stop')
}

function changeColor() {
    element.body.style.backgroundColor = getRandomHexColor();
}

let intervaId = null;

element.buttonStart.addEventListener('click', trackingClickStart);

function trackingClickStart() {
    changeColor();

    element.buttonStart.disabled = true;
    element.buttonStop.disabled = false;

    intervaId = setInterval(changeColor, 1000);
}

element.buttonStop.addEventListener('click', trackingClickStop);

function trackingClickStop() {
    element.buttonStart.disabled = false;
    element.buttonStop.disabled = true;

    clearInterval(intervaId)
}