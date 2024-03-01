class Game_Controller
{
  constructor() 
  { //a constructor is the function called when the OBJECT is created
    this.STATUS = "Ready"
  }

  //game loop - called by itself every animation frame
  game_loop(currentTime) {
    
    if (this.STATUS == "Starting") 
    { 
      console.log("Starting");
      this.STATUS = "Waiting";
      GAME.CANVAS.focus();
      GAME.CTX = GAME.CANVAS.getContext("2d");
      GAME.CANVAS.addEventListener("mousedown", this.on_mouse_down);
      GAME.CANVAS.addEventListener("mousemove", this.on_mouse_move);
      GAME.CANVAS.addEventListener("mouseup", this.on_mouse_up);
      GAME.CANVAS.addEventListener("keydown", this.on_key_down);
      GAME.CANVAS.addEventListener("keyup", this.on_key_up);
      GAME.STARTTIME = new Date();
      GAME.LAST_FRAME_TIME = GAME.STARTTIME;
      window['start_game'](); //call the start_game function
      this.STATUS = "Updating";
    } 
    else if (this.STATUS == "Updating") 
    {
      GAME.DELTA_TIME = (currentTime - GAME.LAST_FRAME_TIME) / 1000;
      GAME.LAST_FRAME_TIME = currentTime;
      let TIME = Math.round((currentTime - GAME.STARTTIME) / 1000) * 1000; // Round to second in milliseconds
      //clear canvas
      GAME.CTX.clearRect(0, 0, GAME.CANVAS.width, GAME.CANVAS.height); 
      if (GAME.SPRITE_LIST) 
      {
        //update sprites
        for (let sprite of GAME.SPRITE_LIST)
        {
          if (typeof sprite.update === 'function') {
            sprite.update(); //run any sprite logic
          }
        }
        //draw all sprites 
        for (let sprite of GAME.SPRITE_LIST) 
        {
          if (typeof sprite.draw === 'function') {
            sprite.draw();
          }
        }
      }
      window['update_game'](); //called the update_game function
    } 
    else if (this.STATUS == "Ending") 
    { 
      console.log("Ending");
      window['end_game'](); //call the end_game function
      GAME.SPRITE_LIST = [];
      GAME.CANVAS.removeEventListener("mousedown", this.on_mouse_down);
      GAME.CANVAS.removeEventListener("mousemove", this.on_mouse_move);
      GAME.CANVAS.removeEventListener("mouseup", this.on_mouse_up);
      GAME.CANVAS.removeEventListener("keydown", this.on_key_down);
      GAME.GAME_STATUS = "Ready";
      return; 
    } 
    requestAnimationFrame(this.game_loop.bind(this)); //calls itself - known as a recursive function
  }

  //start game
  start()
  {
    this.STATUS = "Starting";
    this.game_loop()
  }

  //end
  end()
  {
    this.STATUS  = "Ending";
  }

    // COMMON EVENTS--------------------------------------
  // on mouse down on canvas
  on_mouse_down(event) {
    if (GAME.SPRITE_LIST)
    { 
      for (let sprite of GAME.SPRITE_LIST) {
        if (typeof sprite.on_mouse_down === 'function') {
          sprite.on_mouse_down(event.offsetX,event.offsetY);
        }
      }
    }
  }

  // on mouse move event on canvas
  on_mouse_move(event) {
    if (GAME.SPRITE_LIST)
    { 
      for (let sprite of GAME.SPRITE_LIST) {
        if (typeof sprite.on_mouse_move === 'function') {
          sprite.on_mouse_move(event.offsetX,event.offsetY);
        }
      }
    }
    GAME.MOUSEX = event.offsetX;
    GAME.MOUSEY = event.offsetY;
  }

  // on mouse down event on canvas
  on_mouse_up(event) {
    if (GAME.SPRITE_LIST)
    { 
      for (let sprite of GAME.SPRITE_LIST) {
        if (typeof sprite.on_mouse_up === 'function') {
          sprite.on_mouse_up(event.offsetX,event.offsetY);
        }
      }
    }
  }

  // on key down event during game
  on_key_down(event) {
    let letter = String.fromCharCode(event.keyCode);
    GAME.KEYS_PRESSED[letter] = true;
    if (GAME.SPRITE_LIST)
    { 
      for (let sprite of GAME.SPRITE_LIST) {
        if (typeof sprite.on_key_down === 'function') {
          sprite.on_key_down(event.keyCode, letter, GAME.KEYS_PRESSED);
        }
      } 
    }
  }

  //on key up
  on_key_up(event) {
    let letter = String.fromCharCode(event.keyCode);
    for (let sprite of GAME.SPRITE_LIST) {
      if (typeof sprite.on_key_up === 'function') {
        sprite.on_key_up(event.keyCode, letter);
      }
    }
    delete GAME.KEYS_PRESSED[letter];
  }

}