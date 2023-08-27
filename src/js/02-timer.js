const input = document.querySelector(".js-input");
const buttonStart = document.querySelector('.js-button-start');

const element = {
    days: document.querySelector('.js-days'),
    hours: document.querySelector('.js-hours'),
    minutes: document.querySelector('.js-minutes'),
    seconds: document.querySelector('.js-seconds')
}

let intervalId = null;

input.addEventListener('input', checkInput);

function checkInput() {
    const inputData = new Date(input.value);
    const current = new Date();

    console.log(inputData - current);
    if (inputData - current <= 0) 
        buttonStart.disabled = true;
    else
        buttonStart.disabled = false;
}

buttonStart.addEventListener('click', checkButton);

function checkButton() {
    console.log(input.value);

    const inputData = new Date(input.value);
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        const current = new Date();
        
        const timeDifference = inputData - current;

        if (timeDifference <= 1) {
            clearInterval(intervalId);

            element.days.textContent = 0;
            element.hours.textContent = 0;
            element.minutes.textContent = 0;
            element.seconds.textContent = 0;

            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        element.days.textContent = days;
        element.hours.textContent = hours;
        element.minutes.textContent = minutes;
        element.seconds.textContent = seconds;

    }, 1000)

}