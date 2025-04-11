var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        startGame();
    }
});

function startGame() {
    level = 0;
    gamePattern = [];
    started = true;
    nextSequence();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomChosenColor = buttonColors[randomNumber()];
    gamePattern.push(randomChosenColor);

    // Show sequence with delay between steps
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            var color = gamePattern[i];
            $(`#${color}`).fadeOut(100).fadeIn(100);
            playSound(color);
        }, i * 600); // spacing between flashes
    }
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000); // go to next level
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}
