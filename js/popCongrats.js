"use strict";
define(["stars", "moves", "timers", "cards"], function(
    stars,
    moves,
    timers,
    cards
) {
    function popupCongrats() {
        // take an event
        cards.EVT.on("popup-congrats", function() {
            successCounter += 1;
            if (successCounter === 8) {
                var congratsMessage = confirm(
                    "Congratulations! You finished the game with " +
                        moves.moveCounter() +
                        " moves and " +
                        +stars.numOfStars() +
                        " stars in " +
                        timers.duration()
                );
                if (congratsMessage) {
                    location.reload();
                } else {
                    timers.stopTimer();
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
});