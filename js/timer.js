var Timer = (function() {
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
        var duration = generateDuration(timerEle.innerHTML.split(":"));
        window.duration = duration;
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