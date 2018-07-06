var triviaGame = {
    questionBank: [
        {id: 0, question: "How many holes are there in a full round of golf?", options: ["9", "36", "18", "12"], answer: "18", gif: "assets/images/golf.gif"},
        {id: 1, question: "What is professional wrestler, John Cena, catch phrase?", options: ["You can't see me!", "Yea Baby Yea!", "Do you smell what the Rock is cooking", "That's what I'm talking about!"], answer: "You can't see me!", gif: "assets/images/johncena.gif"},
        {id: 2, question: "Which NFL quarterback has been in the most Super Bowls?", options: ["Brett Favre", "Joe Montana", "Peyton Manning", "Tom Brady"], answer: "Tom Brady", gif: "assets/images/tombrady.gif"},
        {id: 3, question: "Which male tennis player has won the most Grand Slam titles?", options: ["Rafael Nadal", "Novak Djokovic", "Andy Murray", "Rodger Federer"], answer: "Rodger Federer", gif: "assets/images/federer.gif"},
        {id: 4, question: "Who was the shortest player to ever play in the NBA?", options: ["Earl Boykins", "Tyrone 'Muggsy' Bogues", "Mel Hirsch", "Greg Grant"], answer: "Tyrone 'Muggsy' Bogues", gif: "assets/images/muggsy.gif"},
        {id: 5, question: "Where did the sport of curling originate?", options: ["Iceland", "Sweden", "Scotland", "Switzerland"], answer: "Scotland", gif: "assets/images/curling.gif"},
        {id: 6, question: "Who is the only athlete ever to play in a Super Bowl and a World Series?", options: ["Deion Sanders", "Matt Kinzer", "Bo Jackson", "Carroll Hardy"], answer: "Deion Sanders", gif: "assets/images/deionsanders.gif"},
        {id: 7, question: "Tiger Woods has won the Masters tournament how many times?", options: ["2", "3", "4", "5"], answer: "4", gif: "assets/images/tigerwoods.gif"},
        {id: 8, question: "A shuttlecock is used in which sport?", options: ["Field Hockey", "Badminton", "Shuttleball", "Croquet"], answer: "Badminton", gif: "assets/images/badminton.gif"},
        {id: 9, question: "Which is the only country to have played in every World Cup?", options: ["Brazil", "Spain", "Mexico", "Portugal"], answer: "Brazil", gif: "assets/images/brazil.gif"}
    ]
}

var count = 0;
var correct = 0;
var wrong = 0;
var timer = 30;
var timeOut;
var optionsDisplay = $("#optionsDisplay");
var questionDisplay = $("#question");
var optionsDiv = $("#optionsDiv");
var timerSpan = $("#timer");
var startBtn = $("#start");
var response = $("#response");
var correctCount = $("#correctCount");
var wrongCount = $("#wrongCount");
var totalScore = $("#totalScore");

function resetGame() {
        count = 0;
        timer = 30;
        clearTimeout(timeOut);
        clearInterval(intervalId);
        timerSpan.text(timer);
        $("ul").empty(); 
        questionDisplay.empty();
        response.text("Click Start to play again");
        startBtn.css("display", "block");
}

function displayGif() {
    var gifImg = $("<img>");
    gifImg.attr("src", triviaGame.questionBank[count].gif).addClass("gif-image");
    $("#optionsDiv").append(gifImg);
    var correctAswer = $("<p>");
    correctAswer.text("The correct answer is " + triviaGame.questionBank[count].answer);
    $("#optionsDiv").append(correctAswer);
    setTimeout(function() {gifImg.remove(), correctAswer.empty();}, 4000);
}

//timer functions
function timerDecrement() {
    timer--;
    timerSpan.text(timer);
}

function timerCountDown() {
    intervalId = setInterval(timerDecrement, 1000);
}

function timeUp() {
    timeOut = setTimeout(function() {
        displayGif();
        count++;
        wrong++;
        response.text("Sorry you have run out of time").css("color", "black");
        wrongCount.text(wrong);
        $("ul").empty();
        clearInterval(intervalId);
        setTimeout(function() {nextQuestion();}, 4000);
    }, 30000);
}

//initialize game
startBtn.on("click", function() {
    $(this).css("display", "none");
    nextQuestion();  
    $("#backdrop").css("background-color", "rgba(255, 255, 255, 0.5)");
    correct = 0;
    wrong = 0;
    correctCount.text(correct);
    wrongCount.text(wrong); 
    totalScore.empty();
});

function nextQuestion() {
    timer = 30;
    //display next question
    questionDisplay.text(triviaGame.questionBank[count].question);
    //display next answer choices
    for(var i = 0; i < triviaGame.questionBank[count].options.length; i++) {
        var optionChoice = $("<li>");
        optionsDisplay.append(optionChoice);
        optionChoice.text(triviaGame.questionBank[count].options[i]);
        optionChoice.on("click", clickEvent);
    };

    timerCountDown();
    clearTimeout(timeOut);
    timeUp();
    response.empty();
}

//capture player guess and evaluate
function clickEvent() {
    if($(this).text() === triviaGame.questionBank[count].answer) {
        correct++;
        response.text("Correct!").css("color", "green");
        correctCount.text(correct);
    }
    else {
        wrong++;
        response.text("Wrong!").css("color", "red");
        wrongCount.text(wrong);
    }
    //display gif
    displayGif();
    //clear for next question
    count++;
    $("ul").empty();  
    clearInterval(intervalId);
    //check if last question
    if(count === triviaGame.questionBank.length) {
        totalScore.text(((correct/triviaGame.questionBank.length) * 100) + "%");
        resetGame();
    }
    else {      
        setTimeout(function() {nextQuestion();}, 4000);
    }
} 



