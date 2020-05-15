class Snaketail{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');
const scoreText = document.querySelector('#score');
const highScoreText = document.querySelector('#highScore');


document.addEventListener('keydown', changeDirection);

let snake;
/**
 *  1 = up, 2 = down, 3 = left, 4 = right
 */

let targetX = targetY = canvas.width/2;
let size = 10;
let score = highestScore = 0;
let direction = 1;

function createSnake(){
    snake = [];
    snake = [new Snaketail(canvas.width/4, canvas.width/4)]
    for(let i = 1; i < 5; i++){
        let s = new Snaketail(snake[i-1].x, snake[i-1].y-10);
        snake.push(s);
        console.log()
    }
}

createSnake();
draw();

let timer = setInterval(moveSnake, 100);

function draw(){
    pen.fillStyle = "beige";
    pen.fillRect(0, 0, canvas.width, canvas.width);

    pen.fillStyle = "red";
    pen.fillRect(targetX, targetY, size, size);

    for(let i = 0; i < snake.length; i++){
        pen.fillStyle = "green";
        pen.fillRect(snake[i].x, snake[i].y, size, size);
    }

    for(let i = 0; i < 600; i+=10){
        pen.fillStyle = "beige";
        pen.fillRect(0, i, canvas.width, 1);
    }
    for(let i = 0; i < 600; i+=10){
        pen.fillStyle = "beige";
        pen.fillRect(i, 0, 1, canvas.width);
    }

}

function moveSnake(){

    for(let i = snake.length - 1; i > 0; i--){
        snake[i].y = snake[i-1].y;
        snake[i].x = snake[i-1].x;
    }
    if(direction == 1){//move down
        snake[0].y = snake[0].y+10;
    } else if(direction == 2){//move up
        snake[0].y = snake[0].y-10;
    } else if(direction == 3){//move left
        snake[0].x = snake[0].x-10;
    } else if(direction == 4){//move right
        snake[0].x = snake[0].x+10;
    }

    draw();
    check();
    if(hitTailorEdge()){
        alert("GameOver");
        snake.splice(4, snake.length - 5);
        if(score > highestScore){ 
            highestScore = score;
            highScoreText.innerText = "Highest Score: " + highestScore;
        }
        score = 0;
        scoreText.innerText = "Score: " + score;
        direction = 1;
        createSnake();
    }

}

function changeDirection(e){
    if (e.code == "ArrowUp" && direction != "1") {
       direction = 2;
    } else if (e.code == "ArrowDown" && direction != "2"){
       direction = 1;
    } else if (e.code == "ArrowLeft" && direction != "4"){
       direction = 3;
    } else if (e.code == "ArrowRight" && direction != "3"){
       direction = 4;
    }
}

function check(){
    if(snake[0].x == targetX && snake[0].y == targetY){
        let s = new Snaketail(snake[snake.length-1].x, snake[snake.length-1].y);
        snake.push(s);
        targetX = Math.floor((Math.random() * canvas.width/10))* 10;
        targetY = Math.floor((Math.random() * canvas.width/10))* 10;
        score += 100;
        scoreText.innerText = "Score: " + score;
        console.log(targetX);
        console.log(targetY);
    }
}

function hitTailorEdge(){
    for(let index = 0; index < snake.length - 1; index++){
        for (let tails = 0; tails < snake.length - 1; tails++){
            if(index == tails){
            } else if(snake[index].x == snake[tails].x && snake[index].y == snake[tails].y){
                return true;
            }
        }
    }
    if(snake[0].x < 0 || snake[0].x > canvas.width || snake[0].y < 0 || snake[0].y > canvas.width){
        return true;
    }
}