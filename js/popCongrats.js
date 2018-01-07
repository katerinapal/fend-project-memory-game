var Congrats = (function() {
    function popupCongrats() {
        // take an event
        EVT.on("popup-congrats", function() {
            successCounter += 1;
            if (successCounter === 8) {
                clearInterval(timer);
                timer = null;
                alert(
                    "Congratulations! You finished the game with " +
                        moveCounter +
                        " moves and " +
                        numOfStars +
                        " stars!"
                );
            }
        });
    }

    function initialize() {
        successCounter = 0;
    }
    var successCounter;

    return {
        run: function() {
            initialize();
            popupCongrats();
        }
    };
})();