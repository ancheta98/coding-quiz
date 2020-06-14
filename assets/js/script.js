var body = document.getElementById('body');
var highScore = document.getElementById('high-score');
var content = document.getElementById('content');
var startBtn = document.getElementById('start');
var timerDisplay = document.getElementById('timer');

var counter = 60;
var scoreArray = loadScores() || [];
var queIndex = 0;
var queArray = [
    {
        question   :'Commonly used data types do NOT include:',
        answers    : [ 'strings', 'booleans', 'alerts', 'numbers'],
        correctAnswers :3
    },
    {
        question   : 'Arrays in Javascript can be used to store _____',
        answers     : ['number and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswers :4
    },
    {
        question  : 'the condition in an IF/ELSE is enclosed with _____',
        answers     : ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswers :2
    },
    {
        question   : 'String values must be enclosed within _____ when being assigned to variables',
        answers     : ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        correctAnswers :3
    },
    {
        question   : 'A very useful tool used during development and debugging for printing content to the debugger:',
        answers     : ['Javascript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswers :4
    }
];

highScore.addEventListener('click', highScores);
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
	timer();

	createQuestion(queArray[queIndex]);
}

function timer() {
	window.startCountdown = setInterval(function() {
		counter--;
		// check if above zero since wrong answer can pull it below despite conditional check for clearInterval
		counter > 0 ? (timerDisplay.innerText = counter) : (timerDisplay.innerText = 0);
		// stop timer at 0
		if (counter === 0) {
			clearInterval(startCountdown);
			gameOverView();
		}
	}, 1000);
}


// FUNCTION TO CREATE SINGLE QUE VIEW
function createQuestion(queObj) {
	// clear page
	content.innerHTML = '';

	// iterate index for call to next que
	queIndex++;

	// create que page containerEl
	var containerEl = document.createElement('div');
	containerEl.className = 'question';
	containerEl.id = 'question';

	// create que
	var queEl = document.createElement('h2');
	queEl.textContent = queObj.question;
	// append que
	containerEl.appendChild(queEl);
	// create answer-list
	var ansListEl = document.createElement('ul');
	ansListEl.className = 'answer-list';
	ansListEl.id = 'answer-list';

	// create array of answers
	var answers = queObj.answers;
	// generate li for each answer in array
	for (var i = 0; i < answers.length; i++) {
		var ansEl = document.createElement('li');
		ansEl.className = 'answer-item';
		// add button
		ansEl.innerHTML =
			// '<button class="btn answer-btn">' + (i + 1) + '. ' + answers[i] + '</button>';
			`<button class="btn answer-btn"></button>`;
		// set data-attr flag on correct answer
		if (i === queObj.correctAnswers) {
			ansEl.setAttribute('data-correct-answer', 'true');
			
		}
		// append answer to ul
		ansListEl.appendChild(ansEl);
	}

	containerEl.appendChild(ansListEl);
  content.appendChild(containerEl);
  
  // listen for user click on answer
	ansListEl.addEventListener('click', checkAns);
}

// CHECK ANSWER, DISPLAY FEEDBACK MSG, TIMED CALL TO NEXT QUE FUNCTION
function checkAns(event) {
	// find parent li of clicked button
	var clicked = event.target.closest('li.answer-item');
	var answerList = document.getElementById('answer-list');
	

	// check if clicked is truthy otherwise, ul was clicked and we don't want function to proceed or we will get an error because ul has no parent li.answer-list-item so .hasAttribute would be called on null
	if (clicked) {
		var isCorrect = clicked.hasAttribute('data-correct-answer');
		if (isCorrect) {
			var correctMsgEl = document.createElement('p');
            answerList.appendChild(correctMsgEl);
            correctMsgEl.className = 'feedback';
			correctMsgEl.innerText = 'Correct!';
			
		} else {
			// display 'wrong' message
			counter = counter - 10;
			var wrongMsgEl = document.createElement('p');
            answerList.appendChild(wrongMsgEl);
            wrongMsgEl.className = 'feedback';
			wrongMsgEl.innerText = 'Wrong!';
			
		}
		answerList.removeEventListener('click', checkAns);

		// remove feedback msg after 1 second and proceed to next que or game over
		setTimeout(function() {
			if (counter <= 0 || queIndex >= queArray.length) {
				gameOverView();
			} else {
				createQuestion(queArray[queIndex]);
			}
		}, 1000);
	}
}

// FUNCTION TO CREATE GAME-OVER VIEW
function gameOverView() {
	// stop timer
	clearInterval(window.startCountdown);

	content.innerHTML = '';

	var gameOver = document.createElement('div');
	gameOver.className = 'game-over';
	gameOver.id = 'game-over';

	var gameOverMessage = document.createElement('h2');
	gameOverMessage.innerText = 'All done!';
	gameOver.appendChild(gameOverMessage);

	var scoreMsg = document.createElement('h3');
	scoreMsg.innerText = 'Your final score is ';

	var scoreEl = document.createElement('span');
	scoreEl.id = 'score';

	if (counter >= 0) {
		scoreEl.innerText = counter + '.';
	} else {
		scoreEl.innerText = 0 + '.';
	}

	scoreMsg.appendChild(scoreEl);
	gameOver.appendChild(scoreMsg);

	var playerForm = document.createElement('form');
	playerForm.innerHTML =
		"<label for='initials'>Enter initials:</label>" +
		"<input type='text' id='initials' name='initials' maxlength=2>" +
		"<button class='btn btn-short' type='submit'>Submit</button>";

	// add listener for input submit which calls function to add player object with player and score to high scoreArr
	playerForm.addEventListener('submit', handleFormSubmit);

	gameOver.appendChild(playerForm);
	content.appendChild(gameOver);
}

function handleFormSubmit(event) {
	event.preventDefault();
	// get and save player stats
	var playerInitials = document
		.querySelector("input[name='initials']")
		.value.toUpperCase();
	var playerScore = counter > 0 ? counter : 0;
	var statsObj = {
		player : playerInitials,
		score  : playerScore
	};
	scoreArray.push(statsObj);
	saveScores();

	// display high scores
	highScores();
}

// FUNCTION TO DISPLAY HIGH SCORES PAGE
function highScores() {
	body.innerHTML = '';

	var scoresContainer = document.createElement('div');
	// highScoresContainerEl.classList = 'containerEl high-scores';
	scoresContainer.classList = 'container high-scores';
	scoresContainer.id = 'high-scores';
	var header = document.createElement('h2');
	header.innerText = 'High Scores';
	scoresContainer.appendChild(header);
	var scoresList = document.createElement('ul');
	for (var i = 0; i < scoreArray.length; i++) {
		var playerStats = document.createElement('li');
		playerStats.innerText =
			i + 1 + '. ' + scoreArray[i].player + ' - ' + scoreArray[i].score;
		scoresList.appendChild(playerStats);
	}
	scoresContainer.appendChild(scoresList);
	var actionContainer = document.createElement('div');
	actionContainer.className = 'action';
	var backBtn = document.createElement('a');
	backBtn.id = 'back';
	backBtn.setAttribute('href', './index.html');
	backBtn.classList = 'btn btn-short';
	backBtn.innerText = 'Go Back';
	actionContainer.appendChild(backBtn);
	var clear = document.createElement('button');
	clear.classList = 'btn btn-short';
	clear.innerText = 'Clear high scores';
	clear.addEventListener('click', handleClear);
	actionContainer.appendChild(clear);

	scoresContainer.appendChild(actionContainer);
	body.appendChild(scoresContainer);
}

// clear high scores
function handleClear() {
	scoreArray = [];
	saveScores();
	highScores();
}

function saveScores() {
	// sort high scores highest to lowest
	scoreArray.sort((a, b) => b.score - a.score);
	localStorage.setItem('stats', JSON.stringify(scoreArray));
}

// load high scores from localStorage
function loadScores() {
	var stats = localStorage.getItem('stats');
	if (!stats) {
		return false;
	}
	return (stats = JSON.parse(stats));
}