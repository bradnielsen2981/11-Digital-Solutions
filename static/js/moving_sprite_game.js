//create a random sprite
function create_moving_sprite()
{
  //if (SPRITE_LIST.length > 10) { 
  //  clearInterval(CREATE_SPRITE_TIMER); 
  //  return; 
  //}

  /*
  let posx = Math.random()*CANVAS.width;
  let posy = Math.random()*CANVAS.height; 
  while (true) {
    let spritefound = false;
    for (sprite in SPRITE_LIST) {
      if (sprite_collision_with_point(sprite, posx, posy)){
        spritefound = true;
      }
    }
    if (spritefound == false) {
      break;
    } 
  }
  */
  //mySprite = new Moving_Sprite(posx,posy,100,100,"static/images/pig.png");
  //set_sprite_random_direction(mySprite);
  //SPRITE_LIST.push(mySprite); //Add the new Sprite to the SpriteList.
}

//game loop - called by itself every animation frame
function game_loop(currentTime) {
  if (EXIT == true) { 
    end_game(); 
    return; 
  } //exit game loop

  //create measures for time
  DELTA_TIME = (currentTime - LAST_FRAME_TIME) / 1000;
  LAST_FRAME_TIME = currentTime;
  let TIME = Math.round((currentTime - STARTTIME) / 1000) * 1000; // Round to nearest second in milliseconds

  //clear canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 

  //update sprites
  for (sprite of SPRITE_LIST)
  {
    sprite.update(); //run any sprite logic
  }

  //draw all sprites in the the Sprite List
  for (sprite of SPRITE_LIST) 
  {
    sprite.draw();
  }

  requestAnimationFrame(game_loop); //calls itself - known as a recursive function
}

// Start the game, add eventlisteners
function start_game()
{
  CANVAS= document.getElementById("mycanvas");
  CANVAS.focus()
  CTX = CANVAS.getContext("2d");
  CANVAS.addEventListener("mousedown", on_mouse_down);
  CANVAS.addEventListener("mousemove", on_mouse_move);
  CANVAS.addEventListener("mouseup", on_mouse_up);
  CANVAS.addEventListener("keydown", on_key_down);

  STARTTIME = new Date();
  LAST_FRAME_TIME = STARTTIME;

  //CREATE_SPRITE_TIMER = setInterval(create_moving_sprite, 2000);

  game_loop(); //Start game loop
}

//end the game, clear the sprite list, remove the event listeners
function end_game()
{
  SPRITE_LIST = [];
  BULLET_LIST = [];
  CANVAS.removeEventListener("mousedown", on_mouse_down);
  CANVAS.removeEventListener("mousemove", on_mouse_move);
  CANVAS.removeEventListener("mouseup", on_mouse_up);
  CANVAS.removeEventListener("keydown", on_key_down);

  //could move to another page
  //window.location.href = "menu.html";
}

start_game();