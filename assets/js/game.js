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
    {questionText: "What color is pongo?",
        answers: [
           {answerText:"purple",
               isCorrect: false},
           {answerText:"blue",
               isCorrect: false},
           {answerText:"green",
               isCorrect: false},
           {answerText:"black and white",
               isCorrect: true}]
       }
];
var questionCounter = 0;
var timerCounter = 20;
var timerId;
var timerContentEl = document.querySelector("#counter");
timerContentEl.textContent = "Time Remaining: " + timerCounter;
var finalScore = 0;
var gameContainerEl = document.querySelector("#game-container")
var introContainerEl = document.querySelector("#intro-container")

var createResultsEl = function() {
    var resultsContainerEl = document.createElement("div");
    resultsContainerEl.innerHTML = "<h3>This is results content</h3>";
    gameContainerEl.replaceChildren(resultsContainerEl);
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





gameContainerEl.addEventListener("click", gameButtonHandler);
