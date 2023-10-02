const questions = [
    {
        question: "What does HTML stand for?",
        options: [" Hyperlink and Text Markup Language", "Hyper Transfer Markup Language", "Hyper Text Makeup Language", " Hyper Text Markup Language"],
        correctAnswer: 3
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", " text-color", "font-color", "textColor"],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is not a valid HTML5 tag?",
        options: ["<article>", "<section>", "<div>", "<container>"],
        correctAnswer: 3
    },
    {
        question: "What does the CSS property `display: flex;` do?",
        options: ["Makes an element invisible", "Centers an element horizontally", "Turns an element into a block-level container", "Establishes a flex container and enables flex layout for its direct children"],
        correctAnswer: 3
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionElements = document.querySelectorAll("label span");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");

function loadQuestion() {
    const currentQues = questions[currentQuestion];
    questionText.textContent = currentQues.question;
    for (let i = 0; i < 4; i++) {
        optionElements[i].textContent = currentQues.options[i];
    }
    
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (!selectedOption) {
        resultText.textContent = "Please select an answer.";
        return;
    }

    const selectedAnswer = parseInt(selectedOption.value);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        resultText.textContent = currentQuestion +1 + " of 5";
        score++;
    } else {
        resultText.textContent = currentQuestion +1 + " of 5";
    }

    submitButton.disabled = true;
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        submitButton.disabled = false;
        nextButton.disabled = true;
        resultText.textContent = "";
    } else {
        // Display final score
        questionText.textContent = "Quiz Completed!";
        resultText.textContent = "Your Score: " + score + " out of " + questions.length;
        submitButton.style.display = "none";
        nextButton.style.display = "none";
        scoreText.textContent = "Thank you for completing the quiz";
    }
}

loadQuestion();

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
