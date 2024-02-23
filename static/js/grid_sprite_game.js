
piece = "";

monastry.onclick = function() {
  piece = monastry;
  p = new Grid_Sprite(0,0,'static/images/monastry.png',"M");
  SPRITE_LIST.push(p);
  GRID[0][0] = "M";
  console.log(GRID);
};



//GAME LOOP----------------------------------------------------------
function game_loop(currentTime) {
    if (EXIT == true) { return; } //exit game loop

    DELTA_TIME = (currentTime - LAST_FRAME_TIME) / 1000;
    LAST_FRAME_TIME = currentTime;

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); //clear canvas

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
CANVAS = document.getElementById("mycanvas");
CANVAS.focus()
CTX = CANVAS.getContext("2d");
CANVAS.addEventListener("mousedown", on_mouse_down); //attach events from globals
CANVAS.addEventListener("mousemove", on_mouse_move); //attach events from globals
CANVAS.addEventListener("mouseup", on_mouse_up); //attach events from globals
CANVAS.addEventListener("keydown", on_key_down); //attach events from globals

TIME = 0
EXIT = false;
GRID = [[0,0,0],
        [0,0,0],
        [0,0,0]];

console.log(GRID);

game_loop(); //Start game loop