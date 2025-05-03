const countDisplaySpan = document.getElementById('count-display');
const countDigitSpan = countDisplaySpan.querySelector('.digit');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

let count = 0;

function updateDisplay() {
    countDigitSpan.textContent = count;

    countDisplaySpan.classList.remove('positive', 'zero');
    countDigitSpan.classList.remove('updated', 'updated-exit');

    if (count > 0) {
        countDisplaySpan.classList.add('positive');
    } else {
        countDisplaySpan.classList.add('zero');
    }


    requestAnimationFrame(() => {
      setTimeout(() => {
        countDigitSpan.classList.add('updated');
      }, 10);
    });


    setTimeout(() => {
        if (countDigitSpan.classList.contains('updated')) {
            countDigitSpan.classList.remove('updated');
            countDigitSpan.classList.add('updated-exit');
             countDigitSpan.addEventListener('transitionend', () => {
                 countDigitSpan.classList.remove('updated-exit');
             }, { once: true });
        }
    }, 400); 

    decrementBtn.disabled = (count === 0);
}

function handleIncrement() {
    count++;
    updateDisplay();
}

function handleDecrement() {
    if (count === 0) {
        if (!decrementBtn.classList.contains('shake')) {
            decrementBtn.classList.add('shake');
            decrementBtn.addEventListener('animationend', () => {
                decrementBtn.classList.remove('shake');
            }, { once: true });
        }
        return;
    }
    count--;
    updateDisplay();
}

function handleReset() {
    if (count === 0) return;
    count = 0;
    updateDisplay();
}

incrementBtn.addEventListener('click', handleIncrement);
decrementBtn.addEventListener('click', handleDecrement);
resetBtn.addEventListener('click', handleReset);

updateDisplay(); 