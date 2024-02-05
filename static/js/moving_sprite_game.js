//GAME FUNCTIONS-------------------------------------------------------
function draw_square(x,y,width,height)
{
    CTX.beginPath();
    CTX.rect(x*width, y*height, width, height);
    CTX.strokeStyle = 'black';
    CTX.stroke();
}

//GAME EVENTS -------------------------------------------------------
//draw the GRID
function draw_grid()
{
    for (row=0; row < GRID.length; row++)  
    {
        for (col=0; col < GRID[row].length; col++)
        { 
            draw_square(col,row,SQUARE_WIDTH,SQUARE_HEIGHT); //draws a black square
        }
    }
}

//on mouse down on canvas
function onMouseDown(event) {
  for (sprite of SPRITE_LIST) {
    sprite.mouseDown(event.offsetX,event.offsetY);
  }
}

//on mouse move event on canvas
function onMouseMove(event) {
  for (sprite of SPRITE_LIST) {
    sprite.mouseMove(event.offsetX,event.offsetY);
  }
}

//on mouse down event on canvas
function onMouseUp(event) {
  //align with GRID
  column = Math.trunc(event.offsetX/SQUARE_WIDTH);
  row = Math.trunc(event.offsetY/SQUARE_HEIGHT);

  console.log("ROW: " + String(row) + " COLUMN: " + String(column));

  for (sprite of SPRITE_LIST) {
    sprite.mouseUp(event.offsetX,event.offsetY);
  }

  console.log(GRID);
}

//on key down event during game
function onKeyDown(event) {
  for (sprite of SPRITE_LIST) {
    letter = String.fromCharCode(event.keyCode);
    sprite.keydown(event.keyCode, letter);
  } 
}

//GAME LOOP----------------------------------------------------------
function game_loop(currentTime) {
    if (EXIT == true) { return; } //exit game loop

    DELTA_TIME = (currentTime - LAST_FRAME_TIME) / 1000;
    LAST_FRAME_TIME = currentTime;

    CTX.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    draw_GRID(); //redraw the GRID
    for (sprite of SPRITE_LIST) //draw all sprites
    {
      sprite.update(); //run any sprite logic
    }

    for (sprite of SPRITE_LIST) //draw all sprites in the the Sprite List
    {
      sprite.draw();
    }

    //Calculate time elapsed
    requestAnimationFrame(game_loop); //calls itself - known as a recursive function
}

//SETUP THE GAME -----------------------------------------------------
canvas = document.getElementById("mycanvas");
canvas.focus()
CTX = canvas.getContext("2d");
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("keydown", onKeyDown);

TIME = 0
EXIT = false;
GRID = [[0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]];

//Create all the sprites
for (i=0; i<10; i++)
{
    let x = Math.floor(Math.random()*GRID[0].length);
    let y = Math.floor(Math.random()*GRID.length);
    while (GRID[y][x] == 1)
    {
      x = Math.floor(Math.random()*GRID[0].length);
      y = Math.floor(Math.random()*GRID.length);
    }

    mySprite = new Sprite(x*SQUARE_WIDTH, y*SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_HEIGHT, "images/pig.png", CTX.getBoundingClientRect); //Create a new Sprite
    SPRITE_LIST.push(mySprite); //Add the new Sprite to the SpriteList.

    //update GRID
    GRID[y][x] = 1;
}

console.log(GRID);

game_loop(); //Start game loop