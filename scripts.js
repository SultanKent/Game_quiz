const quizData = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: ["var x = 10;", "variable x = 10;", "let x = 10;", "const x = 10;"],
    correct: 2,
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    answers: ["<!-- This is a comment -->", "/* This is a comment */", "// This is a comment", "** This is a comment **"],
    correct: 2,
  },
  {
    question: "What will be the output of the following code?\n\nlet x = 5;\nlet y = '10';\nconsole.log(x + y);",
    answers: ["510", "15", "'510'", "Error"],
    correct: 0,
  },
  {
    question: "Which built-in method can be used to convert a string to all lowercase letters?",
    answers: ["toLowerCase()", "changeCase('lower')", "lowerCase()", "convertToLower()"],
    correct: 0,
  },
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answers: ["It checks if a variable is undefined.", "It returns the data type of a given variable.", "It converts a variable to a string type.", "It checks if a variable is null."],
    correct: 1,
  },
  {
    question: "How do you add an element to the end of an array in JavaScript?",
    answers: ["arr.append(element)", "arr.addToEnd(element)", "arr.push(element)", "arr.addLast(element)"],
    correct: 2,
  }      
];

let currentQuestion = 0;
let maxScore = 0;

const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll(".answer");
const quizElement = document.getElementById("quiz");
const game = document.getElementById("game");
const waiting = document.getElementById("waiting");
const dino = document.getElementById("dino");
let score = document.getElementById("score");
let quiz = document.getElementById("quiz");
const cactus = document.getElementById("cactus");
const cactus2 = document.getElementById("cactus2");
let isDinoAlive = true;

function switchCactus() {
  if (isDinoAlive) {
    const newCactus = getRandomCactus();
    document.getElementById(newCactus).style.display = 'block';
    currentCactus = newCactus;
  }
}

let currentCactus = getRandomCactus();

function getRandomCactus() {
  const cacti = ['cactus', 'cactus2'];
  const randomIndex = Math.floor(Math.random() * cacti.length);
  const selectedCactus = cacti[randomIndex];

  for (let i = 0; i < cacti.length; i++) {
    document.getElementById(cacti[i]).style.display = 'none';
  }
  
  return selectedCactus;
}

let cactusInterval = setInterval(switchCactus, 2000);

function dinoDead() {
  isDinoAlive = false;
  dino.style.display = "none";
  let dinoDead = document.getElementById("dino-dead");
  dinoDead.style.display = "block";
  document.getElementById("cactus").style.display = "none";
  document.getElementById("cactus2").style.display = "none";
}

function dinoAlive() {
  isDinoAlive = true;
  dino.style.display = "block";
  let dinoDead = document.getElementById("dino-dead");
  dinoDead.style.display = "none";
}

function startGame() {
  document.getElementById("rules").style.display = "none";
  document.getElementById("game").style.display = "block";
  playerScore = 0; 
}

function hideElement() {
  waiting.style.display = 'none';
}

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    quizElement.style.display = "none";
  } else {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    answerElements.forEach((element, index) => {
      element.textContent = currentQuizData.answers[index];
      element.classList.remove("correct", "incorrect");
    });
  }
}

function updateMaxScore() {
  const maxScoreElement = document.getElementById("maxScore");
  maxScoreElement.textContent = maxScore;
}

function checkAnswer(selectedAnswer) {
  if (currentQuestion >= quizData.length) return;
  if (playerScore > maxScore) {
    maxScore = playerScore;
    updateMaxScore();
  }  
  const currentQuizData = quizData[currentQuestion];
  const correctAnswer = currentQuizData.correct;

  answerElements.forEach((element, index) => {
    if (index === correctAnswer) {
      element.classList.add("correct");
    } else {
      element.classList.add("incorrect");
    }
  });

  clearInterval(interval);
  if (selectedAnswer === correctAnswer) {
    playerScore++;
    score.innerHTML = `Score <p>${playerScore}</p>`;
    setTimeout(() => {
      document.getElementById(currentCactus).style.display = "block";
      dinoAlive();
    }, 2000);  
    waiting.style.display = "flex";  
    quizElement.style.display = "none"; 
  } else {
    playerScore = 0;
    score.innerHTML = "Score <p>0</p>";
    setTimeout(() => {
      document.getElementById(currentCactus).style.display = "block";
      dinoAlive();
    }, 2000);    
    waiting.style.display = "flex";
    quizElement.style.display = "none";
  }
  setTimeout(hideElement, 2000);
  setTimeout(() => {
    if (currentQuestion === quizData.length - 1) {
      currentQuestion = 0;
    } else {
      currentQuestion++;
    }

    loadQuestion();
    interval = setInterval(scoreCounter, 200); 
  }, 1500);
}

loadQuestion();

let interval = null;
let playerScore = 0;

let scoreCounter = () => {
  playerScore++;
  score.innerHTML = `Score <p>${playerScore}</p>`;
};

interval = setInterval(scoreCounter, 200);

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

game.addEventListener("click", jump);

function checkCollision() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(
    window.getComputedStyle(document.getElementById(currentCactus)).getPropertyValue("left")
  );
  
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    clearInterval(interval);
    quiz.style.display = "block";
    cactus.style.display = "none";
    cactus2.style.display = "none";
    dinoDead();
  }
}

let isAlive = setInterval(checkCollision, 10);

document.addEventListener("keydown", function (event) {
  jump();
});