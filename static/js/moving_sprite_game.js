//create a random sprite

function create_moving_sprite()
{
  let posx = Math.random()*CANVAS.width;
    let posy = Math.random()*CANVAS.height;

    while (true)
    {
      let spritefound = false;
      for (sprite in SPRITE_LIST)
      {
        if (sprite_collision_with_point(sprite, posx, posy))
        {
          spritefound = true;
        }
      }
      if (spritefound == false)
      {
        break;
      }
    }

    mySprite = new Moving_Sprite(posx,posy,100,100,"static/images/pig.png"); 
    SPRITE_LIST.push(mySprite); //Add the new Sprite to the SpriteList.
}



//GAME LOOP----------------------------------------------------------
function game_loop(currentTime) {
    if (EXIT == true) { return; } //exit game loop

    DELTA_TIME = (currentTime - LAST_FRAME_TIME) / 1000;
    LAST_FRAME_TIME = currentTime;
    let TIME = Math.round((currentTime - STARTTIME) / 1000) * 1000; // Round to nearest second in milliseconds
    if (TIME%2000 === 0) {
      if (SPRITE_LIST.length < 10)
      {
        create_moving_sprite();
      }
    }

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); //clear canvas

    //draw_background()
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
CANVAS= document.getElementById("mycanvas");
CANVAS.focus()
CTX = CANVAS.getContext("2d");
CANVAS.addEventListener("mousedown", on_mouse_down);
CANVAS.addEventListener("mousemove", on_mouse_move);
CANVAS.addEventListener("mouseup", on_mouse_up);
CANVAS.addEventListener("keydown", on_key_down);

STARTTIME = new Date();
LAST_FRAME_TIME = STARTTIME;

game_loop(); //Start game loop