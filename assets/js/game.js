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
var timerCounter = 10;
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








var quizContentEl = document.querySelector("#start-quiz");
var timerContentEl = document.querySelector("#counter");
timerContentEl.textContent = "Time Remaining: " + counter

var startQuizHandler = function() {
    console.log("clicked the button!")
    var countDownInterval = setInterval(countdown, 1000);
    // need to work on how this countdown interval is handled
    if (counter === 0) {
        console.log("blastoff");
        clearInterval(countDownInterval);
    }
}


var countdown = function() {
    console.log(counter);
    timerContentEl.textContent = "Time Remaining: " + counter

    counter--;

}

/// need to define the data structure of the questions
    ///
/// need to dynanmically generate quiz questions with buttons

gameContainerEl.addEventListener("click", startQuizHandler);
