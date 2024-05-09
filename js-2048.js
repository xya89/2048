// Get DOM elements
var gridElmt = document.querySelector('.grid');
var scoreElmt = document.querySelector("#score");
var bestElmt = document.querySelector('#best');
// console.log(scoreElmt);
// console.log(gridElmt);

// // import game logics
// import * as gameLogic from './js-2048_js'

//New Game
var newGameBtn = document.querySelector('button');
newGameBtn.addEventListener('click', function(){
    if(confirm("Are you sure to start a new game? All Progress will be lost.")){
        window.location.reload();
    }
    
})

//OnLoad
//Initialize Displays
var score = 0;
const width = 4;
var box = [];
var masterBoard;


// Create boxes
function createBoxes(){
    //initialize a 2D array to store the box's coord
    var arr = [];
    for(var i=0;i<width;i++){
        arr[i]=[];
    }

    // Create boxes elemts
    for(var i=0; i<width*width;i++){
        // "2D array to track box's relative location"
        var col = i%width;
        var row = Math.floor(i / width);

        box = document.createElement('div');
        // box.setAttribute('index', i);
        box.setAttribute('x', row);
        box.setAttribute('y', col);

        box.textContent = '';
        gridElmt.appendChild(box);

        // Initialize master board with zeros
        if(!arr[row]){
            arr[row] = []
        }
        arr[row][col] = 0;

    }
    return arr;
}

// Generate Number - Initailize the playground
function generateNumber(board){
    
    //Let two random box have the value.
    //generate two random index to assign value.
    let x = Math.floor(Math.random()*board.length);
    let y = Math.floor(Math.random()*board.length);
    if(board[x][y] == 0){
        board[x][y] = Math.random() > 0.2 ? 2:4;
    }
    else{
        generateNumber(board);
    }
    return board;
}

// render the number to the screen 
function writeNumber(board){
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            // Find the corresponding div element
            let box = document.querySelector(`.grid div[x="${x}"][y="${y}"]`);
            
            if(board[x][y] != 0){
                // Set its textContent to the value of the board position
                box.textContent = board[x][y];
                
                // set color
                box.className = `number-${board[x][y]}`
            }

        }
    }
}

// clear board
// Function to clear the text content of the board
function clearBoard() {
    var boxes = document.querySelectorAll('.grid div');
    boxes.forEach(function(box) {
        box.textContent = '';
    });
}


// Detect if the game ends:
// Condition 1: largest value is 2048
// Condition 2: board is full
function gameEnds(board){
    if(!checkFull(board)){
        return false;
    }
    for(var i=0;i<board.length;i++){
        for(var j=0;j<board.length;j++){
            if(j < board.length - 1 && board[i][j] === board[i][j+1]){
                generateNumber(board); 
                return false;
                
            }
            if(i < board.length - 1 && board[i][j] === board[i+1][j]){
                generateNumber(board);
                return false;
            }
        }   
    }
    alert("Game Over!");
    return true;
}

function checkFull(board){
    var full = true; 
    for(var i=0;i<board.length-1;i++){
        for(var j=0;j<board.length-1;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true; 
}

// Handle keyboard
// callback dictionary - keymap
const keyMap = {
    'w': upHandler,
    'a': leftHandler,
    's': downHandler,
    'd': rightHandler,
    'ArrowUp': upHandler,
    'ArrowLeft': leftHandler,
    'ArrowDown': downHandler,
    'ArrowRight': rightHandler
}

function keyBoardHandler(board){
    window.addEventListener('keydown',function(ev){
        const action = keyMap[ev.key];
        action(board);
    })
}

// Direction Handlers
function upHandler(board){
    console.log(gameEnds(board));

    if(canMoveTop(board) && !gameEnds(board)){
        console.log('Move top!');
        var newBoard = moveTop(board);
        console.log('value after moving top:', newBoard);
        clearBoard();
        generateNumber(newBoard);
        writeNumber(newBoard);

    }
    else{
        console.log('canot move top!');
    }
}
function downHandler(board){
    console.log(gameEnds(board));

    if(canMoveDown(board) && !gameEnds(board)){
        console.log('Move down!');
        var newBoard = moveDown(board);
        console.log('value after moving down:', newBoard);
        clearBoard();
        generateNumber(newBoard);
        writeNumber(newBoard);
    }
    else{
        console.log("cannot move down!");
    }
}
function leftHandler(board){
    console.log(gameEnds(board));

    if(canMoveLeft(board) && !gameEnds(board)){
        console.log('Move left!');
        var newBoard = moveLeft(board);
        console.log('value after moving left:', newBoard);
        clearBoard();
        generateNumber(newBoard);
        writeNumber(newBoard);

    }
    else{
        console.log('canot move left!');
    }
}
function rightHandler(board){
    console.log(gameEnds(board));
    if(canMoveRight(board) && !gameEnds(board)){
        console.log('Move right!');
        var newBoard = moveRight(board);
        console.log('value after moving right:', newBoard);
        clearBoard();
        generateNumber(newBoard);
        writeNumber(newBoard);

    }
    else{
        console.log('canot move right!');
    }
}


// Evaluation Functions
// a box can move to a direction on the following condition: 
// 1. immediate value is equal
// 2. immediate value is 0;
// Evaluate Right
function canMoveRight(board){
    for(var i= 3; i>=0; i--){
        for(var j=2; j>=0; j--){
            //current box not empty
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
// Evaluate Left 
function canMoveLeft(board){
    for(i=3;i>=0;i--){
        for(j=3;j>=1;j--){
            //current box not empty
            if(board[i][j] != 0){
                //check if immediate left is empty and if left is equal value.
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
// Evaluate Top
function canMoveTop(board){
    for(i=3;i>=1;i--){
        for(j=3;j>=0;j--){
            //current box nonempty
            if(board[i][j] != 0){
                //check immediate top is empty or equal value
                if(board[i-1][j] == 0 || board[i-1][j]== board[i][j]){
                    return true;
                }
            }
        }
    }
    return false; 
}
// Evaluate Down
function canMoveDown(board){
    for(i=0;i<=2;i++){
        for(j=0;j<=3;j++){
            //current box nonempty
            if(board[i][j] != 0){
                //check if immediate bottom is empty or equal value
                if(board[i+1][j]== 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false; 
}

// Moving to Directions: 

// moveright
function moveRight(board){
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(j<3&&board[i][j] != 0 && board[i][j+1] == 0){
                board[i][j+1] = board[i][j];
                board[i][j] = 0;
      
                moveRight(board);
            }
            else if(j<3&&board[i][j] != 0 && board[i][j] == board[i][j+1]){
                board[i][j+1] *=2;
                board[i][j] = 0;
                    
            }
        }
    }
    return board;
}
// moveLeft
function moveLeft(board){
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(j>0 && board[i][j] != 0 && board[i][j-1] == 0){
                board[i][j-1] = board[i][j];
                board[i][j] = 0;
                moveLeft(board);
            }
            else if(j>0 && board[i][j] != 0 && board[i][j] == board[i][j-1]){
                board[i][j-1] *=2;
                board[i][j] = 0;
            }
        }
    }
    return board;
}
//moveTop
function moveTop(board){
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(i>0 && board[i][j] != 0 && board[i-1][j] == 0){
                board[i-1][j] = board[i][j];
                board[i][j] = 0;
                moveTop(board);
            }
            else if(i>0 && board[i][j] != 0 && board[i][j] == board[i-1][j]){
                board[i-1][j] *=2;
                board[i][j] = 0;
            }
        }
    }
    return board;
}
//moveDown
function moveDown(board){
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            if(i<3 && board[i][j] != 0 && board[i+1][j] == 0){
                board[i+1][j] = board[i][j];
                board[i][j] = 0;
                moveDown(board);
            }
            else if(i<3 && board[i][j] != 0 && board[i][j] == board[i+1][j]){
                board[i+1][j] *=2;
                board[i][j] = 0;
            }
        }
    }
    return board;
}



masterBoard = createBoxes();
generateNumber(masterBoard);
generateNumber(masterBoard);
writeNumber(masterBoard);
keyBoardHandler(masterBoard);





















































// // test value arry
// for (var i =0;i<boxes.length;i++){
//     console.log("i: ",i);
//     if(boxes[i].textContent != ''){
//         var k=0;
//         var emptyBox = [];
//         while(k<=i){
//             if((i-k)%4==0 && boxes[k].textContent==''){
//                 console.log('this is box k: ',boxes[k] );
//                 emptyBox.push(boxes[k])
//                 emptyBox.sort(function(a,b){
//                     return a.getAttribute('index').value - b.getAttribute('index').value
//                 });
//             }
//             console.log("k: ",k);
//             k++;
//         }
//         console.log("first empty box:", emptyBox[0]);
//         console.log('textcontent is:',emptyBox[0].textContent);
//         emptyBox[0].textContent = 999
//         console.log(boxes[i]);
//         // TODO: fix when first box[i]: i=[0,4] the next box does not work!
//     }

//     var value = boxes[i].textContent;

// determine if can move right
// function canMoveRight(boxes){

//     for(var i=3;i>=0; i--){
//         for(var j=2; j>=0;j--){
//             if(boxes.getAttribute('x'))
        
//     }

// }


