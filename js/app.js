"use strict";
require(["cards", "moves", "stars", "timers", "popCongrats"], function(
    cards,
    moves,
    stars,
    timers,
    popCongrats
) {
    cards.run();
    moves.run();
    stars.run();
    timers.run();
    popCongrats.run();
});