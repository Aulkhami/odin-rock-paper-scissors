// Constants
const ORDER = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return ORDER[Math.floor(Math.random() * 3)];
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

  if (result < 0) {
    alert("It's a draw.");
  } else {
    if (result === 0) {
      alert("You win, human.");
    } else if (result === 1) {
      alert("I won.");
    }

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
