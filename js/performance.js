var Performance = (function() {
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
    function handleStars() {
        // take an event
        EVT.on("handle-stars", function() {
            starReducer += 1;
            if (starReducer > 0 && starReducer % 2 === 0) {
                if (numOfStars >= 1) {
                    numOfStars -= 1;
                    stars[numOfStars].classList.add("fa-star-o");
                }
            }
        });
    }

    function handleMoves() {
        EVT.on("calculate-moves", function() {
            moveCounter += 1;
            moves.innerHTML = moveCounter;
        });
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

    function popupCongrats() {
        // take an event
        EVT.on("popup-congrats", function() {
            successCounter += 1;
            if (successCounter === 8) {
                clearInterval(timer);
                timer = null;
                var duration = generateDuration(timerEle.innerHTML.split(":"));
                var result = confirm(
                    "Congratulations! You finished the game with " +
                        numOfStars +
                        " stars in " +
                        duration +". Do you want to play again?"
                );
                if(result) location.reload();
            }
        });
    }

    function initialize() {
        starContainer = document.getElementById("stars");
        stars = starContainer.getElementsByClassName("fa-star");
        numOfStars = 3;
        starReducer = 0;
        moves = document.getElementById("moves");
        moveCounter = 0;
        isTimerStarted = true;
        timer = null;
        timerEle = document.getElementById("timer");
        secondCounter = 0;
        successCounter = 0;
    }

    var starContainer,
        stars,
        numOfStars,
        starReducer,
        moveCounter,
        moves,
        isTimerStarted,
        timer,
        timerEle,
        secondCounter,
        successCounter;

    return {
        run: function() {
            initialize();
            handleStars();
            handleMoves();
            startTimer();
            popupCongrats();
        }
    };
})();