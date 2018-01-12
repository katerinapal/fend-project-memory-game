var Cards = (function() {
    // helper function of Fisher-Yates shuffle function
    function getRandomIndex(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }
    // Fisher-Yates shuffle
    function shuffle(array) {
        if (array.length <= 1) return;
        for (
            var currentIndex = 0;
            currentIndex < array.length - 1;
            currentIndex++
        ) {
            var randomIndex = getRandomIndex(currentIndex, array.length - 1);
            if (randomIndex !== currentIndex) {
                var currentIcon = array[currentIndex].innerHTML;
                array[currentIndex].innerHTML = array[randomIndex].innerHTML;
                array[randomIndex].innerHTML = currentIcon;
            }
        }
        return array;
    }

    function initialize() {
        cardList = document.getElementsByClassName("card");
        shuffledCards = shuffle(cardList);
        openedCard = null;
        restartBtn = document.getElementById("restart");
    }

    function playGame() {
        for (var i = 0; i < shuffledCards.length; i++) {
            // use iife to generate new scopes and pass "i" down
            shuffledCards[i].onclick = (function(i) {
                return function() {
                    var currentCard = shuffledCards[i];
                    if (!openedCard) {
                        // emit an event
                        EVT.emit("start-timer");
                        currentCard.classList.remove("close");
                        currentCard.classList.add("open", "show");
                        openedCard = currentCard;
                        openedCard.index = i;
                    } else {
                        currentCard.index = i;
                        // make sure styles won't apply on the same card that is clicked more than once!
                        if (openedCard.index != currentCard.index) {
                            if (openedCard.innerHTML == currentCard.innerHTML) {
                                openedCard.classList.add(
                                    "open",
                                    "show",
                                    "match"
                                );
                                // only clickable one time.
                                openedCard.onclick = null;
                                currentCard.onclick = null;

                                currentCard.classList.add(
                                    "open",
                                    "show",
                                    "match"
                                );

                                // gives some buffer for the last node to render styles
                                setTimeout(function() {
                                    EVT.emit("popup-congrats");
                                }, 1000);
                            } else {
                                openedCard.classList.remove(
                                    "open",
                                    "show",
                                    "match"
                                );
                                openedCard.classList.add("close");
                                currentCard.classList.remove(
                                    "open",
                                    "show",
                                    "match",
                                    "close"
                                );
                                // deep clone a new node to inherit className:'close'
                                var newNode = currentCard.cloneNode(true);
                                newNode.classList.add("close");
                                // replace the current node with the new node
                                currentCard.replaceWith(newNode);
                                // assign onclick function to the new node
                                newNode.onclick = currentCard.onclick;
                                // emit an event
                                EVT.emit("handle-stars");
                            }
                            newNode = null;
                            openedCard = null;
                            // emit an event
                            EVT.emit("calculate-moves");
                        }
                    }
                };
            })(i);
        }
    }

    function restartGame() {
        restartBtn.onclick = function() {
            location.reload();
        };
    }

    // declare variables
    var cardList, shuffledCards, openedCard, restartBtn;

    return {
        run: function() {
            initialize();
            playGame();
            restartGame();
        }
    };
})();