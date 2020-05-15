class Block{
    constructor(x, y, hits){
        this.x = x;
        this.y = y;
        this.hits = hits;
    }
}
/**
 *  Name: Blezyl S.
 *  version @ 3.4.30
 *  Breakout Game
 *  Created by an array of class Block. A Class block contains the x and y coordinates, 
 *  color, and the hits it takes to break the block. Once the block is broken by the 
 *  ball it is removed from the array. The ball has properties of the x and y coordinates 
 *  and the x and y rate of change(how fast it is moving). Every move of the ball will 
 *  call the collision functions to check if it collides with the block and/or the paddle. 
 *  The paddle is only able to move right or left and is moved by the press of the user.
 */
// cached values
const canvas = document.querySelector('canvas');
const pen = canvas.getContext('2d');
const scoreText = document.querySelector('#score');
// Paddle
let paddleX = canvas.width/2;
let paddleLength = 100;
// Ball
let ballY, ballX;
ballY = ballX = Math.floor(canvas.width/2);
let ballrateY = ballrateX = -10; 
let radius = 10;
// Variables
let score = 0;
let blocks = [];
let blockLength = 95, blockWidth = 20; 


// calls function movePaddle when left or right keys are called
document.addEventListener('keydown', movePaddle);
// calls function moveBall every 50mmseconds
let timer = setInterval(moveBall, 100);

start();

// Starts Game by setting up all the blocks
function start(){
    let y = 40;
    for(let hits = 3; hits > 0; hits--){
        settingUp(y, hits);
        y+=30;
        settingUp(y, hits);
        y+=30;
    }
    draw();
}

// Sets the x and y coordinates for each blocks then adds them into the array
function settingUp(y, hits){
    let b;
    for(let x = 5; x < 600; x+=100){
        b = new Block(x, y, hits);
        blocks.push(b);
    }
    //prints troubleshooting
    /* for(let i = 0; i < blocks.length; i++){
        console.log(blocks[i].x + " " +  blocks[i].y + " " + blocks[i].hits + " ") ;
    } */
}
// Draws the game
function draw(){
    // Draw background
    pen.fillStyle = "black";
    pen.fillRect(0,0,canvas.width, canvas.width);
    // Draw Blocks
    for(let i = 0; i < blocks.length; i++){
        pen.fillStyle = getColor(blocks[i]);
        pen.fillRect(blocks[i].x, blocks[i].y, blockLength, blockWidth);
    }
    // Draw paddle
    pen.fillStyle = "white";
    pen.fillRect(paddleX,585,paddleLength, 5);
    // Draw Ball
    pen.beginPath();
    pen.arc(ballX,ballY, radius, 0 , 2 * Math.PI);
    pen.fill();
    pen.stroke();
}

// moves the paddle left or right by identifying which button is pressed
function movePaddle(e) {
    if (e.code == "ArrowLeft"){
        paddleX -=25;
    } else if (e.code == "ArrowRight"){
        paddleX +=25;
    } 
    draw();
}

/**
 *   Moves ball by the given rate. If it hits a wall it will go the opposite direction.
 *   Then checks if the ball is in collsion with the paddle and block.
 *   If it is in collision with a block it will add the score, lessen the block hit, checks if 
 *   the number of hits is 0. If hits is 0 it removes the block from the array.
 */

function moveBall(){
    if(ballX <= 10 || ballX >= canvas.width-10){
        ballrateX  = -1 * ballrateX;
    } else if (ballY < 10){
        ballrateY  = -1 * ballrateY;
    } else if (ballY > canvas.width){
        alert("GameOver!");
        clearInterval(timer);
    }
    ballX += ballrateX;
    ballY += ballrateY;
    collisionPaddle();

    for(let i = 0; i < blocks.length; i++){
        if(collisionBlock(blocks[i])){
            score+=50;
            scoreText.innerText = "Score: " + score;
            blocks[i].hits--;
            ballrateY  = -1 * ballrateY;
            if(!blocks[i].hits){
                let r = blocks.splice(i,1);
            }
            console.log(ballX + " " + ballY);
            console.log(blocks[i].x + " " + blocks[i].y);
        }
    }
    draw();
}
// Checks if the ball and paddle are in collision
function collisionPaddle(){
    console.log("B: " + ballX + " - " + (ballX + 10)+ " " + ballY + " ");
    console.log("P: " + paddleX + " - " + (paddleX + paddleLength) + " 585 - 590");
    if (((ballX <= paddleX + paddleLength && ballX >= paddleX) && (ballY+10 >= 580)&& (ballY+10 <= 600)) ||
        ((ballX + radius <= paddleX + paddleLength && ballX + radius >= paddleX) && (ballY+10 >= 580) && (ballY+10 <= 600) )){

            ballrateY  = -1 * ballrateY;
   }
}
/**
 * Checks if the ball and block are in collision
 * @param {Object} block 
 */
function collisionBlock(block){
    if( ((ballX <= block.x + blockLength && ballX >= block.x )&&(ballY <= block.y + blockWidth + 10 && ballY >= block.y))||
        ((ballX <= block.x + blockLength && ballX >= block.x )&&(ballY +radius <= block.y + blockWidth + 10 && ballY +radius>= block.y)) ||
        ((ballX + radius <= block.x + blockLength && ballX + radius >= block.x)&&(ballY <= block.y + blockWidth + 10 && ballY >= block.y)) ||
        ((ballX + radius <= block.x + blockLength && ballX + radius >= block.x)&&(ballY + radius <= block.y + blockWidth + 10 && ballY + radius>= block.y))
      ){
        return true;
    }
    return false;
}
/**
 * Returns the color of the block depending on the number of hits left.
 * @param {Object} block 
 */
function getColor(block){
    let color;
    switch(block.hits){
        case 3: color = "red"; break;
        case 2: color = "yellow"; break;
        case 1: color = "green"; break;
    } return color;
}