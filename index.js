

// ---------- Elements ----------
const board = document.getElementById("board");
const boxes = document.querySelectorAll(".box");
const title = document.getElementById("title");
const rBtn = document.getElementById("rstbtn");
const themeSelect = document.getElementById("theme");
const htmlEl = document.documentElement;

// ---------- Game State ----------
let currentPlayer = "X";
let filledCount = 0;
const winningCondition = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// ---------- Theme Handling ----------
(function initTheme() {
  const saved = localStorage.getItem("ttt-theme") || "minimal";
  htmlEl.setAttribute("data-theme", saved);
  themeSelect.value = saved;
})();

themeSelect.addEventListener("change", (e) => {
  const t = e.target.value;
  htmlEl.setAttribute("data-theme", t);
  localStorage.setItem("ttt-theme", t);
});

// ---------- Helpers ----------
function clearBoardVisuals() {
  boxes.forEach(b => {
    b.textContent = "";
    b.classList.remove("X","O","winnerClass");
  });
}

function endGame(message) {
  title.textContent = message;
  board.removeEventListener("click", onBoardClick);
}

function applyWinnerStyles(indices) {
  indices.forEach(i => boxes[i].classList.add("winnerClass"));
}

function checkWinner() {
  for (const line of winningCondition) {
    const [a,b,c] = line;
    const va = boxes[a].textContent;
    const vb = boxes[b].textContent;
    const vc = boxes[c].textContent;
    if (va && va === vb && vb === vc) {
      return { symbol: va, indices: line };
    }
  }
  return null;
}

// ---------- Game Logic ----------
function onBoardClick(e) {
  const cell = e.target;
  if (!cell.classList.contains("box")) return;
  if (cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer); // colorize X/O
  filledCount++;

  const result = checkWinner();
  if (result) {
    applyWinnerStyles(result.indices);
    endGame(`Winner is ${result.symbol}`);
    return;
  }

  if (filledCount === 9) {
    endGame("MATCH IS DRAWN");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

board.addEventListener("click", onBoardClick);

// ---------- Restart ----------
rBtn.addEventListener("click", () => {
  clearBoardVisuals();
  title.textContent = "Tic-Tac-Toe";
  currentPlayer = "X";
  filledCount = 0;
  board.addEventListener("click", onBoardClick, { once: false });
});
