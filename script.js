// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

var questionField = document.getElementById("question-field");

var questionsArray = [
    {
        question: "Who is Mario's arch nemisis?",
        answers:["Luigi", "Peach,", "Bowser", "Toadette"],
        correct:"Bowser",
    },
    {
        question: "How many Mario Party games have been released?",
        answers: ["1", "10", "18", "25"],
        correct: "25",
    },
    {
        question: "What is Mario's profession?",
        answers:["Princess Saver", "Plumber", "Electrician", "Bowser Butt Kicker"],
        correct: "Plumber",
    },
    {
        question: "Who is Mario's brother?",
        answers: ["Wario", "Waluigi", "Luigi", "He does not have a brother 0_0"],
        correct: "Luigi",
    },
    {
        question: "What is Mario's favorite vegetable?",
        answers:["Pepper", "Bean", "Mushroom", "Potato"],
        correct: "Mushroom",
    },
];

var renderButtons = (questions) => {
    for (var i = 0; i < 4; i++) {
        var answer = questions[0].answers[i];
        var btnEl = document.createElement("button");
        btnEl.textContent = answer.toUpperCase();
        btnEl.value = answer;
        questionField.appendChild(btnEl); 
        btnEl.addEventListener("click", handleUserClick);
    }
};

function handleUserClick(event) {
    var btnValue = event.target.value;
    console.log(btnValue)
}

renderButtons(questionsArray)