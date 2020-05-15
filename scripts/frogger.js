// cache and pens
const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
// elements from the html
const frogImg = document.getElementById("frog");
const carImg = document.getElementById("car");
const images4 = document.getElementById('carFastest').getElementsByTagName('img'); 
const images3 = document.getElementById('carFast').getElementsByTagName('img'); 
const images2 = document.getElementById('carMedium').getElementsByTagName('img'); 
const images1 = document.getElementById('carSlow').getElementsByTagName('img'); 
const leveltext = document.querySelector('#level');
const lifetext = document.querySelector('#fail');
const again = document.querySelector("#again");

// variables
let frogX = 300;
let frogY = 550;
let cars = [];
let loser = false;
let lives = 3;
let level = 1;
let moving = setInterval(moveCar, 100);

document.querySelector("#btn").onclick = playagain;
document.addEventListener("keydown",moveFrog);

creatingCars(150, images4, 4);
creatingCars(250, images3,3);
creatingCars(350, images2,2);
creatingCars(450, images1,1);

/**
 * Creates a car Object for each image in the img tag and put it 
 * in the array of cars.
 */
function creatingCars(yLocation, images, car){
    let xLocationL = 25;    // where the cars will start if coming from the right side
    let xLocationR = 475;   // left side
    let skipL=1;            // To create a variation of cars connected together in left
    let skipR=1;            // right           
    let side = true;        // boolean to determine which side the car will go towards
    for(let image of images){
        let ca;             // Initializes car Object
        if(side){
            // declares the car Object
            ca = new Car(image, xLocationL,yLocation,side); 
            xLocationL+=25; // location for the car
            skipL++;        
            if(skipL==car+1){ // creates variation of spaces for the cars
                xLocationL+=75;
                skipL = 0;
            }
            side = false;
        }
        // same code as above, but for the side going to the left
        else{
            ca = new Car(image, xLocationR,(yLocation+25),side);
            xLocationR-=25;
            skipR++;
            if(skipR==car+1){
                xLocationR-=75;
                skipR = 0;
            }
            side = true;
        }
        cars.push(ca);
    }
}
/**
 * Draw the Background by calling the function drawBackground. 
 * Draws the frog and all the cars
 */
function draw()
{   
    
    drawBackground();

    // draw the frog image 
    // Pass 5 parameters
    // pen.drawImage(image,x,y,width,height)
    pen.drawImage(frogImg,frogX,frogY,20,20);
    // draw cars
    let size = cars.length;
    for(let i =0;i<size;i++){pen.drawImage(cars[i].carImage, cars[i].x,cars[i].y,25,20);}
}
/**
 * Draws the grass and calls the drawstreet function
 */
function drawBackground(){
    //grass
    pen.fillStyle = "#008000";
    pen.fillRect(0, 0, 600, 600);
    //streets
    drawStreet(448);
    drawStreet(348);
    drawStreet(248);
    drawStreet(148);
    // Finish Line
    pen.fillStyle = "#FFFFFF";
    pen.fillRect(0, 100, 600, 5);
    pen.fillStyle = "#FFFFFF";
    pen.font = "50px monospace";
    pen.textAlign = "center";
    pen.fillText("Finish Line", 310, 80);
}
/**
 * draws the street as a black block that spans across the 
 * canvas and white lines to create as a 2 way street
 * @param {number} y - the y coordinates of the street
 */
// call the draw function
function drawStreet(y){
    //driveway
    pen.fillStyle = "#000000";
    pen.fillRect(0, y, 600, 50);
    //white lines
    pen.fillStyle = "#FFFFFF";
    for(let x = 20; x < 600; x+=100){
        pen.fillRect(x, y+25, 30, 1);
    }
}
/**
 * moves the car by 25 pixels.
 * calls the check function. if returned true it will restart the game
 * and place the frog at the beginning
 */
function moveCar(){
    let size = cars.length;
    for(let i =0;i<size;i++){cars[i].update();}
    draw();
    for(let i =0;i<size;i++){
        loser = check(cars[i]);
        if(loser){
            //alert("You lose");
            frogX = 300;
            frogY = 550;
            lives--;
            leveltext.textContent = "Level: " + level; 
            lifetext.textContent = "Lives: " + lives;
            loser = false;
            if (level == 1) level = 1;
            else level--;
            if(lives == 0){ 
                canvas.className = "noshow";
                document.querySelector("button").className = "";                
            }
        }
    }
}
/**
 * Moves the frog in the direction of the corresponding arrow
 * @param {Object} e  
 */
function moveFrog(e)
{
   console.log(e); // take a look at all the KeyEvent info
   if (e.code == "ArrowUp") {
       frogY -= 25;
   } else if (e.code == "ArrowDown"){
       frogY +=25;
   } else if (e.code == "ArrowLeft"){
       frogX -=25;
   } else if (e.code == "ArrowRight"){
        frogX +=25;
   }
   if(frogY <= 75){
        level++;
        leveltext.textContent = "Level: " + level;
        frogY = 550;
   }
   console.log(frogY);
   draw();
 }
/**
 * Checks which side the car is on, then determines if the car
 * and frog are right on top of each other. 
 * Only returns true if the car and frog are on top of each other
 * @param {Object} car - Object car will be used to get the position and side 
 *                of the car 
 */
function check(car){
    if (car.goingLeft){
        // if used (frogX == car.x) && (frogY == car.y)
        // then it will return true when the car and frog are just
        // next to each other
        return (((frogX-25 == car.x) && (frogY == car.y)));
    } else{
        return (((frogX+25 == car.x) && (frogY == car.y)));
    }
}
function playagain(){
    console.log("click");
    canvas.className = "";
    frogX = 300;
    frogY = 550;
    level = 1;
    lives = 3;
    console.log(lives);
    leveltext.textContent = "Level: " + level; 
    lifetext.textContent = "Lives: " + lives;
    document.querySelector('button').className = "noshow";
}