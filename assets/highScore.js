const displayScores = document.getElementById('displayScores') // links javascript to HTML element via class "displayScores and assgns to a variable"
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // reads local storage for high scores and assigns scores to a variable

renderMessage(); // calls upon renderMessage function

// Function displays highscores stored in local storage
function renderMessage() {
    if(highScores !== null) { // if highScores is not equal to null, execute code within
        for(let i = 0; i < highScores.length; i++) { // for as long as i is less than the length of highScores, execute code within
          document.querySelector(".displayScores").innerHTML += highScores[i].name + " scored " + highScores[i].score + "<br/>"; // displays scores in DOM
        }
    }
}