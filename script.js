let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

document.getElementById('error').style.display = 'none';

const answer =[0, 0, 0];
const displayNums =[0, 0, 0];
const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'];
const alignContents = ['normal', 'start', 'center', 'end', 'space-between', 'space-around'];
const justifyContents = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
const score = document.getElementById('score');
let correctRow = 0;
let scoreValue = 0;
let bestScore = 0;
score.innerHTML = scoreValue;

function updateScore() {
	if(scoreValue > bestScore) {
		bestScore = scoreValue;
		fetch('save_score.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application//x-www-form-urlencoded',
			},
			body: 'score=' + bestScore
		});
	}
}

window.onload = function() {
	fetch('get_best_score.php')
		.then(response => response.json())
		.then(data => {
			bestScore = data.bestScore;
			document.getElementById('bestScore').textContent = bestScore;
		});
}

const checkbox = document.querySelector('input[name=mode]');
const board = document.getElementById('board');
const boardVisibility = ['hidden', 'visible'];
const boardDisplay = ['block', 'flex'];
const boardWrap = ['nowrap', 'wrap'];
let status = 0;
checkbox.addEventListener('change', function() {
	if(this.checked) {
		status = 1;
		}else{
		status = 0;
		}
});

document.getElementById('startButton').addEventListener('click',function() {
	document.getElementById('start').classList.add('hidden');
	document.getElementById('play').classList.remove('hidden');
});

function generateSquares() {
	document.getElementById('nextButton').disabled = 'disabled';
	document.getElementById('result').innerHTML = '';
	for (let i = 1; i < 7; i++) {
		document.getElementById(`label${i}`).classList.add('label-disabled');
		if (i < 4) {
			document.getElementById(`button${i}`).disabled = 'disabled';
		}else{
			document.querySelectorAll(`button.button${i}`).forEach(button => {
				button.disabled = 'disabled';
			});
		}
	}
	document.getElementById('button7').disabled = 'disabled';
	const rowSquares =[];
	let sum = 0;
	for (let i = 0; i < 5; i++) {
		let num = Math.floor(Math.random() * 6);
		rowSquares.push(num);
		sum += num;
	}
	
	const sample = document.getElementById('sample');
	const board = document.getElementById('board');
	sample.innerHTML = '';
	board.innerHTML = '';
	board.style.display = 'block';
	board.style.flexWrap = 'nowrap';
	board.style.flexDirection = 'row';
	board.style.alignContent = 'normal';
	board.style.justifyContent = 'start';

	for (let i = 0; i < sum; i++) {
		const sampleSquare = document.createElement('div');
		sampleSquare.className = 'sampleSquare';
		sampleSquare.innerHTML = i + 1;
		sample.appendChild(sampleSquare);
		
		const square = document.createElement('div');
		square.className = 'square';
		square.innerHTML = i + 1;
		board.appendChild(square);
	}

	const displayStatus =[];
	let num = Math.floor(Math.random() * 4);
	displayNums.splice(0,1,num);
	if (sum <=5) {
		let num = Math.floor(Math.random() * 3) + 1;
		displayNums.splice(1,1,num);
	}else if (sum >= 21) {
		displayNums.splice(1,1,0);
	}else{
		let num = Math.floor(Math.random() * 6);
		displayNums.splice(1,1,num);
	}
	if (sum % 5 == 0) {
		displayNums.splice(2,1,0);
	}else if (sum % 5 == 1){
		let num = Math.floor(Math.random() * 3);
		displayNums.splice(2,1,0);
	}else{
		let num = Math.floor(Math.random() * 6);
		displayNums.splice(2,1,num);
	}

	sample.style.flexDirection = flexDirections[displayNums[0]];
	sample.style.alignContent = alignContents[displayNums[1]];
	sample.style.justifyContent = justifyContents[displayNums[2]];


	if (status == 1){
		const squares = document.getElementsByClassName('square');
		const squaresStatus = Array.from(squares).every(content => content.style.visibility === 'hidden');
		Array.from(squares).forEach(content => {
			content.style.visibility = squaresStatus ? 'hidden' : 'visible';
		});
		board.style.display = 'flex';
		board.style.flexWrap = 'wrap';

		document.getElementById('label4').classList.remove('label-disabled');
		document.querySelectorAll('button.button4').forEach(button => {
			button.disabled = false;
		document.getElementById('resetButton').disabled = false;
		});
	}else{
		document.getElementById('label1').classList.remove('label-disabled');
		document.getElementById('button1').disabled = false;
	}
}

function visible() {
	const squares = document.getElementsByClassName('square');
	const squaresStatus = Array.from(squares).every(content => content.style.visibility === 'hidden');
	Array.from(squares).forEach(content => {
		content.style.visibility = squaresStatus ? 'hidden' : 'visible';
	});

	document.getElementById('label2').classList.remove('label-disabled');
	document.getElementById('button2').disabled = false;
	document.getElementById('resetButton').disabled = false;
	document.getElementById('label1').classList.add('label-disabled');
	document.getElementById('button1').disabled = 'disabled';
}

function displayFlex() {
	document.getElementById('board').style.display = 'flex';
	document.getElementById('label3').classList.remove('label-disabled');
	document.getElementById('button3').disabled = false;
	document.getElementById('label2').classList.add('label-disabled');
	document.getElementById('button2').disabled = 'disabled';
}

function flexWrap() {
	document.getElementById('board').style.flexWrap = 'wrap';
	document.getElementById('label4').classList.remove('label-disabled');
	document.querySelectorAll('button.button4').forEach(button => {
		button.disabled = false;
	});
	document.getElementById('label3').classList.add('label-disabled');
	document.getElementById('button3').disabled = 'disabled';
}

function setFlexDirection(n) {
	document.getElementById('board').style.flexDirection = flexDirections[n];
	answer.splice(0,1,n);
	document.getElementById('label5').classList.remove('label-disabled');
	const button5 = document.querySelectorAll('button.button5');
	const sampleSquares = document.querySelectorAll('.sampleSquare').length;
	if (sampleSquares <= 5) {
		for(let i = 1; i < 4; i++) {
		button5[i].disabled = false;
		}
	}else if (sampleSquares >= 21) {
		button5[0].disabled = false;
	}else{
		button5.forEach(button => {
			button.disabled = false;
		});
	}
	document.getElementById('label4').classList.add('label-disabled');
	document.querySelectorAll('button.button4').forEach(button => {
		button.disabled = 'disabled';
	});
}
function setAlignContent(n) {
	document.getElementById('board').style.alignContent = alignContents[n];
	answer.splice(1,1,n);
	document.getElementById('label6').classList.remove('label-disabled');
	const button6 = document.querySelectorAll('button.button6');
	const sampleSquares = document.querySelectorAll('.sampleSquare').length;
	if (sampleSquares % 5 == 0) {
		button6[0].disabled = false;
	}else if (sampleSquares % 5 == 1){
		for(let i = 0; i < 3; i++) {
			button6[i].disabled = false;
		}
	}else{
		button6.forEach(button => {
			button.disabled = false;
		});
	}
	document.getElementById('label5').classList.add('label-disabled');
	document.querySelectorAll('button.button5').forEach(button => {
		button.disabled = 'disabled';
	});
}

function setJustifyContent(n) {
	document.getElementById('board').style.justifyContent = justifyContents[n];
	answer.splice(2,1,n);
document.getElementById('button7').disabled = false;
	document.getElementById('label6').classList.add('label-disabled');
	document.querySelectorAll('button.button6').forEach(button => {
		button.disabled = 'disabled';
	});
}

function reset() {
	correctRow = 0;
	scoreValue = 0;
	score.innerHTML = scoreValue;
	document.getElementById('result').innerHTML = '';
	for (let i = 1; i < 7; i++) {
		document.getElementById(`label${i}`).classList.add('label-disabled');
		if (i < 4) {
			document.getElementById(`button${i}`).disabled = 'disabled';
		}else{
			document.querySelectorAll(`button.button${i}`).forEach(button => {
				button.disabled = 'disabled';
			});
		}
	}
	document.getElementById('button7').disabled = 'disabled';

	board.style.display = boardDisplay[status];
	board.style.flexWrap = boardWrap[status];
	board.style.flexDirection = 'row';
	board.style.alignContent = 'normal';
	board.style.justifyContent = 'start';


	if (status == 1){
		const squares = document.getElementsByClassName('square');
		const squaresStatus = Array.from(squares).every(content => content.style.visibility === 'hidden');
		Array.from(squares).forEach(content => {
			content.style.visibility = squaresStatus ? 'hidden' : 'visible';
		});
		document.getElementById('label4').classList.remove('label-disabled');
		document.querySelectorAll('button.button4').forEach(button => {
			button.disabled = false;
		});
	}else{
		document.getElementById('label2').classList.remove('label-disabled');
		document.getElementById('button2').disabled = false;
	}
}

function check() {
	if (answer.length !== displayNums.length) {
		return false;
	}

	for (let i = 0; i < 3; i++) {
		if (answer[i] == displayNums[i]) {
			;
		}else{
			return false;
		}
	}
	return true;
}

function submit() {
	const resultArea = document.getElementById('result');
	const result = check();
	if(result == true) {
		resultArea.innerHTML = 'CORRECT!';
		resultArea.style.color = '#4bd865';
		let total = displayNums.reduce(function(a, b){
			return a + b;
		},0);
		const sampleSquares = document.querySelectorAll('.sampleSquare').length;
		let point = Math.ceil(100 * (1 + (correctRow / 10)) * (1 + (sampleSquares / 100)) * (1 + (total / 10)));
		scoreValue += point;
		correctRow++;
		score.innerHTML = scoreValue;
		
		document.getElementById('resetButton').disabled = 'disabled';
		document.getElementById('nextButton').disabled = false;
	}else if(result == false) {
		resultArea.innerHTML = 'WRONG!';
		resultArea.style.color = '#ff2222';

	}
	document.getElementById('button7').disabled = 'disabled';
}

