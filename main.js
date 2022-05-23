const answerContainer = document.querySelector(".answers");

async function getApi() {
  let index = 0;
  const api = await fetch(
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
  );
  if (!api.ok) return;
  const data = await api.json();

  const cards = data.results.map((el) => el);

  getInfo(cards, index);
  checkAnswer(cards, index);
}

function getInfo(cards, index) {
  let card = cards[index];
  document.querySelector(".question").innerHTML = card.question;

  let answers = [card.correct_answer, ...card.incorrect_answers];
  shuffle(answers);

  answerContainer.querySelectorAll("span").forEach((span, i) => {
    span.innerHTML = answers[i];
  });
}

function checkAnswer(cards, index) {
  let card = cards[index];
  let scoreContainer = document.querySelector(".score__count");
  let finalScore = document.querySelector(".final-score");
  let questBar = document.querySelector(".quest__bar");
  let score = 0;

  answerContainer.querySelectorAll("span").forEach((span) => {
    span.addEventListener("click", () => {
      if (index == cards.length - 1) {
        document.querySelector(".game-quest").style.display = "none";
        finalScore.innerHTML = `
      <p>Your Score is <span>${score}</span>🎉</p>
        `;
        return;
      }

      if (span.innerHTML == card.correct_answer) {
        score += 10;
        scoreContainer.innerHTML = score;
      }

      questBar.innerHTML += `<div></div>`;
      index++;
      card = cards[index];
      changeQuest(cards, index);
    });
  });
}

function changeQuest(cards, index) {
  document.querySelector(".quest__curr").innerHTML = index + 1;
  getInfo(cards, index);
}

function shuffle(answers) {
  for (let i = answers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
  return answers;
}

getApi();
