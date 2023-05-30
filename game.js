var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var gameStarted = false;
var level = 0;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
});

// $(".btn").on("touchstart", function() {
//     var userChosenColour = $(this).attr("id");
//     userClickedPattern.push(userChosenColour);

//     playSound(userChosenColour);
//     animatePress(userChosenColour);
//     checkAnswer(userClickedPattern.length - 1);
    
// });

$(document).keypress(function(e) {
    
    setTimeout(function() {if(!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("#level-title").text("Level " + level);
    }}, 600);
});

// $(".start-btn").on("touchstart", function(e) {
//     $(".start-btn button").addClass("pressed");
//     setTimeout(function() {
//         $(".start-btn button").removeClass("pressed");
//       }, 100);
//     setTimeout(function() {if(!gameStarted) {
//         gameStarted = true;
//         nextSequence();
//         $("#level-title").text("Level " + level);
//     }}, 600);
// });

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
          }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function() {
            
            nextSequence();
          }, 1000);
          $(".start-btn button").hide();
        }
      } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 400);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
        // $(".start-btn button").show();
        // $(".start-btn button").text("Restart");
      }
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
