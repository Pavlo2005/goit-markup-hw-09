function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      res({ position, delay });
    } else {
      rej({ position, delay });
    }
  })

}

const element = {
  delay: document.querySelector('.js-delay'),
  step: document.querySelector('.js-step'),
  amount: document.querySelector('.js-amount'),
  submit: document.querySelector('.js-submit')
}

element.submit.addEventListener('click', handlerClick);

function handlerClick(evt) {

  evt.preventDefault();

  element.submit.disabled = true;

  for (let i = 0; i < parseInt(element.amount.value); i += 1) {
    setTimeout(() => {
      createPromise(i + 1, parseInt(element.delay.value) + ((i) * parseInt(element.step.value)))
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, parseInt(element.delay.value) + ((i) * parseInt(element.step.value)))
  }
  setTimeout(() => {
    element.submit.disabled = false;
  }, parseInt(element.delay.value) + (parseInt(element.amount.value) * parseInt(element.step.value)));

}
