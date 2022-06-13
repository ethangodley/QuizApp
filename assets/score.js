const username = document.getElementById('username'); // links javascript to HTML and assigns to variable
const saveScoreBtn = document.getElementById('saveScoreBtn'); // links javascript to HTML and assigns to variable
const finalScore = document.getElementById('finalScore'); // links javascript to HTML and assigns to variable
const mostRecentScore = localStorage.getItem('score'); // finds item in local storage and assigns to variable
const displayScores = document.getElementById('displayScores') // links javascript to HTML and assigns to variable
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // finds item in local storage and assigns to variable


finalScore.innerText = "you scored " + mostRecentScore +" out of 60!"; // displays user score from completed quiz to DOM
renderMessage(); // calls function to display high scores

// function displays high scores
function renderMessage() {
    if(highScores !== null) {
        for(let i = 0; i < highScores.length; i++) { // for as long as i is less than the length of highScores, execute code within
          document.querySelector(".displayScores").innerHTML += highScores[i].name + " scored " + highScores[i].score + "<br/>"; // displays scores in DOM
        }
    }
}

// if no username entered, score cannot be saved
username.addEventListener('keyup', (event) => {
    saveScoreBtn.disabled = !username.value;
});

// function allows user to save their score
function saveHighScore(event) {

    // assigns most recent score to object containing users name and score
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score); // assigns value to elements within score object
    highScores.sort((a, b) => b.score - a.score); // sorts high scores from highest score to lowest score
    highScores.splice(5); // keeps the top 5 scores and removews the other scores

    localStorage.setItem('highScores', JSON.stringify(highScores)); // stores high scores in local storage
}