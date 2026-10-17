const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },
    {
        question: "What is CSS used for?",
        answers: [
            { text: "Managing databases", correct: false },
            { text: "Styling web pages", correct: true },
            { text: "Creating servers", correct: false },
            { text: "Compiling code", correct: false }
        ]
    },
    {
        question: "What is JavaScript mainly used for on websites?",
        answers: [
            { text: "Making websites interactive", correct: true },
            { text: "Writing HTML only", correct: false },
            { text: "Creating images only", correct: false },
            { text: "Managing files only", correct: false }
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
};

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let currentQuestionNumber = currentQuestionIndex + 1;

    questionElement.innerHTML = currentQuestionNumber + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {

        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct
        };

        button.addEventListener('click', selectAnswer);
    });

};

function resetState() {
    nextButton.style.display = 'none';

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
};

function selectAnswer(e) {
    const slectedBtn = e.target;
    const isCorrect = slectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        slectedBtn.classList.add('correct');
        score++;
    }
    else {
        slectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    };

};

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    };
});

startQuiz();