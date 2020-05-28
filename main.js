'use strict'

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const lap = document.getElementById('lap');
    const reset = document.getElementById('reset');


    let startTime;
    let timeoutId;
    let elapsedTime = 0;


    function countUp() {
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        timer.textContent = `${m}:${s}.${ms}`;
        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    function setButtonStateInitial() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        lap.classList.add('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateRunning() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        lap.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateStopped() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        lap.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    function setButtonStateLap() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        lap.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    function timeLap() {
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        const li = document.createElement('li');
        li.textContent = `${m}:${s}.${ms}`;

        const ol = document.querySelector('ol');
        ol.appendChild(li);
    }

    setButtonStateInitial();

    start.addEventListener('click', () => {
        if (start.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
    });
    
    lap.addEventListener('click', () => {
        if (lap.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateLap();
        timeLap();
    });

    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00.000';
        elapsedTime = 0;
    });
}