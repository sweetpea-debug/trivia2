const puzzleCardsEl = document.getElementById("puzzle-cards");
const categoryFilterEl = document.getElementById("category-filter");
const difficultyFilterEl = document.getElementById("difficulty-filter");

const categorySet = [...new Set(window.PUZZLES.map((puzzle) => puzzle.category))];
categorySet.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category[0].toUpperCase() + category.slice(1);
  categoryFilterEl.appendChild(option);
});

function badge(label, type) {
  return `<span class="badge ${type}-${label.toLowerCase()}">${label}</span>`;
}

function renderCards() {
  const category = categoryFilterEl.value;
  const difficulty = difficultyFilterEl.value;

  const filtered = window.PUZZLES.filter((puzzle) => {
    const categoryMatch = category === "all" || puzzle.category === category;
    const difficultyMatch = difficulty === "all" || puzzle.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });

  puzzleCardsEl.innerHTML = filtered
    .map(
      (puzzle) => `
      <article class="card card-link">
        <h3>${puzzle.title}</h3>
        <p>${puzzle.description}</p>
        <div class="badges">
          ${badge(puzzle.category, "category")}
          ${badge(puzzle.difficulty, "difficulty")}
        </div>
        <a class="btn" href="puzzle.html?id=${puzzle.id}">Open Puzzle</a>
      </article>
    `,
    )
    .join("");

  if (!filtered.length) {
    puzzleCardsEl.innerHTML = `<p class="empty-state">No puzzles match these filters yet.</p>`;
  }
}

categoryFilterEl.addEventListener("change", renderCards);
difficultyFilterEl.addEventListener("change", renderCards);

renderCards();
