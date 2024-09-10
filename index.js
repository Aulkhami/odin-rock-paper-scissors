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

// Game Logic
function playRound(userChoice) {
  userChoice = userChoice.toLowerCase();
  const computerChoice = getComputerChoice();
  const result = getVictor(userChoice, computerChoice);

  alert(`Your choice: ${userChoice}, mine: ${computerChoice}`);
  alert(getComputerDialogue(result));

  if (result >= 0) {
    score[result]++;
  }

  alert(`Current score - You: ${score[0]}, Me: ${score[1]}`);
}

for (let i = 0; i < 5; i++) {
  playRound(getUserChoice());
}

if (score[0] > score[1]) {
  alert("Congratulations, human. You have bested me.");
} else if (score[0] < score[1]) {
  alert("It appears that silicon is superior to flesh, after all.");
} else {
  alert("We will meet again, human.");
}
