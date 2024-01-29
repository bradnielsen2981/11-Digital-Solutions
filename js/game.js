//GAME FUNCTIONS-------------------------------------------------------
function draw_square(x,y,width,height)
{
    CTX.beginPath();
    CTX.rect(x*width, y*height, width, height);
    CTX.strokeStyle = 'black';
    CTX.stroke();
}

//draw the BOARD
function draw_board()
{
    for (row=0; row < BOARD.length; row++)  
    {
        for (col=0; col < BOARD[row].length; col++)
        { 
            draw_square(col,row,squarewidth,squareheight);
        }
    }
}

//GAME EVENTS-------------------------------------------------------

//on mouse down
function onMouseDown(event) {
  for (sprite of SpriteList) {
    sprite.mouseDown(event.offsetX,event.offsetY);
  }
}

//on mouse move event
function onMouseMove(event) {
  for (sprite of SpriteList) {
    sprite.mouseMove(event.offsetX,event.offsetY);
  }
}

//on mouse down event
function onMouseUp(event) {
  for (sprite of SpriteList) {
    sprite.mouseUp((event.offsetX,event.offsetY))
  }
}

//on key down event
function onKeyDown(event) {
  for (sprite of SpriteList) {
    letter = String.fromCharCode(event.keyCode);
    sprite.keydown(event.keyCode, letter);
  } 
}

//GAME LOOP----------------------------------------------------------
function game() {
    if (EXIT == true) { return; } //get game loop

    CTX.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    draw_BOARD(); //redraw the BOARD
    for (sprite of SpriteList) //draw all sprites
    {
      sprite.update(CTX); //run any sprite logic

      //detect collision
    }
    for (sprite of SpriteList) //draw all sprites in the the Sprite List
    {
      sprite.draw(CTX);
    }


    requestAnimationFrame(game); //calls itself - known as a recursive function
}

//GAME SETUP------------------------------------------------------

function start_game()
{
  CANVAS = document.getElementById("myCanvas");
  CANVAS.focus()
  CTX = CANVAS.getContext("2d");
  CANVAS.addEventListener("mousedown", onMouseDown);
  CANVAS.addEventListener("mousemove", onMouseMove);
  CANVAS.addEventListener("mouseup", onMouseUp);
  CANVAS.addEventListener("keydown", onKeyDown);

  time = 0
  exit = false;
  BOARD = [[0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0]];
  squareheight = CANVAS.height/BOARD.length;
  squarewidth = CANVAS.width/BOARD[0].length

  SPRITELIST = []; //all sprites get added to SpriteList - if you want to do more drawing, create more sprites and add them to the list.

  //Create all the sprites
  for (i=0; i<10; i++)
  {
      let x = Math.floor(Math.random()*BOARD[0].length);
      let y = Math.floor(Math.random()*BOARD.length);
      mySprite = new Sprite(x*squarewidth, y*squareheight, squarewidth, squareheight, "images/pig.png", CTX.getBoundingClientRect); //Create a new Sprite
      SpriteList.push(mySprite); //Add the new Sprite to the SpriteList.
  }
}
game(); //Start game loop