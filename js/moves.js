import cards from ".\\cards.js";
;
function handleMoves() {
    cards.EVT.on("calculate-moves", function() {
        moveCounter += 1;
        moves.innerHTML = moveCounter;
    });
 // due to asyn, reserve the variable in a function
    return function() {
        return moveCounter;
    };
}

function initialize() {
    moves = document.getElementById("moves");
    moveCounter = 0;
}

var moveCounter, moves;

var bindingVariable = {
    run: function() {
        initialize();
    },
    moveCounter: handleMoves()
};

export default bindingVariable;