const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
let box = cvs.height / 10;
let xTurn = true;

function canvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

let player1 = new Player("Gourav", 0, 9 * box, "yellow", "circle");
let player2 = new Player("Gourav", 0, 9 * box, "black", "square");
let board = [];
for (let i = 1; i <= 10; i++) {
    board[i] = [];

    for (let j = 1; j <= 10; j++) {
        if (i % 2 == 0) {
            board[i][j] = 90 - 10 * (i - 1) + j;
        } else {
            board[i][j] = 101 - 10 * (i - 1) - j;
        }
    }
}

function Player(name, x, y, color, shape) {
    this.name = name;
    this.r = box / 3;
    this.x = x + box / 2;
    this.y = y + box / 2;
    this.shape = shape;
    this.place = function() {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        if (this.shape == "circle") {
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        }
        if (this.shape == "square") {
            ctx.strokeRect(this.x - this.r, this.y - this.r, 0.7 * box, 0.7 * box);
        }
        ctx.stroke();
        //ctx.fill();
        ctx.closePath();
    }
    this.move = function(points) {
        if (this.y == 30 && (this.x / box - 0.5) < points) {
            //console.log("bacche ki jaan lega kya!!");
        } else {
            //console.log(this.y / box);
            while (points--) {
                if ((this.y / box - 0.5) % 2 != 0) {
                    //console.log("hi");
                    if ((this.x / box) < 9) {
                        this.x += box;
                    } else {
                        this.y -= box;
                    }
                } else {
                    if ((this.x / box) > 1) {
                        this.x -= box;
                    } else {
                        this.y -= box;
                    }
                }
            }
        }
    }
    this.checkWin = function() {
        if (this.y / box - 0.5 == 0 && this.x / box - 0.5 == 0) {
            alert(name + " you won!!!");
        }
    }
}

let youGot;

function roll() {
    youGot = Math.floor(Math.random() * 6) + 1;
    if (xTurn) {
        player1.move(youGot);
        xTurn = !xTurn;
    } else {
        player2.move(youGot);
        xTurn = !xTurn;
    }

}

function showStatus() {
    ctx.fillStyle = "white";
    let player = (xTurn) ? "Gourav" : "Harshit";
    ctx.fillText(player + " you got " + youGot, 10 * box, 5 * box);
    ctx.fill();
}

function drawBoard() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            ctx.fillStyle = ((i + j) & 2 == 2) ? "red" : "orange";
            ctx.font = "20px Georgia";
            ctx.fillRect(i * box, j * box, box, box);
            ctx.fillStyle = "white";
            ctx.fillText(board[j + 1][i + 1], i * box + box * 0.4, j * box + 0.8 * box);
            ctx.stroke();
        }
    }
}
//player1.x += box;

function draw() {

    canvas();
    drawBoard();
    player1.place();
    player2.place();
    player1.checkWin();
    player2.checkWin();
    showStatus();
    //console.log(player1.y / box - 0.5);
}
setInterval(draw, 100);