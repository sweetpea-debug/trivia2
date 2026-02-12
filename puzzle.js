const shell = document.getElementById("puzzle-shell");
const params = new URLSearchParams(window.location.search);
const puzzleId = params.get("id");
const puzzle = window.PUZZLES.find((item) => item.id === puzzleId);

if (!puzzle) {
  shell.innerHTML = "<h1>Puzzle not found</h1><p>Please return to the gallery and select a valid puzzle.</p>";
} else {
  shell.innerHTML = `
    <h1>${puzzle.title}</h1>
    <p>${puzzle.description}</p>
    <p class="question">${puzzle.prompt}</p>
    <div id="puzzle-ui"></div>
    <div class="row">
      <button class="btn btn-secondary" id="hint-btn">Show Hint</button>
    </div>
    <p id="hint" class="muted"></p>
    <p id="feedback" class="feedback"></p>
  `;

  const ui = document.getElementById("puzzle-ui");
  const hintBtn = document.getElementById("hint-btn");
  const hintEl = document.getElementById("hint");
  const feedbackEl = document.getElementById("feedback");

  hintBtn.addEventListener("click", () => {
    hintEl.textContent = `Hint: ${puzzle.hint}`;
  });

  const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");

  function evaluate(candidate) {
    const correct = normalize(puzzle.answer);
    const aliases = (puzzle.aliases || []).map(normalize);
    const typed = normalize(candidate);
    const isCorrect = typed === correct || aliases.includes(typed);

    feedbackEl.className = `feedback ${isCorrect ? "good" : "bad"}`;
    feedbackEl.textContent = isCorrect
      ? "Solved! Excellent reasoning."
      : "Not solved yet — try refining your logic.";
  }

  if (puzzle.type === "code") {
    ui.innerHTML = `
      <div class="code-inputs">
        <input maxlength="1" inputmode="numeric" aria-label="Digit 1" />
        <input maxlength="1" inputmode="numeric" aria-label="Digit 2" />
        <input maxlength="1" inputmode="numeric" aria-label="Digit 3" />
      </div>
      <button class="btn" id="check-code">Check Code</button>
    `;

    const inputs = [...ui.querySelectorAll("input")];
    inputs.forEach((input, idx) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && inputs[idx + 1]) {
          inputs[idx + 1].focus();
        }
      });
    });

    document.getElementById("check-code").addEventListener("click", () => {
      const code = inputs.map((el) => el.value).join("");
      evaluate(code);
    });
  } else {
    ui.innerHTML = `
      <label for="solution">Your solution</label>
      <input id="solution" autocomplete="off" placeholder="Type your solution" />
      <div class="row">
        <button class="btn" id="check-solution">Check Solution</button>
      </div>
    `;

    const solutionEl = document.getElementById("solution");
    const checkBtn = document.getElementById("check-solution");
    checkBtn.addEventListener("click", () => evaluate(solutionEl.value));
    solutionEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        evaluate(solutionEl.value);
      }
    });
  }
}
