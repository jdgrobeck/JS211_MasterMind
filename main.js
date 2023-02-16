'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArray = solution.split(''); // ['a', 'b', 'c', 'd'] // splits solution into new array
  let guessArray = guess.split('') ;    // guess.split ['a', 'd', 'b', 'c'] // splits guess into new array      
  let correctLetterLocations = 0;        // record how many corect "letter-locations" were guessed
  let correctLetters = 0;               // how many correct "letters" not in correct locations

  // compare the values at each index with a for loop
  for (let i=0; i < solutionArray.length; i++){ // runs loop through solition array, adds 1 to correctLetterLocations and sets corresponding location in solutionArray to null
    if(solutionArray[i] === guessArray[i]){
      correctLetterLocations++
      solutionArray[i] = null;

    }
                                            
  }
  // check for correctLetter
  for (let i=0; i < solutionArray.length; i++){  // runs loop through solution array
    let targetIndex = solutionArray.indexOf(guessArray[i]) // variable checking if solutionArray has any of the same letters as guessArray, but letter isn't in correct position
    if(targetIndex > -1){ // if letter is in array, make corresponding letter in solition array null and add 1 to correctLetters
      correctLetters++;
      solutionArray[targetIndex] = null; 
    }
  
  } // end of second for loop
console.log("You have " + correctLetterLocations + " letters in the right place, and " + correctLetters + " correct letters in the wrong place.")
return correctLetterLocations + "-" + correctLetters;
} // end of generateHint

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  let hint = generateHint(guess) // new variable with result from generateHint
  board.push(`${guess} - ${hint}`) // adds guess and hint to the board

  if (solution === guess){ // if solution = guess, the player wins
    return "You guessed it!";
  }

  if (board.length > 9){ // if player has more than 10 inoccrect guesses, game ends and solution is given
    console.log(`You ran out of turns! The solution was ${solution}`)
    return `You ran out of turns! The solution was ${solution}`
  }

  else {
    console.log("Guess again.")
    return "Guess again"
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}