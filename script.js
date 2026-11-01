const board = document.querySelector('.board');
const startbutton = document.querySelector(".btn-start")
const modal = document.querySelector(".modal")
const startgamemodal = document.querySelector(".start-game")
const gameovermodal = document.querySelector(".game-over")
const restartbutton = document.querySelector(".btn-restart")

const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")


const blockHeight = 30;
const blockWidth = 30;

let highScore = localStorage.getItem("highScore") || 0
let score = 0
let time = `00-00`

highScoreElement.innerText = highScore

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let intervalId=null
let timerIntervalId = null

let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}

const blocks = []
let snake = [{
    x:1, y:3
} ]

let direction = 'down'


for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
        const block = document.createElement('div');
        block.classList.add("block") // naye div ko block class deta hai
        board.appendChild(block)
        blocks[`${row}-${col}`] = block
    }
}

function render(){
    
    let head = null
    
    blocks[`${food.x}-${food.y}`].classList.add("food")

    if(direction=="left"){
        head = {x:snake[0].x, y:snake[0].y-1}
    }
    else if(direction=="right"){
        head = {x:snake[0].x, y:snake[0].y+1}
    }
    else if(direction=="down"){
        head = {x:snake[0].x+1, y:snake[0].y}
    }
    else if(direction=="up"){
        head = {x:snake[0].x-1, y:snake[0].y}
    }
    
    
    // wall collision logic
    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        clearInterval(intervalId)
        modal.style.display="flex"
        startgamemodal.style.display="none"
        gameovermodal.style.display = "flex"
        return
    }


    // food consume logic
    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
        blocks[`${food.x}-${food.y}`].classList.add("food")

        snake.unshift(head)

        score+=10
        scoreElement.innerText = score

        if(score>highScore){
            highScore = score
            localStorage.setItem("highScore", highScore.toString())
        }
    }

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })
    
    snake.unshift(head) // front mein add kiya
    
    snake.pop()

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
} 



startbutton.addEventListener("click",()=>{
    modal.style.display = "none"
    intervalId = setInterval(() => { 
        render()
    }, 300);
    timerIntervalId = setInterval(() => {
        let [min,sec] = time.split("-").map(Number)
        if(sec==59){
            min+=1
            sec=0
        }
        else sec+=1
        time = `${min}-${sec}`
        timeElement.innerText = time
    }, 1000);
})


restartbutton.addEventListener("click",restartgame)

function restartgame(){
    
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    score=0
    time = `00-00`

    scoreElement.innerText = score
    timeElement.innerText = time 
    highScoreElement.innerText = highScore

    modal.style.display = "none"
    direction = "right"
    snake = [{x:1,y:3}]
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
    intervalId = setInterval(() => { 
        render()
    }, 300);

}




addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp") direction="up"
    else if(event.key=="ArrowDown") direction="down"
    else if(event.key=="ArrowRight") direction="right"
    else if(event.key=="ArrowLeft") direction="left"
})

























// const board = document.querySelector('.board');

// const startbutton = document.querySelector(".btn-start");
// const modal = document.querySelector(".modal");
// const startgamemodal = document.querySelector(".start-game");
// const gameovermodal = document.querySelector(".game-over");
// const restartbutton = document.querySelector(".btn-restart");

// const scoreElement = document.querySelector("#score");
// const highScoreElement = document.querySelector("#high-score");

// const blockHeight = 30;
// const blockWidth = 30;

// const cols = Math.floor(board.clientWidth / blockWidth);
// const rows = Math.floor(board.clientHeight / blockHeight);

// let intervalId = null;

// let score = 0;
// let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;

// highScoreElement.innerText = highScore;

// let food = {
//     x: Math.floor(Math.random() * rows),
//     y: Math.floor(Math.random() * cols)
// };

// const blocks = [];

// let snake = [
//     { x: 1, y: 3 }
// ];

// let direction = "down";

// let gameRunning = false;


// // CREATE BOARD

// for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {

//         const block = document.createElement("div");

//         block.classList.add("block");

//         board.appendChild(block);

//         blocks[`${row}-${col}`] = block;
//     }
// }


// // GENERATE FOOD

// function generateFood() {

//     let newFood;

//     do {
//         newFood = {
//             x: Math.floor(Math.random() * rows),
//             y: Math.floor(Math.random() * cols)
//         };

//     } while (
//         snake.some(segment =>
//             segment.x === newFood.x &&
//             segment.y === newFood.y
//         )
//     );

//     food = newFood;
// }


// // RENDER SNAKE AND FOOD

// function draw() {

//     // Draw food
//     blocks[`${food.x}-${food.y}`].classList.add("food");

//     // Draw snake
//     snake.forEach(segment => {
//         blocks[`${segment.x}-${segment.y}`].classList.add("fill");
//     });
// }


// // MOVE SNAKE

// function render() {

//     let head = null;

//     if (direction === "left") {
//         head = {
//             x: snake[0].x,
//             y: snake[0].y - 1
//         };
//     }

//     else if (direction === "right") {
//         head = {
//             x: snake[0].x,
//             y: snake[0].y + 1
//         };
//     }

//     else if (direction === "down") {
//         head = {
//             x: snake[0].x + 1,
//             y: snake[0].y
//         };
//     }

//     else if (direction === "up") {
//         head = {
//             x: snake[0].x - 1,
//             y: snake[0].y
//         };
//     }


//     // WALL COLLISION

//     if (
//         head.x < 0 ||
//         head.x >= rows ||
//         head.y < 0 ||
//         head.y >= cols
//     ) {
//         gameOver();
//         return;
//     }


//     // FOOD COLLISION

//     const ateFood =
//         head.x === food.x &&
//         head.y === food.y;


//     // SELF COLLISION

//     const collisionBody = ateFood ? snake : snake.slice(0, -1);

//     const hitSelf = collisionBody.some(segment =>
//         segment.x === head.x &&
//         segment.y === head.y
//     );

//     if (hitSelf) {
//         gameOver();
//         return;
//     }


//     // REMOVE OLD SNAKE FROM SCREEN

//     snake.forEach(segment => {
//         blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
//     });


//     // MOVE HEAD

//     snake.unshift(head);


//     // IF FOOD NOT EATEN, REMOVE TAIL

//     if (!ateFood) {
//         snake.pop();
//     }

//     else {

//         // Remove old food
//         blocks[`${food.x}-${food.y}`].classList.remove("food");

//         // Increase score
//         score += 10;
//         scoreElement.innerText = score;

//         // Update high score
//         if (score > highScore) {
//             highScore = score;

//             highScoreElement.innerText = highScore;

//             localStorage.setItem("snakeHighScore", highScore);
//         }

//         // Generate new food
//         generateFood();
//     }


//     // DRAW UPDATED SNAKE AND FOOD

//     draw();
// }


// // START GAME

// function startGame() {

//     clearInterval(intervalId);

//     modal.style.display = "none";

//     gameRunning = true;

//     intervalId = setInterval(() => {
//         render();
//     }, 300);
// }


// // GAME OVER

// function gameOver() {

//     clearInterval(intervalId);

//     intervalId = null;

//     gameRunning = false;

//     modal.style.display = "flex";

//     startgamemodal.style.display = "none";

//     gameovermodal.style.display = "flex";
// }


// // RESTART GAME

// function restartgame() {

//     clearInterval(intervalId);

//     // Remove old snake
//     snake.forEach(segment => {
//         blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
//     });

//     // Remove old food
//     blocks[`${food.x}-${food.y}`].classList.remove("food");

//     // Reset snake
//     snake = [
//         { x: 1, y: 3 }
//     ];

//     // Reset direction
//     direction = "right";

//     // Reset score
//     score = 0;
//     scoreElement.innerText = score;

//     // Generate fresh food
//     generateFood();

//     // Reset modal
//     modal.style.display = "none";
//     startgamemodal.style.display = "none";
//     gameovermodal.style.display = "none";

//     gameRunning = true;

//     // Start fresh interval
//     intervalId = setInterval(() => {
//         render();
//     }, 300);
// }


// // BUTTON EVENTS

// startbutton.addEventListener("click", () => {
//     startGame();
// });

// restartbutton.addEventListener("click", () => {
//     restartgame();
// });


// // KEYBOARD EVENTS

// addEventListener("keydown", (event) => {

//     if (!gameRunning) return;

//     if (event.key === "ArrowUp" && direction !== "down") {
//         direction = "up";
//     }

//     else if (event.key === "ArrowDown" && direction !== "up") {
//         direction = "down";
//     }

//     else if (event.key === "ArrowRight" && direction !== "left") {
//         direction = "right";
//     }

//     else if (event.key === "ArrowLeft" && direction !== "right") {
//         direction = "left";
//     }
// });
