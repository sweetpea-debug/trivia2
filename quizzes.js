const quizCardsEl = document.getElementById("quiz-cards");
const categoryFilterEl = document.getElementById("category-filter");
const difficultyFilterEl = document.getElementById("difficulty-filter");

const categorySet = [...new Set(window.QUIZZES.map((quiz) => quiz.category))];
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

  const filtered = window.QUIZZES.filter((quiz) => {
    const categoryMatch = category === "all" || quiz.category === category;
    const difficultyMatch = difficulty === "all" || quiz.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });

  quizCardsEl.innerHTML = filtered
    .map(
      (quiz) => `
      <article class="card card-link">
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
        <div class="badges">
          ${badge(quiz.category, "category")}
          ${badge(quiz.difficulty, "difficulty")}
        </div>
        <a class="btn" href="quiz.html?id=${quiz.id}">Open Quiz</a>
      </article>
    `,
    )
    .join("");

  if (!filtered.length) {
    quizCardsEl.innerHTML = `<p class="empty-state">No quizzes match these filters yet.</p>`;
  }
}

categoryFilterEl.addEventListener("change", renderCards);
difficultyFilterEl.addEventListener("change", renderCards);

renderCards();
