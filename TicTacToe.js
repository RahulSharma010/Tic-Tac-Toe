let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let modeBtn = document.querySelector(".mode");
let body = document.querySelector("body");


let turn0 = true;
let currMode = "light";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
}

const checkDraw = () => {
    for (box of boxes) {
        if (box.innerText.trim() === "") {
            return false; // If any box is empty, the game is not a draw
        }
    }
    return true; // All boxes are filled, indicating a draw
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was Clicked!!");
        if (turn0) { // Player O
            box.innerText = "O";
            turn0 = false;
        }
        else { // Player X
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        console.log(pos1Val, pos2Val, pos3Val);
        if (pos1Val != "" || pos2Val != "" || pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                boxes[pattern[0]].style.backgroundColor = "yellow";
                boxes[pattern[1]].style.backgroundColor = "yellow";
                boxes[pattern[2]].style.backgroundColor = "yellow";
                msg.innerText = `CONGRATULATIONS THE WINNER IS ${pos1Val}`;
                msgContainer.classList.remove("hide");
                disableAllBoxes();
                return;
            }
        }
    }
    if(checkDraw() === true){
        msg.innerText = `THE GAME IS DRAW`;
        msgContainer.classList.remove("hide");
    }
}

const disableAllBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

modeBtn.addEventListener("click", () => {
    if(currMode === "light"){
        currMode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    }
    else{
        currMode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
    console.log(currMode);
})

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);