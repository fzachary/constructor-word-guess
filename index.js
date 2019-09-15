var Word = require("./Word.js");
var inquirer = require("inquirer");

// Array of possible choices
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to chose from
var wordBank = ["adagio", "largo", "andantino", "sonata", "rondo", "concerto", "presto", "vivace", "divertimento", "notturno", "sarabande", "toccata"];

// Choose a random word from the word bank
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = wordBank[randomIndex];

// Pass the random word through the Word constructor function
wordToGuess = new Word(randomWord);

var requireWordToGuess = false;

// Array for the guessed letters
var wrongGuesses = [];
var rightGuesses = [];

// The Number of Guesses left
var guessesLeft = 10;

function game () {

    // Generates new word if true
    if(requireWordToGuess) {

        var randomIndex = Math.floor(Math.random() * wordBank.length);
        var randomWord = wordBank[randomIndex];

        wordToGuess = new Word(randomWord);

        requireWordToGuess = false;
    }

    // Check if the guessed letter is correct
    var wordComp = [];
    wordToGuess.letterArr.forEach(completeCheck);

    if(wordComp.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter between A and Z!",
                name: "userInput"
            }
        ]).then(function(input) {
            if(!letterArray.includes(input.userInput) || input.userInput.length > 1) {
                console.log("\nPlease try again\n");
                game();
            } else {
                if(wrongGuesses.includes(input.userInput) || rightGuesses.includes(input.userInput) || input.userInput === "") {
                console.log("\nAlready guessed that letter, or did not provide input...\n");
                game();
                } else {
                
                var wordCheckArr = [];

                wordToGuess.userGuess(input.userInput);

                wordToGuess.letterArr.forEach(wordCheck);
                
                if(wordCheckArr.join('') === wordComp.join('')) {
                    console.log("\nIncorrect\n");
                    wrongGuesses.push(input.userInput);
                    guessesLeft--;
                } else {
                    console.log("\nCorrect!\n");
                    rightGuesses.push(input.userInput);
                }

                wordToGuess.answer();

                console.log("Guesses left: " + guessesLeft + "\n");

                console.log("Letters guessed: " + wrongGuesses.join(" ") + "\n");

                if (guessesLeft > 0) {
                    game();
                } else {
                    console.log("Sorry, game over.\n");
                    restartGame();
                }

                function wordCheck(key) {
                    wordCheckArr.push(key.guessed);
                }
                }
            }
        });
    } else {
        console.log("YOU WIN!\n");
        restartGame();
    }

    function completeCheck(key) {
        wordComp.push(key.guessed)
    }
}

function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which would you like to do?",
            choices: ["PLAY AGAIN", "EXIT"],
            name: "restart"
        }
    ]).then(function(answer) {
        if(answer.restart === "PLAY AGAIN") {
            requireWordToGuess = true;
            wrongGuesses = [];
            rightGuesses = [];
            guessesLeft = 10;
            game();
        } else {
            return
        }
    });
}

game();