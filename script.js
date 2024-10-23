const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next-question");

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();

    if (questions.length == currentQuestionIndex) {
        return finishGame();
    }

    $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        $answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
    const answerClick = event.target;

    if (answerClick.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++;
    } else {
        document.body.classList.add("incorrect");
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }

        button.disabled = true;
    });

    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame() {
    const totalQuestion = questions.length;
    const performance = Math.floor(totalCorrect * 100 / totalQuestion);

    let message = "";

    switch (true) {
        case (performance > 90):
            message = "Excelente :)";
            break;
        case (performance > 70):
            message = "Muito bom :)";
            break;
        case (performance > 50):
            message = "Bom";
            break;
        default:
            message = "Pode melhorar :(";
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!
            <span>Resultado: ${message}</span>
        </p>
        <button onclick="window.location.reload()" class="button">
            Refazer teste
        </button>
    `;
}

const questions = [
    {
        question: "Qual a capital do Japão?",
        answers: [
            { text: "Kyoto", correct: false },
            { text: "Saitama", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Osaka", correct: false }
        ]
    },
    {
        question: "Qual foi o time campeão da Champions League 2023/2024?",
        answers: [
            { text: "Manchester City", correct: false },
            { text: "Real Madrid", correct: true },
            { text: "Liverpool", correct: false },
            { text: "Barcelona", correct: false }
        ]
    },
    {
        question: "Qual é o maior país do mundo em área territorial?",
        answers: [
            { text: "China", correct: false },
            { text: "Estados Unidos", correct: false },
            { text: "Rússia", correct: true },
            { text: "Brasil", correct: false }
        ]
    },
    {
        question: "Em qual série de TV podemos encontrar o personagem Walter White?",
        answers: [
            { text: "The Walking Dead", correct: false },
            { text: "Breaking Bad", correct: true },
            { text: "Game of Thrones", correct: false },
            { text: "Stranger Things", correct: false }
        ]
    }
];
