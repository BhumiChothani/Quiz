const start_btn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exit_btn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continue_btn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizbox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgain_btn = document.querySelector(".tryagain-btn");
const gotoHome_btn = document.querySelector(".goHome-btn");


start_btn.onclick = () =>{
    popupInfo.classList.add("active");
    main.classList.add("active");
}

exit_btn.onclick = () =>{
    popupInfo.classList.remove("active");
    main.classList.remove("active");
}

continue_btn.onclick = () =>{
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizbox.classList.add("active");

    showQuestions(0);
}

gotoHome_btn.onclick = () =>{
    main.classList.remove("active");
    quizSection.classList.remove("active");
    resultBox.classList.remove("active");
    next_btn.classList.remove("active");

    questionCount = 0;
    score = 0;
    header_score.textContent = `score: ${score}/${questions.length}`;
    showQuestions(0);
    
}

tryAgain_btn.onclick = () =>{
    quizbox.classList.add("active");
    resultBox.classList.remove("active");
    next_btn.classList.remove("active");

    questionCount = 0;
    score = 0;
    header_score.textContent = `score: ${score}/${questions.length}`;
    showQuestions(0);
}

let questionCount = 0;
let score = 0;
let next_btn = document.querySelector(".next-btn");

next_btn.onclick = () => {
    if(questionCount < questions.length-1){
       questionCount++;
       showQuestions(questionCount);
    }
    else{
        showResultbox();
    }

    next_btn.classList.remove("active");
    
}

//getting questions and options from array
const questionText = document.querySelector(".question-text");
const optionList = document.querySelector(".option-list");
const question_total =document.querySelector(".question-total");
const header_score = document.querySelector(".header-score");

function showQuestions(index){
    
    questionText.textContent = `${questions[index].number}. ${questions[index].question}`;

    let optionTag = "";
    for(let i=0; i<questions[index].options.length; i++){
     optionTag += `<div class="option"><span>${questions[index].options[i]}</span></div>`;
    }
    optionList.innerHTML = optionTag;

    question_total.textContent = `${questions[index].number} of ${questions.length} questions`;

    const option = document.querySelectorAll(".option");
    for(let j=0; j<option.length; j++){
        option[j].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer){
    let useranswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(useranswer == correctAnswer){
        answer.classList.add("correct");
        score++;
        header_score.textContent = `score: ${score}/${questions.length}`;   //score +1 thse
    }
    else{
        answer.classList.add("incorrect");

        //if user select wrong answer, then autoselect correct answer
        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].classList.add("correct");
            }
        }

    }
    //if user has selected once , disabled all options
    for(let i=0; i<allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }
  
    next_btn.classList.add("active");
}


function showResultbox(){
    resultBox.classList.add("active");
    quizbox.classList.remove("active");

    document.querySelector(".score-text").textContent = `your score ${score} out
     of ${questions.length}`;
    
    const circularProgress = document.querySelector(".circular-progress");
    const progress_value = document.querySelector(".progress-value");
    let progressStartValue = 0;
    let progressEndValue = (score / questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() =>{

        progressStartValue++;
        progress_value.textContent = `${progressStartValue}%`;

        circularProgress.style.background = 
        `conic-gradient(var(--main-color) ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    },speed);




}