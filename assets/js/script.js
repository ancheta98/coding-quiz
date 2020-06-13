var body = document.getElementById('body');
var highScore = document.getElementById('high-score');
var content = document.getElementById('content');
var startBtn = document.getElementById('start');
var timer = document.getElementById('timer');

var counter = 60;
var score = loadScores( || []);
var queIndex = ;
var queArray = [
    {
        question   :'Commonly used data types do NOT include:',
        answers     : [ 'strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer : 2
    },
    {
        question   : 'Arrays in Javascript can be used to store _____',
        answers     : ['number ans strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer : 3
    },
    {
        questions  : 'the condition in an IF/ELSE is enclosed with _____',
        answers     : ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer : 2
    },
    {
        question    : 'String values must be enclosed within _____ when being assigned to variables',
        answers     : ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswer : 2
    },
    {
        questions   : 'A very useful tool used during development and debugging for printing content to the debugger:',
        answers     : ['Javascript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer : 3
    }
];

highScore.addEventListener('click', highScore);
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    timer();

    createQuestion(queArray[queIndex]);
}

function timer() {
    window.startCountdown = setInterval(function(){
        counter--;
        counter > 0 ? (timerDisplay.innerText = counter) : (timerDisplay.innerText = 0);
        if (counter === 0) {
            clearInterval(startCountdown);
            gameOverView();
        }
    }, 1000);
}

function createQuestion(queObj) {
    content.innerHTML = '';

    queIndex++;

    var containerEl = document.createElement('div');
    containerEl.className = 'question';
    containerEl.id = 'questions';

    var queEl = document.createElement('h2');
    queEl.textContent = queObj.question;
    containerEl.appendChild(queEl);

    var ansListEl = document.createElement('ul');
    ansListEl.className = 'answer';
    ansListEl.id = 'answer';

    var answers = questionsObj.answers;

    for (var i = 0; i < answers.length; i++) {
        var ansEl = document.createElement('li');
        ansEl.className = 'answer-item';
        ansEl.innerHTML = 
            <button class="btn answer-btn"></button>
    }
}