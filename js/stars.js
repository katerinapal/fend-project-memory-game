import cards from ".\\cards.js";
;
function handleStars() {
    // take an event
    cards.EVT.on("handle-stars", function() {
        starReducer += 1;
        if (starReducer > 0 && starReducer % 2 === 0) {
            if (numOfStars >= 2) {
                numOfStars -= 1;
                stars[numOfStars].classList.add("fa-star-o");
            }
        }
    });
     // due to asyn, reserve the variable in a function
    return function() {
        return numOfStars;
    };
}

function initialize() {
    starContainer = document.getElementById("stars");
    stars = starContainer.getElementsByClassName("fa-star");
    numOfStars = 3;
    starReducer = 0;
}

var starContainer, stars, numOfStars, starReducer;

var bindingVariable = {
    run: function() {
        initialize();
    },
    numOfStars:handleStars()
};

export default bindingVariable;