# MindQuest: Trivia & Puzzles Site

A multi-page static web app with quiz and puzzle hubs.

## Pages

- `index.html`: home page
- `quizzes.html`: filterable quiz cards by category and difficulty
- `quiz.html?id=<quiz-id>`: typed-answer quiz experience with instant feedback
- `puzzles.html`: filterable puzzle cards by category and difficulty
- `puzzle.html?id=<puzzle-id>`: interactive puzzle solving pages

## Features

- Color-coded category and difficulty tags
- Typed-answer quiz flow (not multiple choice)
- Immediate right/wrong feedback
- Multiple puzzle interaction styles, including logic code entry

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
