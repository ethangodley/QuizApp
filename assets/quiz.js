const question = document.getElementById('question'); // links javascript to HTML and stores in variable
const choices = Array.from(document.getElementsByClassName('choiceText')); // links javascript to HTML and stores in variable
const timeEl = document.querySelector(".time"); // links javascript to HTML and stores in variable

let currentQuestion = {}; // initialises empty object
let acceptingAnswers = false; // initializes boolean
let score = 0; // initializes number
let questionCounter = 0; // initializes number
let availableQuesions = []; // initializes array
let secondsLeft = 60; // initializes number

// array of objects containing quiz questions, their choices, and answers
let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hot Text Milo Long",
        choice3: "Hit The Mountain Lizard",
        choice4: "Hyper Text Markdown Language",
        answer: 1,
    },
    {
        question: "What does CSS stand for?",
        choice1: "Corresponding Style Sheet",
        choice2: "Cascading Style Sheet",
        choice3: "Cascading Slimy Sheet",
        choice4: "Classy Salad Salsa",
        answer: 2,
    },
    {
        question: "What does js stand for?",
        choice1: "John Smith",
        choice2: "Javasheet",
        choice3: "Javascript",
        choice4: "Jargonscript",
        answer: 3,
    },
    {
        question: "When can you use var?",
        choice1: "Always",
        choice2: "Consistantly",
        choice3: "Sometimes",
        choice4: "Never",
        answer: 4,
    },
    {
        question: "What are the characters for class and id?",
        choice1: ". & #",
        choice2: "# & .",
        choice3: "@ & ^",
        choice4: "* & $",
        answer: 1,
    },
];

const MAX_QUESTIONS = 5; // sets quiz question length

// function starts timer for quiz
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        score = 0;
        localStorage.setItem("score", score);
        return window.location.assign("./score.html");
      }
  
    }, 1000);
    getNewQuestion(); // calls upon function to begin a new question
  }

  // function begins quiz
startGame = () => {
    questionCounter = 0; // sets question counter to 0
    score = 0; // sets score to 0
    availableQuesions = [...questions]; // collects available questions
    setTime(); // calls function to begin timer
};

// function gets a new question and displays to DOM
getNewQuestion = () => {
    // if there are no more questions available or questions limit exceeded, execute code within
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        score = secondsLeft; // sets score to time left of quiz
        localStorage.setItem("score", score); // stores score to local storage
        //go to score page
        return window.location.assign('./score.html');
    }
    questionCounter++; // increases question counter by 1

    // selects a random question nnumber and assigns to variable
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex]; // puuls question from questions array
    question.innerText = currentQuestion.question; // displays question to DOM

    // for each choice available, assign relevant text and display to DOM
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1); // removes asked question from available questions
    acceptingAnswers = true;
};

// add event listener to each click so program knows which answer is selected
choices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // checks if selected answer matches actual answer
        if(selectedAnswer != currentQuestion.answer) {
            secondsLeft = secondsLeft - 10; // if answer incorrect, subtract 10 seconds from timer
        }
        getNewQuestion(); // calls function to display a new question
    });
});

startGame(); // calls function to start game


