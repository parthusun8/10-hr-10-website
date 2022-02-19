const questions = [
    
];

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');


const c_opt = document.getElementById('option-c');
const d_opt = document.getElementById('option-d');

const submitBtn = document.getElementById('button');

let currentQuestion = 0;
let score = 0;


function loadQuiz() {

    deselectAnswers();

    const currentQuizData = questions[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;

    console.log(currentQuizData.c, currentQuizData.d);
    if(currentQuizData.c != null){
        c_text.innerText = currentQuizData.c;
    } else{
        c_opt.innerHTML = '';
    }

    if(currentQuizData.d != null) {
        d_text.innerText = currentQuizData.d;
    } else{
        d_opt.innerHTML = '';
    }

}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}


submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === questions[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        console.log(currentQuestion);
        if (currentQuestion < questions.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${questions.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

const url = "https://quizapi.io/api/v1/questions";
const API_KEY = "uNSTvtWrAtH6N8YiDLwotnt5rT2kwGN0Zm3umrCb";
fetchQuestions();
async function fetchQuestions() {
    const resp = await fetch(`${url}?apiKey=${API_KEY}&category=${"code"}&difficulty${"easy"}&limit=10`);
    const respData = await resp.json();

    // console.log(respData);
    respData.forEach((response) => {
        // console.log(response);
        questions.push({
            question: response.question,
            a: response.answers.answer_a,
            b: response.answers.answer_b,
            c: response.answers.answer_c,
            d: response.answers.answer_d,
            correct: (response.correct_answer === "answer_a" ? "a" : (response.correct_answer === "answer_b" ? "b" : (response.correct_answer === "answer_c" ? "c" : "d"))),
        });
    });

    loadQuiz();
}