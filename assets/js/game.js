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

var createAnswersEl = function() {
    var answersContainerEl = document.createElement("div");
    answersContainerEl.className = "answers-container";

    answers = questions[questionCounter].answers;
    for (i=0; i<answers.length; i++) {
        answerButton = document.createElement("button");
        answerButton.className = "answer-button";
        answerButton.textContent = answers[i].answerText;
        answerButton.setAttribute("data-answer-isCorrect", answers[i].isCorrect);

        answersContainerEl.appendChild(answerButton);
    }

    quizContentEl.appendChild(answersContainerEl)
}

var createQuestionEl = function () {
    var questionContainerEl = document.createElement("h2");
    questionContainerEl.textContent = questions[questionCounter].questionText;
    quizContentEl.appendChild(questionContainerEl);

}

var createResultsEl = function() {

}

var countdown = function() {
    console.log(counter);
    timerContentEl.textContent = "Time Remaining: " + counter

    counter--;

}

/// need to define the data structure of the questions
    ///
/// need to dynanmically generate quiz questions with buttons

quizContentEl.addEventListener("click", startQuizHandler);
