var questions = [
    {questionText: "this is question #1",
     answers: [
        {answerText:"this answer is incorrect",
            isCorrect: false},
        {answerText:"this answer is also incorrect",
            isCorrect: false},
        {answerText:"this answer too is incorrect",
            isCorrect: false},
        {answerText:"this answer is correct",
            isCorrect: true}]
    },
    {questionText: "this is question #2",
    answers: [
       {answerText:"this answer is correct",
           isCorrect: true},
       {answerText:"this answer is also incorrect",
           isCorrect: false},
       {answerText:"this answer too is incorrect",
           isCorrect: false},
       {answerText:"this answer is incorrect",
           isCorrect: false}]
   },
    {questionText: "this is question #3",
    answers: [
        {answerText:"this answer is correct",
           isCorrect: true},
       {answerText:"this answer is also incorrect",
           isCorrect: false},
       {answerText:"this answer too is incorrect",
           isCorrect: false},
       {answerText:"this answer is incorrect",
           isCorrect: false}]
    }
];

intro_text = "Cillum esse ipsum amet cupidatat et consectetur Lorem. Consequat cillum occaecat mollit eiusmod deserunt in culpa. Do aute cillum aliqua nisi cillum. Nostrud dolore aute pariatur ad. Aliqua ex in mollit consectetur deserunt anim pariatur et pariatur. Deserunt in labore aute nostrud commodo et duis culpa velit nisi qui duis id sint."
var questionCounter = 0;
var timerCounter = 40;
var timerId;
var timerContentEl = document.querySelector("#counter");
timerContentEl.textContent = "Time Remaining: " + timerCounter;
var finalScore = 0;
var gameContainerEl = document.querySelector("#game-container");

var loadScores = function() {
    if (localStorage.getItem("scores") === null ) {
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem("scores"));
    }
}

var createIntroEl = function() {
    var introEl = document.createElement("div");
    introEl.className = "intro-container";
    introEl.innerHTML = "<h2>Coding Quiz Challenge</h2>" + "<p>" + intro_text + "</p>"

    startButtonEl = document.createElement("button");
    startButtonEl.className = "start-button";
    startButtonEl.textContent = "Start Quiz!"
    introEl.appendChild(startButtonEl);

    gameContainerEl.replaceChildren(introEl);
}

var createQuizContainerEl = function() {
    var quizContainerEl = document.createElement("div");
    quizContainerEl.className = "quiz-container";
    quizContainerEl.innerHTML = "<h2>" + questions[questionCounter].questionText + "</h2>"
    quizContainerEl.appendChild(createAnswersEl());
    quizContainerEl.className = "quiz-container";

    gameContainerEl.replaceChildren(quizContainerEl);
}

var createAnswersEl = function() {
    var answersContainerEl = document.createElement("div");
    console.log(answersContainerEl);
    console.log("am i crazy that this should come before the object is made ")
    answersContainerEl.className = "answers-container";

    answers = questions[questionCounter].answers;
    for (i=0; i<answers.length; i++) {
        answerButton = document.createElement("button");
        answerButton.className = "answer-button";
        answerButton.textContent = answers[i].answerText;
        answerButton.setAttribute("data-answer-isCorrect", answers[i].isCorrect);
        console.log("i == "+ i + "and answersContainerEl = "+ answersContainerEl)
        answersContainerEl.appendChild(answerButton);
    }
    return answersContainerEl;

}

var createResultsEl = function() {
    var resultsContainerEl = document.createElement("div");
    resultsContainerEl.innerHTML = "<h3>All done!</h3>" + "<p>Your final score is: " + finalScore + "</p>";
    debugger;
    if (scores.length === 0){
        var initialsInputEl = document.createElement("input");
        initialsInputEl.className = "initials-input";
        resultsContainerEl.appendChild(initialsInputEl);


        var submitScoreButton = document.createElement("button");
        submitScoreButton.textContent = "Submit"
        submitScoreButton.className = "score-submit-button"
        resultsContainerEl.appendChild(submitScoreButton);
    }

    else if (finalScore <= 0 | (finalScore <= scores[scores.length-1][1] & scores.length===10)) {
        var viewScoreButton = document.createElement("button");
        viewScoreButton.textContent = "View High Scores";
        viewScoreButton.className = "view-scores-button";
        resultsContainerEl.appendChild(viewScoreButton);
    }
    else {
        var initialsInputEl = document.createElement("input");
        initialsInputEl.className = "initials-input";
        resultsContainerEl.appendChild(initialsInputEl);


        var submitScoreButton = document.createElement("button");
        submitScoreButton.textContent = "Submit"
        submitScoreButton.className = "score-submit-button"
        resultsContainerEl.appendChild(submitScoreButton);
    }

    gameContainerEl.replaceChildren(resultsContainerEl);
}

var createHighScoresEl = function() {
    var HighScoresEl = document.createElement("div");
    HighScoresEl.innerHTML = "<h2>Quiz High Scores:</h2>";

    scoresListEl = document.createElement("ol");
    for (i=0; i<scores.length; i++) {
        listItemEl = document.createElement("li");
        listItemEl.textContent = scores[i][0] + ": " + scores[i][1];
        scoresListEl.appendChild(listItemEl);
    }
    HighScoresEl.appendChild(scoresListEl);

    var restartButton = document.createElement("button");
    restartButton.textContent = "Restart Game";
    restartButton.className = "restart-button";
    HighScoresEl.appendChild(restartButton);

    gameContainerEl.replaceChildren(HighScoresEl);
}




var validateInitials = function(initials) {
    return initials.length < 4 && initials.length > 0 && typeof(initials) === "string"
}

var updateScores = function(initials) {
    if (scores.length < 10) {
        scores.push([initials, finalScore]);
        scores.sort(function(first, second) {return second[1] - first[1]});
        localStorage.setItem("scores", JSON.stringify(scores))

    }
    else {
        scores[scores.length - 1] = [initials, finalScore];
        scores.sort(function(first, second) {return second[1] - first[1]});
        localStorage.setItem("scores", JSON.stringify(scores))
    }
}

var scoreAnswer = function(isCorrect) {
    if (isCorrect === "false"){
        console.log("incorrect!");
        timerCounter = Math.max(0, timerCounter-10);
        clearInterval(timerId);
        setTimer();
    }
    else {
        console.log("correct!");
    }

    questionCounter++
    if (questionCounter < questions.length) {
        createQuizContainerEl();
    }
    else {
        finalScore = timerCounter;
        console.log("final score =" + finalScore)
        clearInterval(timerId);
        createResultsEl();
    }
}

var setTimer = function() {
    timerId = setInterval(function() {

        if (timerCounter<=0) {
            finalScore = 0;
            clearInterval(timerId);
            console.log("time expired");
            createResultsEl();
        }
        else {
            timerCounter--;
        }
        timerContentEl.textContent = "Time Remaining: " + timerCounter;
     }, 1000);
}

var gameButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".answer-button")) {
        scoreAnswer(targetEl.getAttribute("data-answer-isCorrect"));
    }

    if (targetEl.matches(".start-button")) {
        createQuizContainerEl();
        setTimer();
        console.log("timerID = " + timerId)
    }

    if (targetEl.matches(".score-submit-button")){
        initials = document.querySelector(".initials-input").value;
        if (validateInitials(initials)){
            updateScores(initials);
            createHighScoresEl();
            return false;
        }
        else {
            window.alert("Initials must be less than 4 characters.")
        }
    }

    if (targetEl.matches(".view-scores-button")) {
        createHighScoresEl();
    }

    if (targetEl.matches(".restart-button")) {
        questionCounter = 0;
        timerCounter = 40;
        createIntroEl();
    }

}


scores = loadScores();
createIntroEl();
gameContainerEl.addEventListener("click", gameButtonHandler);
