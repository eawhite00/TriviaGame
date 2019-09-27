// Starting with constants- the length of each round and the length of time between rounds. 
// These are up top to change as needed for testing.
const roundTime = 10;
const betweenTime = 3000;

// Here I'm initializing my trivia questions, answers, and the answer key as arrays.
// I tried to 'stack' the indices of the arrays to make it easier to line up questions, 
// answers, and the correct answer.
var questions = [
                 "Dave Bautista got his start in what wrestling organization?",
                 "Dave Ghrhol learned to play guitar at what age?",
                 "Which of the following did NOT have a cameo in the 1993 film 'Dave'?",
                 "Dave Franco appeared alongside which Parks and Rec alum in the 2017 film Little Hours?"
]

var options = [ 
                ["WWE", "WWF", "Impact!", "WCW"],
                ["12", "8", "14", "10"],
                ["Chris Dodd", "Howard Metzenbaum", "Tip O'Neill", "Terry Sanford"],
                ["Aubrey Plaza", "Rashida Jones", "Rob Lowe", "Adam Scott"]

]

// The answer key here corresponds to the the index of the nested array in "options" that contains the correct answer
var answerKey = [
                1,    
                0,
                3,
                0
]

// Here are the variables I'm going to use throughout
var gameRound = 0;
var correct = 0;
var incorrect = 0;
var intervalID = 0;
var timer = 0;


// This function starts a new game
function gameStart(){

    // Initialize the counters at 0
    gameRound = 0;
    correct = 0;
    incorrect = 0;

    // start the first round
    newRound();
}

// This function sets up each round 
function newRound(){

    // Make everything visible
    $(".postText").css("visibility", "hidden");
    $(".gameCard").css("visibility", "visible");
    $("#timeDisplay").css("visibility", "visible");
    
    // Populate the appropriate text fields
    populateQuestion();

    // Start the timer
    startClock();   
}

// This function uses the current game round to pull the appropriate question from the array
function populateQuestion(){
    $("#questionText").text(questions[gameRound]);
    $("#answerA").text(options[gameRound][0]);
    $("#answerB").text(options[gameRound][1]);
    $("#answerC").text(options[gameRound][2]);
    $("#answerD").text(options[gameRound][3]);
}

// This checks a guess when you click one of the answer buttons
function evaluateResponse(choice){

    if (choice === answerKey[gameRound]){
        rightGuess();
    }
    else{
        wrongGuess("choseWrong");
    }
}

// Here we set up the clock to count down from whatever our 'roundTime' constant is.
function startClock() {
    clearInterval(intervalID);
    timer = roundTime;
    intervalID = setInterval(decrement, 1000);
  }

// This function is called each second to update the time display and see if we've run out of time
function decrement() {

    timer--;
    $("#timeDisplay").text("Time remaining: " + timer + " seconds");

    if (timer === 0) {
    wrongGuess("time");
    }
}

// This funciton handles a wrong guess. The "reason" parameter is so that we can handle running out of time vs guessing wrong.
function wrongGuess(reason){

    // stop the timer and hide what we don't want to see between rounds
    clearInterval(intervalID);
    $("#timeDisplay").css("visibility", "hidden");
    $(".gameCard").css("visibility", "hidden")

    // display the right answer appropriately
    if (reason === "time"){
        $("#questionText").text("You ran out of time! The correct answer was " + options[gameRound][answerKey[gameRound]]);
    } else{
        $("#questionText").text("Sorry, that was wrong! The correct answer was " + options[gameRound][answerKey[gameRound]]);
    }

    // increment counters
    incorrect++;
    gameRound++;

    // after a short time (the betweenTime constant) we start the next round or end the game if we're done.
    if (gameRound >= questions.length){
        setTimeout(endGame  , betweenTime);
    }else{
        setTimeout(newRound, betweenTime);
    }
}

// This handles the player guessing correctly
function rightGuess(){

    // stop the timer and hide what we don't want to see between rounds
    clearInterval(intervalID);
    $("#timeDisplay").css("visibility", "hidden");
    $(".gameCard").css("visibility", "hidden")

    // Display that they got the answer right
    $("#questionText").text("That's right! Great job!");
    
    // increment counters
    correct++;
    gameRound++;
    
    // after a short time (the betweenTime constant) we start the next round or end the game if we're done.
    if (gameRound >= questions.length){
        setTimeout(endGame, betweenTime);
    }else{
        setTimeout(newRound, betweenTime);
    }
    
}

// This function displays the end of game text
function endGame(){
    $("#questionText").text("The round is over!");
    $("#correctAnswers").text("Right answers: " + correct);
    $("#incorrectAnswers").text("Wrong answers: " + incorrect);
    $(".postText").css("visibility", "visible");
    $("#startButton").text("play again?");
    $("#startButton").css("visibility", "visible");
    
}

//This handles the start / restart button, initializing a new round of the game.
$("#startButton").on("click", function(event){

    $("#startButton").css("visibility", "hidden");
    $(".gameCard").css("visibility", "visible");

    gameStart();
});

//These button handlers handle the buttons for each answer. 
// The integer they pass to evaluateReponse corresponds to the answer key array.
$("#buttonA").on("click", function(event){

    evaluateResponse(0);
});

$("#buttonB").on("click", function(event){

    evaluateResponse(1);
});

$("#buttonC").on("click", function(event){

    evaluateResponse(2);
});

$("#buttonD").on("click", function(event){

    evaluateResponse(3);
});