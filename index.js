
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var started=0;
var level=0;

$(".start").click(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
        var element = document.getElementById("remove");
        element.style.display = "none";
    }
})
$(".btn").click(function (){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(userClickedPattern.length=== gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER Your Score is " +level*100);
        var element = document.getElementById("remove");
        element.style.display = "flex";
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");   
    },100);
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
