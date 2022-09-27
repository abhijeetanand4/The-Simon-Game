var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level"+level);
    userClickedPattern = [];
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new audio("sounds/" + name+ ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).classAdd(".pressed");
    setTimeout(function(){
        $("#" + currentColour).classRemove(".pressed");
    },100);
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level"+level);
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern[currentLevel].length === userClickedPattern[currentLevel].length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("error");
        playSound("wrong");
        $("body").classAdd("game-over");
        setTimeout(function(){
            $("body").classRemove("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}