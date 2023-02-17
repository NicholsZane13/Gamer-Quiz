var countDown = document.querySelector("#countdown");
var startButton = document.querySelector("#start-button");
var questionSection = document.querySelector(".question-box");
var answerSection = document.querySelector(".answer-section");
var completed = document.querySelector(".completed");
var submitButton = document.querySelector(".submit-button");
var correctSpot = document.querySelector(".correct");
var wrongSpot = document.querySelector(".wrong");
var yourScore = document.querySelector(".your-score");
var submitSection = document.querySelector(".submit-section");
var nextButton = document.querySelector(".next-button");
var pointTracker = document.querySelector(".point-tracker");
var wrongHide = document.querySelector(".wrong-hide");
var subtract = document.querySelector(".subtract");
var submitInitials = document.querySelector("#msg");
var playAgain = document.querySelector(".play-again");
var endGameScore = document.querySelector(".endgame-score");


var choiceQuestions;
var secondsLeft = 45;
var correctChoice = 0;
var wrongChoice = 0;
var correctAnswers = ["Luigi", "Bowser", "25", "False", "Yoshi"];
var endGameTrigger = ["Bowser", "Luigi", "Charles", "John"];

var questions = [
  {
    question: "Who is Mario's brother?",
    options: ["Bowser", "Luigi", "Charles", "John"],
  },
  {
    question: "Who is the main antagonist in the Mario Franchise.",
    options: ["Bowser", "Ludwig", "Koopa", "Wario"],
  },
  {
    question: "How many Mario Party games are there?",
    options: ["9", "25", "16"],
  },
  {
    question: "Bowser Jr. was born from an egg.",
    options: ["True", "False"],
  },
  {
    question: "What species is Yoshi?",
    options: ["Dinosaur", "Yoshi", "Turtle", "Koopa"],
  },
];

startButton.addEventListener("click", beginQuiz);

function beginQuiz() {
  setTime();
  startButton.classList.add("hide");
  runQuestion();
  pointTracker.classList.remove("hide");
}

nextButton.addEventListener("click", nextQuestion);
function nextQuestion() {
  clear();
  fill();
  subtract.classList.add("hide");
  nextButton.classList.add("hide");
}

function showNext() {
  nextButton.classList.remove("hide");
}

function runQuestion() {
  fill(choiceQuestions);
}
//clears the answers and question so the next one can be displayed
function clear() {
  while (answerSection.firstChild)
    answerSection.removeChild(answerSection.firstChild);
  while (questionSection.firstChild)
    questionSection.removeChild(questionSection.firstChild);
}
//Starts the timer for the quiz
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countDown.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);

      clear();
      endGame();
    }
  }, 1000);
}
//creates button from the options array
function fill() {
    var choiceQuestions = questions.pop();
    questionSection.innerText = choiceQuestions.question;
    choiceQuestions.options.forEach((answer) => {
      var button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("btn");
      answerSection.appendChild(button);
    });
  }

answerSection.addEventListener("click", checkAnswer);
//checks answer selected to make sure it's in the correct answer array
function checkAnswer(event) {
  var clickTarget = event.target;
  var userChoice = clickTarget.innerText;
  if (correctAnswers.includes(userChoice)) {
    correctChoice++;
  } else {
    subtract.classList.remove("hide");
    wrongChoice++;
    secondsLeft -= 3;
  }
  clear();
  showNext();
  correctSpot.textContent = correctChoice;
  wrongSpot.textContent = wrongChoice;
  if (endGameTrigger.includes(userChoice)) {
    endGame();
  }
}

function endGame() {
  countDown.classList.add("hide");
  nextButton.classList.add("hide");
  yourScore.classList.remove("hide");
  submitSection.classList.remove("hide");
  playAgain.classList.remove("hide");
  subtract.classList.add("hide");
  completed.classList.remove("hide");
}

//This saves the recent scores as a highscore
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var playerScore = {
    initials: submitInitials.value,
    score: correctChoice,
  };

  localStorage.setItem("info", JSON.stringify(playerScore));
  showScore();
});

function alwaysShow() {
    var displayScore = JSON.parse(localStorage.getItem("info"));
    document.querySelector(".score-display").textContent =
      displayScore.initials + " Scored: " + displayScore.score;
}
function showScore() {
  var lastScore = JSON.parse(localStorage.getItem("info"));
  document.querySelector(".score-display").textContent =
    lastScore.initials + " Scored: " + lastScore.score;
}

playAgain.addEventListener("click", restart);
function restart() {
  window.location.reload();
}

alwaysShow();
