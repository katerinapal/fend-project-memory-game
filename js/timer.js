var Timer = (function() {
    function formatHelper(num) {
        return num >= 10 ? num : "0" + num;
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
    }

    function startTimer() {
        // take the event
        EVT.on("start-timer", function() {
            if (isTimerStarted) {
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
                timer = setInterval(countup, 1000);
            }

            isTimerStarted = false;
        });
    }

    function initialize() {
        isTimerStarted = true;
        timer = null;
        timerEle = document.getElementById("timer");
        secondCounter = 0;
    }

    var isTimerStarted, timer, timerEle, secondCounter;

    return {
        run: function() {
            initialize();
            startTimer();
        }
    };
})();