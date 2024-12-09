const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addQuestionButton = document.getElementById('addQuestionButton');
const quizQuestionsDiv = document.getElementById('quizQuestions');
const submitQuizButton = document.getElementById('submitQuizButton');
const resultDiv = document.getElementById('result');

let quizQuestions = [];

// Add question to the quiz
function addQuestion() {
    const questionText = questionInput.value.trim();
    const answerText = answerInput.value.trim();

    if (questionText === '' || answerText === '') {
        alert('Please fill in both fields.');
        return;
    }

    quizQuestions.push({ question: questionText, answer: answerText });
    displayQuestions();
    questionInput.value = '';
    answerInput.value = '';
}

// Display the quiz questions
function displayQuestions() {
    quizQuestionsDiv.innerHTML = '';
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');

        const label = document.createElement('label');
        label.textContent = `Q${index + 1}: ${q.question}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Your answer here';

        questionDiv.appendChild(label);
        questionDiv.appendChild(input);
        quizQuestionsDiv.appendChild(questionDiv);
    });

    if (quizQuestions.length > 0) {
        submitQuizButton.disabled = false;
    }
}

// Evaluate the quiz
function evaluateQuiz() {
    const answers = quizQuestionsDiv.querySelectorAll('input');
    let score = 0;

    quizQuestions.forEach((q, index) => {
        if (answers[index].value.trim().toLowerCase() === q.answer.toLowerCase()) {
            score++;
        }
    });

    resultDiv.textContent = `Your score: ${score}/${quizQuestions.length}`;
}

// Event listeners
addQuestionButton.addEventListener('click', addQuestion);
submitQuizButton.addEventListener('click', evaluateQuiz);
