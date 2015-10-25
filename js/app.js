// Enemies our player must avoid
var Enemy = function(rowIn, speedIn) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the initial location
    this.x = -101; // Initialize to be off the left edge
    this.row = rowIn;
    this.y = this.row*83 - 25; // This may need adjusting later

    // Set the intial speed;
    this.speed = speedIn; // The unit would be px/s
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Update the location
    if (this.x > 505) {
        this.x = -101;
    }
    else {
        this.x += this.speed*dt;
    }
    // Uddate the region it belongs to;
    this.col = Math.floor(this.x/101);
    // Collision detect
    if (this.row === player.row && this.col === player.col) {
        funcGlobal[0]();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.col = 2;
    this.x = this.col*101;
    this.row = 5;
    this.y = this.row*83 - 25;
    this.dCol = 0,
    this.dRow = 0;
};

Player.prototype.update = function(dt) {
    // Update the location
    if (this.col+this.dCol >= 0 && this.col+this.dCol <= 4) {
       this.col += this.dCol;
       this.dCol = 0;
       this.x = this.col*101;
    }    
    if (this.row+this.dRow >= 0 && this.row+this.dRow <= 5) {
        this.row += this.dRow;
        this.dRow = 0;
        this.y = this.row*83 - 25;  
    }
    // Arrive detection
    if (this.row === 0) {
        confirm("You have crossed the river!! Wanna play once more?");
        // setTimeout(funcGlobal[0](), 2);
        funcGlobal[0]();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.dCol = -1;
        this.dRow = 0;
    }
    else if (direction === 'right') {
        this.dCol = 1;
        this.dRow = 0;
    }
    else if (direction === 'up') {
        this.dCol = 0;
        this.dRow = -1;
    }
    else if (direction === 'down') {
        this.dCol = 0;
        this.dRow = 1;
    }
    else {
        this.dCol = 0;
        this.dRow = 0;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(1, 125));
allEnemies.push(new Enemy(1, 75));
allEnemies.push(new Enemy(1, 10));
allEnemies.push(new Enemy(2, 50));
allEnemies.push(new Enemy(2, 90));
allEnemies.push(new Enemy(3, 30));
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
