import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector(".js-input");
const buttonStart = document.querySelector('.js-button-start');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);

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
        
        const timeDifference = convertMs(inputData - current);

        if (timeDifference <= 1) {
            clearInterval(intervalId);

            element.days.textContent ='00';
            element.hours.textContent = '00';
            element.minutes.textContent = '00';
            element.seconds.textContent = '00';

            return;
        }

        element.days.textContent = timeDifference.days;
        element.hours.textContent = timeDifference.hours;
        element.minutes.textContent = timeDifference.minutes;
        element.seconds.textContent = timeDifference.seconds;

    }, 1000)

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day).toString().padStart(2, '0');
  // Remaining hours
  const hours = Math.floor((ms % day) / hour).toString().padStart(2, '0');
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute).toString().padStart(2, '0');
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second).toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}