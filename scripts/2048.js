class cell{
    constructor(x, y, value){
        this.x = x;
        this.y = y;
        this.value = value;
    }
    getColor(){
        switch(this.value){
            case 2:
                this.color = "#ffe6f2";
                break;
            case 4: 
                this.color = '#ffcce6';
                break;
            case 8:
                this.color = "#ffb3d9";
                break;
            case 16: 
                this.color = '#ff99cc';
                break;
            case 32:
                this.color = "#ff80bf";
                break;
            case 64: 
                this.color = '#ff66b3';
                break;
            case 128:
                this.color = "#ff4da6";
                break;
            case 256: 
                this.color = '#ff3399';
                break;
            case 512:
                this.color = "#ff1a8c";
                break;
            case 1024: 
                this.color = '#e60073';
                break;
            case 2048:
                this.color = "#cc0066";
                break;
            case 4096: 
                this.color = '#b30059';
                break;     
        }
        return this.color;
    }
}


const boxes = document.querySelectorAll('.grid-item');

document.addEventListener('keydown', move);
const scoreText = document.querySelector("#score");
const highText = document.querySelector("#highest");

let game = [];
let score = 0;
let high = 0;
let freeSpaces = 16;


for(let i = 0; i < 4; i++){
    game[i] = [];
    for(let j = 0; j < 4; j++){
        let box = new cell(i, j, 0);
        game[i][j] = box;
    }   
}





start();
function print(){
    for(let i = 0; i < 4; i++){
        console.log(game[i][0].value + " " + game[i][1].value + " " + game[i][2].value + " " + game[i][3].value);
    }
}

function start(){
    console.log(game.length);
    print(); 
    newCell();
    newCell();
}

function newCell(){
    if(freeSpaces){
        let x = 0;
        let y = 0;
        do{
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
            console.log('This is inside do while');
            console.log(x + " " + y)
            console.log(game[x][y].value);
        }while(game[x][y].value != 0);
        console.log('Outisde of do while');
        let number = Math.floor(Math.random()*2);
        if (number == 0) number = 2;
        else number = 4;
        console.log(number);
        game[x][y].value = number;
        print();
        printGameBoard();
        freeSpaces--;
    } else {
        let Ngameover = pairs();
        if(!Ngameover){
            alert("gameover");
        }
    }
}

function pairs(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j< 3; j++){
            if (game[i][j].value == game[i][j+1].value ){
                return true;
            }
        }
    }

    for(let j = 0; j < 4; j++){
        for(let i = 0; i< 3; i++){
            if (game[i][j].value == game[i+1][j].value ){
                return true;
            }
        }
    }
    return false;
}

function printGameBoard(){
    let counter = 0;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(game[i][j].value){
                boxes[counter].innerText = game[i][j].value;
                boxes[counter].style.backgroundColor = game[i][j].getColor();
            } else{
                boxes[counter].innerText = "";
                boxes[counter].style.backgroundColor = "white";
            }
            counter++;
        }   
    }
}

function move(e){
    if (e.code == "ArrowUp") {
        moveUp();
    } else if (e.code == "ArrowDown"){
        moveDown();
    } else if (e.code == "ArrowLeft"){
        moveLeft();
    } else if (e.code == "ArrowRight"){
        moveRight();
    }
}

function moveLeft(){//i is x j is y 
    for(let i = 0; i < 4; i++){
        for(let j = 1; j < 4; j++ ){
            if(game[i][j].value){
                let coll = j;
                while(coll > 0 ){
                    if(game[i][coll-1].value == 0){
                        game[i][coll-1].value = game[i][coll].value;
                        game[i][coll].value = 0;
                    } else if (game[i][coll].value == game[i][coll-1].value){
                        score += game[i][coll-1].value; 
                        scoreText.innerText = "Score: " + score;
                        game[i][coll-1].value += game[i][coll-1].value;
                        game[i][coll].value = 0; 
                        if(game[i][coll-1].value > high){
                            high = game[i][coll-1].value;
                            highText.innerText = "Highest Cell: " + high;
                            
                        } 
                        freeSpaces++;
                        break;
                    }else{break;}
                    coll--;
                }
            }
        }

    }
    newCell();
}

function moveRight(){//i is x j is y 
    for(let i = 0; i < 4; i++){
        for(let j = 2; j >= 0; j-- ){
            if(game[i][j].value){
                let coll = j;
                while(coll < 3 ){
                    if(game[i][coll+1].value == 0){
                        game[i][coll+1].value = game[i][coll].value;
                        game[i][coll].value = 0;
                    } else if (game[i][coll].value == game[i][coll+1].value){
                        score += game[i][coll+1].value; 
                        scoreText.innerText = "Score: " + score;
                        game[i][coll+1].value += game[i][coll+1].value;
                        game[i][coll].value = 0; 
                        if(game[i][coll+1].value > high){
                            high = game[i][coll+1].value;
                            highText.innerText = "Highest Cell: " + high;
                        } 
                        freeSpaces++;

                        break;
                    }else{break;}
                    coll++;
                }
            }
        }

    }
    newCell();
}

function moveDown(){//i is x j is y 
    for(let j = 0; j < 4; j++){
        for(let i = 2; i >= 0; i-- ){
            if(game[i][j].value){
                let row = i;
                while(row < 3 ){
                    if(game[row+1][j].value == 0){
                        game[row+1][j].value = game[row][j].value;
                        game[row][j].value = 0;
                    } else if (game[row][j].value == game[row+1][j].value){
                        score += game[row + 1][j].value; 
                        scoreText.innerText = "Score: " + score;
                        game[row+1][j].value += game[row+1][j].value;
                        game[row][j].value = 0; 
                        if(game[row + 1][j].value > high){
                            high = game[row + 1][j].value;
                            highText.innerText = "Highest Cell: " + high;
                        } 
                        freeSpaces++;

                        break;

                    }else{break;}
                    row++;
                }
            }
        }
    }
    newCell();
}

function moveUp(){//i is x j is y 
    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 4; i++ ){
            if(game[i][j].value){
                let row = i;
                while(row > 0 ){
                    if(game[row-1][j].value == 0){
                        game[row-1][j].value = game[row][j].value;
                        game[row][j].value = 0;
                    } else if (game[row][j].value == game[row-1][j].value){
                        score += game[row - 1][j].value; 
                        scoreText.innerText = "Score: " + score;
                        game[row-1][j].value += game[row-1][j].value;
                        game[row][j].value = 0; 
                        if(game[row - 1][j].value > high){
                            high = game[row - 1][j].value;
                            highText.innerText = "Highest Cell: " + high;
                        } 
                        freeSpaces++;

                        break;
                    } else{break;}
                    row--;
                }
            }
        }
    }
    newCell();
}