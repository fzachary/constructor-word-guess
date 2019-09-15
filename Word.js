var Letter = require('./Letter.js');

function Word(word) {

    // Create an empty array that will be filled with the letters of the goal work
    this.letterArr = [];

    // Loop through the goal word and push the letters into the array
    for (var i = 0; i < word.length; i++) {
        var letter = new Letter(word[i]);
        this.letterArr.push(letter);
    }

    this.answer = function() {
        answer = "";
        for (var i = 0; i < this.letterArr.length; i++) {
            answer += this.letterArr[i] + " ";
        }
        console.log(answer + "\n");
    }

    this.userGuess = function(input) {
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].guess(input);
        }
    }
};

module.exports = Word;