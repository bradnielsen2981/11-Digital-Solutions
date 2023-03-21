const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
exit = false;
board = [[0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]];

//--------------------------------------------------------------------------
//A CLASS is a variable type that contains OTHER variables and functions (WHEN IT IS CREATED, ITS CALLED AN OBJECT!!!)
class Sprite
{
    constructor(x, y, width, height, image, rect) { //a constructor is the function called when the OBJECT is created
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.boundary = rect;
      this.image = new Image();
      this.image.src = image;
      this.isDragging = false; 
      this.offsetX = 0;
      this.offsetY = 0; 
    }

    //draw the image
    draw(canvas) {
      canvas.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() //do any logic
    {
    }

    mouseDown(x,y) //react to mouseDown
    {
      if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
        this.isDragging = true;
        this.offsetX = x - this.x;
        this.offsetY = y - this.y;
      }
    }

    mouseMove(x,y) //react to mouseMove
    {
      if (this.isDragging) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
      }
    }

    mouseUp(x,y) //react to mouseUp
    {
      if (this.isDragging)
      {
        sprite.x = x; //align sprite after mouse up
        sprite.y = y; 
        this.isDragging = false;
      }
    }

}

//draw the square
function draw_square(x,y,side)
{
    ctx.beginPath();
    ctx.rect(x*side, y*side, side, side);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

//draw the board
function draw_board()
{
    for (row=0; row < board.length; row++)  
    {
        for (col=0; col < board[row].length; col++)
        { 
            draw_square(col,row,100);
        }
    }
}


//-------------------------------------------------------------------------

//GLOBAL EVENT HANDLING - check with all sprites
function onMouseDown(event) {
  for (sprite of SpriteList) {
    sprite.mouseDown(event.offsetX,event.offsetY);
  }
}

function onMouseMove(event) {
  for (sprite of SpriteList) {
    sprite.mouseMove(event.offsetX,event.offsetY);
  }
}

function onMouseUp(event) {
  //align with board
  squarewidth = (canvas.height/board.length);
  column = Math.trunc(event.offsetX/squarewidth);
  row = Math.trunc(event.offsetY/squarewidth);
  alert("ROW: " + String(row) + " COLUMN: " + String(column));

  for (sprite of SpriteList) {
    sprite.mouseUp(column*squarewidth,row*squarewidth);
  }
}

//-----------------------------------------------------------------------------

//GLOBAL GAME ANIMATION FUNCTION - Drag and drop needs canvas cleared each frame
function game() {
    if (exit == true) { return; } //get game loop

    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    draw_board(); //redraw the board
    for (sprite of SpriteList) //draw all sprites
    {
      sprite.update(); //run any sprite logic
    }

    for (sprite of SpriteList) //draw all sprites
    {
      sprite.draw(ctx);
    }
    requestAnimationFrame(game); //calls itself - known as a recursive function
}

//---------------------------------------------------------------------------

//GAME SET UP
SpriteList = []; //all sprites get added to SpriteList
for (i=0; i<10; i++)
{
    let x = Math.floor(Math.random()*600);
    let y = Math.floor(Math.random()*600);
    mySprite = new Sprite(x, y, 50, 50, "images/pig.png", ctx.getBoundingClientRect);
    SpriteList.push(mySprite);
}

game();