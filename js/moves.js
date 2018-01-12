var Moves = (function() {
    function handleMoves() {
        EVT.on("calculate-moves", function() {
            moveCounter += 1;
            moves.innerHTML = moveCounter;
            window.moveCounter = moveCounter;
        });
    }

    function initialize() {
        moves = document.getElementById("moves");
        moveCounter = 0;
    }

    var moveCounter, moves;

    return {
        run: function() {
            initialize();
            handleMoves();
        }
    };
})();