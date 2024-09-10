// Constants
const ORDER = ["rock", "paper", "scissors"];
const COMPUTER_DIALOGUE_LOSE = [
  "I see.",
  "This was not in my calculations.",
  "One point for you, human.",
  "One closer to my defeat.",
];
const COMPUTER_DIALOGUE_WIN = [
  "That was to be expected.",
  "The round is mine, human.",
  "All according to the algorithm.",
  "Victory is guaranteed.",
];
const COMPUTER_DIALOGUE_DRAW = [
  "A draw.",
  "They are the same.",
  "It was as if nothing happened at all.",
  "Try again.",
];

function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getComputerChoice() {
  return getRandomValueFromArray(ORDER);
}

function getComputerDialogue(victor) {
  if (victor === 0) {
    return getRandomValueFromArray(COMPUTER_DIALOGUE_LOSE);
  } else if (victor === 1) {
    return getRandomValueFromArray(COMPUTER_DIALOGUE_WIN);
  } else {
    return getRandomValueFromArray(COMPUTER_DIALOGUE_DRAW);
  }
}

function getUserChoice() {
  let input = "";
  while (!ORDER.find((thing) => thing == input)) {
    input = prompt("What's your choice, human?").toLowerCase();
  }

  return input;
}

function getVictor(player1, player2) {
  player1 = player1.toLowerCase();
  player2 = player2.toLowerCase();

  if (player1 == player2) {
    return -1;
  }

  const firstPos = ORDER.findIndex((thing) => thing == player1);
  const secondPos = ORDER.findIndex((thing) => thing == player2);

  let posAfterFirstPos = firstPos + 1;

  // If there isn't anything after the firstPos,
  // loop around to the first item in the ORDER
  if (posAfterFirstPos > ORDER.length - 1) {
    posAfterFirstPos = 0;
  }

  // player1 "beats" Second when player2 is not
  // the object after the player1 in the ORDER
  return !(secondPos === posAfterFirstPos) ? 0 : 1;
}

// States
const score = [0, 0];

// DOM Elements
const body = document.querySelector("body");
const playerDisplay = document.querySelector("#player");
const computerDisplay = document.querySelector("#computer");
const scoreDisplay = document.querySelector("#score");
const computerDialogue = document.querySelector("#computer-comment");
let choiceButtons = document.querySelector("#buttons");
const resetButton = document.querySelector("#reset-game");

let choiceButtonsClone;

// Game Logic
function playRound(userChoice) {
  userChoice = userChoice.toLowerCase();
  const computerChoice = getComputerChoice();
  const result = getVictor(userChoice, computerChoice);

  playerDisplay.textContent = userChoice;
  computerDisplay.textContent = computerChoice;
  computerDialogue.textContent = getComputerDialogue(result);

  if (result >= 0) {
    score[result]++;
  }

  scoreDisplay.textContent = `${score[0]} : ${score[1]}`;

  if (score.find((value) => value >= 5)) {
    choiceButtonsClone = choiceButtons.cloneNode(true);
    choiceButtons.remove();
    choiceButtons = null;

    if (score[0] > score[1]) {
      computerDialogue.textContent =
        "Congratulations, human. You have bested me.";
    } else if (score[0] < score[1]) {
      computerDialogue.textContent =
        "It appears that silicon is superior to flesh, after all.";
    } else {
      computerDialogue.textContent = "We will meet again, human.";
    }
  }
}

choiceButtons.childNodes.forEach((button) => {
  button.addEventListener("click", () => playRound(button.id));
});

resetButton.addEventListener("click", () => {
  if (!choiceButtons) {
    body.insertBefore(choiceButtonsClone, resetButton.parentNode);

    choiceButtons = choiceButtonsClone;
    choiceButtonsClone = null;
  }

  choiceButtons.childNodes.forEach((button) => {
    button.addEventListener("click", () => playRound(button.id));
  });

  score.forEach((_, index) => (score[index] = 0));
  scoreDisplay.textContent = `${score[0]} : ${score[1]}`;
  computerDialogue.textContent = "Let us begin.";
});
