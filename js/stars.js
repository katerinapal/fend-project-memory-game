var Stars = (function() {
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

    function initialize() {
        starContainer = document.getElementById("stars");
        stars = starContainer.getElementsByClassName("fa-star");
        numOfStars = 3;
        starReducer = 0;
    }

    var starContainer, stars, numOfStars, starReducer;

    return {
        run: function() {
            initialize();
            handleStars();
        }
    };
})();