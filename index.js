let xButton = document.querySelector('.x');
let oButton = document.querySelector('.o');
let startButton = document.querySelector('.begin');
let beginContainer = document.querySelector('.container');
let beginGame = document.querySelector('.game-container');
let turn = document.querySelector('.player-turn');
let selection = document.querySelector('.game');
let message = document.querySelector('.message');
let result = document.querySelector('.result');
let again = document.querySelector('.again');
let restart = document.querySelector('.game-restart');
let player, computer;

xButton.addEventListener('click', () => {
    xButton.classList.add('active');
    if(oButton.classList.contains('active'))
        oButton.classList.remove('active');
    player = 'X';
    computer = 'O';
});

oButton.addEventListener('click', () => {
    oButton.classList.add('active');
    if(xButton.classList.contains('active'))
        xButton.classList.remove('active');
    player = 'O';
    computer = 'X';
});

startButton.addEventListener('click', () => {
    if(player !== undefined) {
        beginContainer.classList.add('active');
        setTimeout(() => {
            beginGame.classList.add('active');
            TicTacToe();
        }, 1500);
    }
});

selection.addEventListener('click', (e) => {    
    if(allow && e.target.classList.contains('box') && moves.includes(map.get(e.target.id))) {
        moveNum++;
        moves[map.get(e.target.id) - 1] = 0;
        playerMoves.push(map.get(e.target.id));
        document.getElementById(e.target.id).innerText = player;
        document.getElementById(e.target.id).style.color = (player === 'X') ? 'cadetblue' : 'rgb(209, 93, 112)';
        allow = 0;
       if(moveNum < 9) {
            turn.style.color = 'rgba(255, 166, 0, 0.312)';
            computerTurn();
        }
       else 
            mesDisTime = setTimeout(() => finishGame(), 1000);
    }
});

again.addEventListener('click', playAgain);

restart.addEventListener('click', () => resetGame('res'));

const possibleWinCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8], 
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let moves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let playerMoves = [];
let computerMoves = [];
let computerMoveTime, mesDisTime;

let map = new Map();
map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');
map.set(4, 'four');
map.set(5, 'five');
map.set(6, 'six');
map.set(7, 'seven');
map.set(8, 'eight');
map.set(9, 'nine');
map.set('one', 1);
map.set('two', 2);
map.set('three', 3);
map.set('four', 4);
map.set('five', 5);
map.set('six', 6);
map.set('seven', 7);
map.set('eight', 8);
map.set('nine', 9);

let moveNum = 0, flag = 0, allow = 0;

function TicTacToe() {
        if(player === 'X') {
            turn.style.color = 'rgba(255, 166, 0)';
            allow = 1;
        }
        else {
            computerTurn();
        }
    }

function computerTurn() {
    moveNum++;
    let move;
    let thread = winThread(playerMoves);
    let winningMove = winThread(computerMoves);

    if(winningMove) {
        move = winningMove;
        flag++;
    }
    else if(thread) {
        move = thread;
    }
    else if(moves[4] > 0) {
        move = 5;
    }
    else if(moves[0] > 0 || moves[2] > 0 || moves[6] > 0 || moves[8] > 0) {
            let newArr = [];
            moves.forEach((num, index) => {
                if(num != 0 && index % 2 == 0) {
                    newArr.push(num);
                }
            });
            let randNum = Math.floor(Math.random() * newArr.length);
            move = newArr[randNum];
    }
    else {
        let newArr = [];
        moves.forEach((num, index) => {
            if(num != 0 && index % 2 == 1) {
                newArr.push(num);
            }
        });
        let randNum = Math.floor(Math.random() * newArr.length);
        move = newArr[randNum];
    }
    moves[move - 1] = 0;
    computerMoves.push(move);
    computerMoveTime = setTimeout(() => {
        document.getElementById(map.get(move)).innerText = computer;
        document.getElementById(map.get(move)).style.color = (computer === 'X') ? 'cadetblue' : 'rgb(209, 93, 112)';
        if(flag === 0 && moveNum < 9) {
            turn.style.color = 'rgba(255, 166, 0)';
            allow = 1;
        }
        else 
            mesDisTime = setTimeout(() => finishGame(), 1000);
    }, 1000);
}


function winningDis() {
    possibleWinCases.forEach(arr => {
        if(arr.every(num => computerMoves.includes(num))) {
            arr.forEach(num => {
                document.getElementById(map.get(num)).classList.add('active');
                document.getElementById(map.get(num)).style.color = 'whitesmoke';
            });
        }
    });
}

function winThread(playerArr) {
    if(playerArr.length > 1) {
        playerArr.sort();
        let ans = false;
        possibleWinCases.forEach((arr) => {
            let sim = 0;
            let threadNum;

            arr.forEach(num => {
                if(playerArr.includes(num))
                    sim++;
                else if(moves.includes(num)) {
                    threadNum = num;
                }
            });

            if(sim === 2 && threadNum) {
                ans = threadNum;
            }
        });
        if(ans === false && playerMoves.length === 2 && computerMoves.length == 1) {
            let newThread = [];

            playerArr.forEach(move => {
                let newThreadArr = [];                

                possibleWinCases.forEach(arr => {
                    let note = 0;

                    if(arr.includes(move)) {
                        arr.forEach(arrEl => {
                            if(arrEl !== move && moves.includes(arrEl)) {
                                note++;
                            }
                        });
                    }
                    if(note == 2) {
                        arr.forEach(arrEl => {
                            if(arrEl != move)
                                newThreadArr.push(arrEl);
                        });
                    } 
                });    
                newThread.push(newThreadArr);
            });

            let equalNum = 0, nums = [];
            newThread[0].forEach(el1 => {

                newThread[1].forEach(el2 => {
                    if(el1 == el2) {
                        nums.push(el1);
                        equalNum++;
                    }
                });
            });

            if(equalNum == 1)
                ans = nums[0];
            else if(equalNum == 2)
                ans = 2;
        }

        return ans;
    }
}

function finishGame() {
    if(flag !== 0) {
        if(flag)
            winningDis();
        setTimeout(() => {
            message.innerText = 'Hahahahaha, You lost!';
            result.style.visibility = 'visible';        
        }, 1000);
    }
    else {
        message.innerText = 'It is a tie, not a win!';
        result.style.visibility = 'visible';
    }
}

function playAgain() {
    (player === 'X') ? document.querySelector('.x').classList.remove('active') : document.querySelector('.o').classList.remove('active');
    result.style.visibility = 'hidden';
    beginGame.classList.remove('active');
    resetGame();
    setTimeout(() => {
        beginContainer.classList.remove('active'); 
    }, 500);
}

function resetGame(res) {
    flag = 0;
    moveNum = 0;
    flag = 0;
    allow = 0;
    moves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    playerMoves = [];
    computerMoves = [];
    document.querySelectorAll('.box').forEach((box) => {
        box.textContent = '';
        box.classList.remove('active');
    });
    clearTimeout(computerMoveTime);
    clearTimeout(mesDisTime);
    if(res) {
        result.style.visibility = 'hidden';
        TicTacToe();
    }
}