const shell = document.getElementById("quiz-shell");
const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");
const quiz = window.QUIZZES.find((item) => item.id === quizId);

if (!quiz) {
  shell.innerHTML = "<h1>Quiz not found</h1><p>Please return to the hub and select a valid quiz.</p>";
} else {
  let index = 0;
  let score = 0;

  const normalize = (value) => value.trim().toLowerCase();

  function render() {
    const question = quiz.questions[index];
    if (!question) {
      shell.innerHTML = `
        <h1>${quiz.title}</h1>
        <p class="muted">Completed</p>
        <p class="result">Final score: ${score} / ${quiz.questions.length}</p>
        <a class="btn" href="quizzes.html">Back to Quiz Hub</a>
      `;
      return;
    }

    shell.innerHTML = `
      <div class="quiz-meta">
        <h1>${quiz.title}</h1>
        <p>${quiz.description}</p>
        <p class="muted">Question ${index + 1} of ${quiz.questions.length}</p>
      </div>
      <div class="card question-card">
        <p class="question">${question.prompt}</p>
        <label for="typed-answer">Your answer</label>
        <input id="typed-answer" autocomplete="off" placeholder="Type your answer" />
        <div class="row">
          <button class="btn" id="submit-answer">Check Answer</button>
          <button class="btn btn-secondary" id="next-question" disabled>Next</button>
        </div>
        <p id="feedback" class="feedback"></p>
      </div>
      <p class="muted">Score: <strong>${score}</strong></p>
    `;

    const answerEl = document.getElementById("typed-answer");
    const feedbackEl = document.getElementById("feedback");
    const submitBtn = document.getElementById("submit-answer");
    const nextBtn = document.getElementById("next-question");

    function check() {
      const candidate = normalize(answerEl.value);
      const answer = normalize(question.answer);
      const aliases = (question.aliases || []).map(normalize);
      const isCorrect = candidate === answer || aliases.includes(candidate);

      if (isCorrect) {
        score += 1;
        feedbackEl.className = "feedback good";
        feedbackEl.textContent = "Correct! Great job.";
      } else {
        feedbackEl.className = "feedback bad";
        feedbackEl.textContent = `Not quite. Correct answer: ${question.answer}`;
      }

      answerEl.disabled = true;
      submitBtn.disabled = true;
      nextBtn.disabled = false;
    }

    submitBtn.addEventListener("click", check, { once: true });
    answerEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !submitBtn.disabled) {
        check();
      }
    });

    nextBtn.addEventListener("click", () => {
      index += 1;
      render();
    });
  }

  render();
}
