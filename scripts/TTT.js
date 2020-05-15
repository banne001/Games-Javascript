const boxes = document.querySelectorAll(".grid-item");
const winResult = document.querySelector('#win');
const losesResult = document.querySelector('#loses');
for(let box of boxes){
    box.addEventListener('mouseover', border);
    box.addEventListener('mouseout', noborder);
    box.addEventListener('click', player);   
}

let win = false;

let lose = false;
let loses = 0;
let wins = 0;
let game = [1,2,3,4,5,6,7,8,9];
let plays = 0;

function border(e){
    e.target.className = "grid-item border";
}

function noborder(e){
    e.target.className = "grid-item";
}

function player(e){
    console.log(e.target.innerText);
    let x = parseInt(e.target.innerText);
    if(e.target.innerText == 'X' || e.target.innerText == 'O'){
        alert("Already Filled");
    }
    else{
        e.target.innerText = 'X';
        game[x-1]  = 'X';
        check();
        opp();
        plays++;
    }
}
function opp(){
    console.log("insode opp");
    let choice;
    do{
        choice = Math.floor(Math.random()*9 + 1);
    }while (!game.includes(choice))
    if (game.includes(choice)){
        game[choice - 1] = 'O';
        boxes[choice-1].innerText = 'O';
    } 
    plays++;
    check();

}

function check(){
    
    console.log(game[0] + ", " + game[1] + ", " + game[2])
    console.log(game[3] + ", " + game[4] + ", " + game[5])
    console.log(game[6] + ", " + game[7] + ", " + game[8])
    
    if(game[0] == 'X' && game[1] == 'X' && game[2] == 'X'){
        win = true; 
    } else if((game[3] == 'X' && game[4] == 'X' && game[5] == 'X') ||
              (game[6] == 'X' && game[7] == 'X' && game[8] == 'X') ||
              (game[2] == 'X' && game[4] == 'X' && game[6] == 'X') ||
              (game[0] == 'X' && game[4] == 'X' && game[8] == 'X') ||
              (game[0] == 'X' && game[3] == 'X' && game[6] == 'X') ||
              (game[1] == 'X' && game[4] == 'X' && game[7] == 'X') ||
              (game[2] == 'X' && game[5] == 'X' && game[8] == 'X'))
    {
        win = true; 
    } 
    if(
              (game[0] == 'O' && game[1] == 'O' && game[2]  == 'O') ||
              (game[3] == 'O' && game[4] == 'O' && game[5]  == 'O') ||
              (game[6] == 'O' && game[7] == 'O' && game[8]  == 'O') ||
              (game[2] == 'O' && game[4] == 'O' && game[6]  == 'O') ||
              (game[0] == 'O' && game[4] == 'O' && game[8]  == 'O') ||
              (game[0] == 'O' && game[3] == 'O' && game[6]  == 'O') ||
              (game[1] == 'O' && game[4] == 'O' && game[7]  == 'O') ||
              (game[2] == 'O' && game[5] == 'O' && game[8]  == 'O')  
            )
    {
        lose = true; 
    } else if(plays == 9){
        alert("tie");
        reset();
    }
    if (win){
        alert("You Won");
        reset();
        wins ++; 
        winResult.textContent = "Wins: " + wins;
    }
    if(lose){
        alert("You Lost");
        reset();
        loses ++;
        losesResult.textContent = "Loses: " + loses;
    }
}

function reset(){
    console.log('reset');
    win = false;
    lose = false;
    plays = 0;
    for(let i = 0; i < 9; i++){
        game[i] = i+1;
        boxes[i].textContent = i + 1;
    }
}