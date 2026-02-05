let questions = [];
let currentQuestion;
let selectedIndex = -1;

let topicSelect = document.getElementById("topicSelect");
let questionText = document.getElementById("questionText");
let optionsBox = document.getElementById("optionsBox");
let feedback = document.getElementById("feedback");

let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submitBtn");
let nextBtn = document.getElementById("nextBtn");

function loadQuestions() {
  fetch("data/questions.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      questions = data;
      fillTopics();
    });
}

function fillTopics() {
  let topics = [];
  for (let i = 0; i < questions.length; i++) {
    if (topics.indexOf(questions[i].topic) === -1) {
      topics.push(questions[i].topic);
    }
  }

  for (let j = 0; j < topics.length; j++) {
    let opt = document.createElement("option");
    opt.value = topics[j];
    opt.textContent = topics[j];
    topicSelect.appendChild(opt);
  }
}

function showQuestion() {
  optionsBox.innerHTML = "";
  feedback.textContent = "";
  submitBtn.disabled = true;
  nextBtn.disabled = true;

  let list = questions;
  let chosen = topicSelect.value;

  if (chosen !== "") {
    list = questions.filter(function(q) {
      return q.topic === chosen;
    });
  }

  currentQuestion = list[Math.floor(Math.random() * list.length)];
  questionText.textContent = currentQuestion.question;

  for (let i = 0; i < currentQuestion.options.length; i++) {
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = i;

    radio.onclick = function() {
      selectedIndex = i;
      submitBtn.disabled = false;
    };

    optionsBox.appendChild(radio);
    optionsBox.appendChild(
      document.createTextNode(" " + currentQuestion.options[i])
    );
    optionsBox.appendChild(document.createElement("br"));
  }
}

startBtn.onclick = function() {
  loadQuestions();
  setTimeout(showQuestion, 300);
};

submitBtn.onclick = function() {
  if (selectedIndex === currentQuestion.answerIndex) {
    feedback.textContent = "Correct! " + currentQuestion.explanation;
  } else {
    feedback.textContent = "Wrong. " + currentQuestion.explanation;
  }
  nextBtn.disabled = false;
};

nextBtn.onclick = function() {
  selectedIndex = -1;
  showQuestion();
};
