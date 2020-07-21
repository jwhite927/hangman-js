let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();

let revealedLetters = new Array(word.length);
revealedLetters.fill(false);

const maxStrikes = 6;
let strikes = 0;

let strikeLetters = new Array(maxStrikes);

/* Get HTML Elements */
let wordProg = document.getElementById("wordProg");
let strikeHeader = document.getElementById("strikes");
let gallows = document.getElementById("gallows");
let guessForm = document.getElementById("formElement");

drawWordProgress();

function drawStrikeLetters(guess) {
    strikeLetters[strikes] = guess;
    let strikeStr = "";
    let index = 0;
    while (index <= strikes){
	strikeStr += strikeLetters[index] + " ";	
	index++;
    }
    strikeHeader.innerHTML = strikeStr;
}

function drawWordProgress() {
    let puzzleStr = "";
    let index = 0;
    /* Create puzzleStr based on correctly guessed letters */
    while (index < word.length) { 

	if (revealedLetters[index]){
	    puzzleStr += word[index] + " ";
	    index++;
	    continue;
	}
	else
	    puzzleStr += "- ";

	index++;
    }
    wordProg.innerHTML = puzzleStr;
    index = 0;
    /* Give the victory message if all letters are revealed */
    while (revealedLetters[index]) {
	if (index == word.length - 1){
    	/* Removes the form to stop play */
	    guessForm.outerHTML = "";
	    alert("Player2 Completed the Word!\n\nRefresh to Play Again");
	}
	index++;
    }
}

function drawGallows() {
    gallows.src = "images/strike-" + strikes + ".png";
}

guessForm.addEventListener("submit", processGuess);

function processGuess(event) {
    event.preventDefault();
    let guess = document.getElementById("guessInput").value.toUpperCase();
    guess = guess.charAt(0);

    let notInPuzzle = true;
    let index = 0;
    while (index < word.length){
	if(word.charAt(index) == guess){
	    revealedLetters[index] = true;
	    notInPuzzle = false;
	}
	index++;
    }
    drawWordProgress();

    /* Check if letter has already been guessed */
    for (let i = 0; i <= strikes; i++){ 
	if (guess == strikeLetters[i]){
	    alert(guess + " has already been guessed!\n\nChoose a different character.");
	    notInPuzzle = false;
	    break;
	}
    }

    /* Add to strike letters if a strike */
    if (notInPuzzle == true) { 

	drawStrikeLetters(guess);
	strikes++;
	drawGallows();
    }

    if (strikes < maxStrikes) {
	return;
    } else
    /* Removes the form to stop play */
	guessForm.outerHTML = ""; 
    alert("Player1 wins!\n\nRefresh to Play Again");
}
