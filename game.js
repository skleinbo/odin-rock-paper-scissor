/* eslint-disable quotes */
const Moves = ["Rock", "Paper", "Scissor"];
let computerScore = 0;
let playerScore = 0;
let canMove = true;
const bestOf = 5;

const overlay = document.querySelector(".resultOverlay");
const buttons = document.querySelectorAll(".tokenBtn");

function getComputerMove() {
  return Math.floor(Math.random() * 3);
}

function highlightComputerMove(move) {
  document.querySelector(`div[data-token="${move}"]`)
    .classList.add("highlightComputer");
}

function endGame() {
  canMove = false;
  let innerText;
  if (playerScore > computerScore) innerText = "You win!";
  else if (computerScore > playerScore) innerText = "Computer wins.";
  else innerText = "Draw.";

  const btncont = document.querySelector('.btnContainer');
  const mwh = Math.min(btncont.clientWidth, btncont.clientHeight);
  console.log(mwh);
  overlay.style.width = `${mwh}px`;
  overlay.style.height = `${mwh}px`;
  overlay.innerHTML = `
    <p class="winnerText">${innerText}</p>
    <p class="clickToPlay">Click to play again.</p>
    `;
  overlay.classList.remove("hidden");
  overlay.classList.add("animate");
}

function setScoreText() {
  document.querySelector("#score").textContent = `${playerScore} - ${computerScore}`;
}

function resetScore() {
  computerScore = 0;
  playerScore = 0;
  setScoreText();
  canMove = true;
}

function resetHighlights() {
  buttons.forEach((btn) => {
    btn.classList.remove("highlightPlayer");
    btn.classList.remove("highlightComputer");
  });
  overlay.classList.remove("animate");
  overlay.classList.add("hidden");
}

function play(move) {
  const playerMove = parseInt(move, 10);

  const computerMove = getComputerMove();
  highlightComputerMove(computerMove);

  let msg = `You move ${Moves[playerMove]} against ${Moves[computerMove]}.`;
  const winner = computerMove - playerMove; // -2..+2

  if (winner === 1 || winner === -2) {
    computerScore += 1;
    msg += " Computer wins.";
  } else if (winner === 2 || winner === -1) {
    playerScore += 1;
    msg += " You win.";
  } else {
    msg += " Draw.";
  }

  setScoreText();
  console.log(msg);

  if (playerScore + computerScore === bestOf) {
    endGame();
    return;
  }

  setTimeout(resetHighlights, 500);
  canMove = true;
}

buttons.forEach((btn) => {
  btn.addEventListener(
    "click",
    () => {
      if (canMove) {
        btn.classList.add("highlightPlayer");
        canMove = false;
        // console.log(btn)
        play(btn.getAttribute("data-token"));
      }
    },
  );
});

overlay.addEventListener("click", () => {
  resetHighlights();
  resetScore();
});
