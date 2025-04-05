var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];

var randomNumber = function () {
   return Math.floor(Math.random()*4)
}

function playSound(name) {
    var sounds = new Audio(`sounds/${name}.mp3`);
    sounds.play();
}


$(document).keypress(function() {
    var randomChosenColor = buttonColors[randomNumber()]

    gamePattern.push(randomChosenColor)
    $(`#${randomChosenColor}`).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
})
