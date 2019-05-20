var isTimerStarted;
import cards from ".\\cards.js";
;
function formatHelper(num) {
    return num >= 10 ? num : "0" + num;
}

function generateDuration(arr) {
    for (var i = 0; i < arr.length; i++) {
        var hourUnit = arr[0] > 1 ? " hours " : " hour ";
        var minuteUnit = arr[1] > 1 ? " minutes " : " minute ";
        var secondUnit = arr[2] > 1 ? " seconds " : " second ";
        var hour = arr[0] >= 10 ? arr[0] : arr[0].slice(1);
        var minute = arr[1] >= 10 ? arr[1] : arr[1].slice(1);
        var second = arr[2] >= 10 ? arr[2] : arr[2].slice(1);
    }

    return hour + hourUnit + minute + minuteUnit + second + secondUnit;
}

function countup() {
    var date = new Date(0, 0);
    secondCounter++;
    date.setSeconds(secondCounter);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    timerEle.innerHTML =
        formatHelper(hour) +
        ":" +
        formatHelper(minute) +
        ":" +
        formatHelper(second);
    duration = generateDuration(timerEle.innerHTML.split(":"));
}

function startTimer() {
    // take the event
    cards.EVT.on("start-timer", function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(countup, 1000);
    });
    // due to asyn, reserve the variable in a function
    return function() {
        return duration;
    };
}

function zeroTimer() {
    clearInterval(timer);
    timer = null;
}

function initialize() {
    isTimerStarted = true;
    timer = null;
    timerEle = document.getElementById("timer");
    secondCounter = 0;
}

var timer, timerEle, secondCounter, duration;

var bindingVariable = {
    run: function() {
        initialize();
    },
    duration: startTimer(),
    stopTimer: zeroTimer
};

export default bindingVariable;