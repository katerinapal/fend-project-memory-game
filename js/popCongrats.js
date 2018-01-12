var Congrats = (function() {

    function popupCongrats() {
        // take an event
        EVT.on("popup-congrats", function() {
            successCounter += 1;
            if (successCounter === 8) {
                clearInterval(timer);
                timer = null;
                var numOfStars = window.numOfStars ? window.numOfStars : 3;
                var congratsMessage = confirm(
                    "Congratulations! You finished the game with " +
                        window.moveCounter +
                        " moves and " +
                        +numOfStars +
                        " stars in " +
                        window.duration +
                        "."
                );
                if (congratsMessage) {
                    location.reload();
                }
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