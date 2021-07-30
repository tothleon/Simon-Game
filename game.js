var started = false;

let gamePattern = [];

let userClickedPattern = [];

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(() => {
  if (started === false) {
    $("#level-title").text("Level" + level);
    started = true;
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);

    setTimeout(() => {
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  if (started === true) {
    userClickedPattern = [];

    level++;
    setTimeout(() => {
      $("#level-title").text("Level" + level);

      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);

      for (let i = 0; i < gamePattern.length; i++) {
        lastPressed(i);
      }

      function lastPressed(index) {
        setTimeout(function () {
          animatePress(gamePattern[index]);
          playSound(gamePattern[index]);
        }, 1000 * index);
      }
    }, 1000);
  }
}

$(".btn").click(function () {
  if (started === true) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];

  level = 0;

  started = false;
}
