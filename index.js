let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    return `${padToTwo(hh)}:${padToTwo(mm)}:${padToTwo(ss)}.${padToThree(ms)}`;
}

function padToTwo(number) {
    return number <= 9 ? `0${number}` : number;
}

function padToThree(number) {
    return number <= 99 ? `0${number}` : number;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("display").innerHTML = timeToString(elapsedTime);
    }, 10);
    isRunning = true;
    document.getElementById("startStop").innerText = "Stop";
    document.querySelector('.start-btn').classList.add('active');
}

function stop() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("startStop").innerText = "Start";
    document.querySelector('.start-btn').classList.remove('active');
}

function reset() {
    stop();
    elapsedTime = 0;
    document.getElementById("display").innerHTML = "00:00:00.000";
    document.getElementById("laps").innerHTML = '';
}

function lap() {
    if (!isRunning) return;
    const lapTime = document.createElement("li");
    lapTime.innerText = timeToString(elapsedTime);
    document.getElementById("laps").appendChild(lapTime);
    lapTime.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById("startStop").addEventListener("click", function() {
    isRunning ? stop() : start();
});

document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
