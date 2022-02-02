const btnNew = document.querySelector("#btn--new");
const btnRoll = document.querySelector("#btn--roll");
const btnHold = document.querySelector("#btn--hold");
const dice = document.querySelector("#dice");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let scores, currenScore, activePlayer, playing;

//Functions
const resetGame = () => {
  scores = [0, 0];
  currenScore = 0;
  activePlayer = 0;
  playing = true;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currenScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
const rollDice = () => {
  if (playing) {
    const random = Math.floor(Math.random() * 6 + 1);
    dice.setAttribute("src", `dice-${random}.png`);
    dice.classList.remove("hidden");
    if (random === 1) {
      switchPlayer();
    } else {
      currenScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenScore;
    }
  }
};
const hold = () => {
  if (playing) {
    scores[activePlayer] += currenScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
};

resetGame();
btnNew.addEventListener("click", resetGame);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
