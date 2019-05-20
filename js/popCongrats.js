import stars from ".\\stars.js";
import moves from ".\\moves.js";
import timers from ".\\timers.js";
import cards from ".\\cards.js";
;
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

var bindingVariable = {
    run: function() {
        initialize();
        popupCongrats();
    }
};

export default bindingVariable;