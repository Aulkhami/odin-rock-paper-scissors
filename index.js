const ORDER = ["rock", "paper", "scissors"];

function firstBeatsSecond(first, second) {
  const firstPos = ORDER.findIndex((thing) => thing == first);
  const secondPos = ORDER.findIndex((thing) => thing == second);

  let posAfterFirstPos = firstPos + 1;
  if (posAfterFirstPos >= ORDER.length - 1) {
    posAfterFirstPos = 0;
  }

  return !(secondPos === posAfterFirstPos);
}

function playRound(player1, player2) {
  player1 = player1.toLowerCase();
  player2 = player2.toLowerCase();

  if (player1 == player2) {
    return [player1, player2, -1];
  }

  return [player1, player2, firstBeatsSecond(player1, player2) ? 0 : 1];
}

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

const score = [0, 0];

for (let index = 0; index < 5; index++) {
  const [playerChoice, computerChoice, result] = playRound(
    getUserChoice(),
    getComputerChoice()
  );
  alert(`Your choice: ${playerChoice}. Mine: ${computerChoice}`);

  if (result === -1) {
    alert("It's a draw.");
  } else if (result === 0) {
    alert("You win, human.");
  } else if (result === 1) {
    alert("I won.");
  }

  score[result]++;
  alert(`Current score - You: ${score[0]}, Me: ${score[1]}`);

  if (score.find((score) => score >= 3)) {
    break;
  }
}

if (score[0] > score[1]) {
  alert("Congratulations, human. You have bested me.");
} else {
  alert("It appears that silicon is superior to flesh, after all.");
}
