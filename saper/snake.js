var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var head = {x: 0, y: 0};
var apple = {x: 150, y: 150};
var width = canvas.width;
var height = canvas.height;
var blockSide = 15;
var widthBlocks = Math.floor(width/blockSide);
var heightBlocks = Math.floor(height/blockSide);
var tail = [{x: 0, y: 0}];
var direction = "right";
var score = 0;
var walls = confirm("Включить стены?");
var frame = 150;

document.addEventListener("keydown", downHandler, false);

function Tail(x, y) {
	this.x = x;
	this.y = y;
}

function createApple() {
	x = Math.floor(Math.random()*(widthBlocks)) * blockSide;
	y = Math.floor(Math.random()*(heightBlocks)) * blockSide;
	/*for (i = 0; i < tail.length; i++) {
		if (x == tail[i].x && y == tail[i].y) {
			createApple();
			break;
		}
	}
	if (head.x == x && head.y == y) {
		createApple();
		break;
	*/
	apple.x = x;
	apple.y = y;
	score += 1;
}

function createNewTail(x, y) {
	tail[tail.length] = new Tail(x, y);
}

function move() {
	for (var i = tail.length-1; i >= 0; i--) {
		if (i>0) {
			tail[i].x = tail[i-1].x;
			tail[i].y = tail[i-1].y;
		} else {
			tail[i].x = head.x;
			tail[i].y = head.y;
		}
	}
}

function moveHead() {
	switch(direction){
		case "left":
			head.x -= blockSide;
			break;
		case "up":
			head.y -= blockSide;
			break;
		case "right":
			head.x += blockSide;
			break;
		case "down":
			head.y += blockSide;
			break;
		default:
	}
}

function eatApple() {
	if (head.x == apple.x && head.y == apple.y) {
		createApple();
		createNewTail(tail[tail.length-1].x, tail[tail.length-1].y)
		frame -= 2;
		clearInterval(intervalID);
		intervalID = setInterval(draw, frame);
	}
}

function checkCollision() {
	for(i = 0; i < tail.length; i++) {
		if (head.x == tail[i].x && head.y == tail[i].y) {
			alert("YOU LOSE!");
			location.reload();
		}
	}
	if (walls) {
		if (head.x < 0 || head.x >= width || head.y < -2 || head.y >= height) {
			alert("YOU LOSE!");
			location.reload();
		}
	} else {
		if (head.x < 0) {
			head.x = width - blockSide;
		} else if (head.x >= width) {
			head.x = 0;
		} else if (head.y < -2) {
			head.y = height - blockSide;
		} else if (head.y >= height) {
			head.y = 0;
		}
	}
}

function downHandler(e) {
	if (e.keyCode == 65 || e.keyCode == 37) {
		if (direction != 'right') {
			direction = "left";
		}
	} else if (e.keyCode == 87 || e.keyCode == 38) {
		if (direction != "down") {
			direction = "up";
		}
	} else if (e.keyCode == 68 || e.keyCode == 39) {
		if (direction != "left") {
			direction = "right";
		}
	} else if (e.keyCode == 83 || e.keyCode == 40) {
		if (direction != "up") {
			direction = "down";
		}
	}
}

function drawHead() {
	ctx.beginPath();
	ctx.rect(head.x, head.y, blockSide, blockSide);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}

function drawTail() {
	for (i = 0; i < tail.length; i++){
		ctx.beginPath();
		ctx.rect(tail[i].x, tail[i].y, blockSide, blockSide);
		ctx.fillStyle = "#0065DD";
		ctx.fill();
		ctx.closePath();
	}
}

function drawApple() {
	ctx.beginPath();
	ctx.rect(apple.x, apple.y, blockSide, blockSide);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + score, 5, 20);
}

function draw() {
	move();
	moveHead();
	ctx.clearRect(0, 0, width, height);
	drawHead();
	drawTail();
	drawApple();
	drawScore();
	eatApple();
	checkCollision();

}

var intervalID = setInterval(draw, frame);
