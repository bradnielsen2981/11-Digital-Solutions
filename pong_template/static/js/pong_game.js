//SPECIFIC GAME GLOBALS

//create a random sprite
function create_moving_sprite()
{
  /*if (SPRITE_LIST.length > 10) { 
    return; 
  }

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
    } else {
        let posx = Math.random()*CANVAS.width;
        let posy = Math.random()*CANVAS.height; 
    }
  }
  
  s = new Moving_Sprite(posx,posy,100,100,"static/images/pig.png");
  set_sprite_random_direction(s);*/
}

// Called every frame
function update_game()
{
}

// Start the game
function start_game()
{
  paddle = new Paddle_Sprite(570,0,25,100,"static/images/paddle.png");
  //GAME.set_sprite_random_direction(pig);
  ball = new Ball_Sprite(0,0,30,30,"static/images/ball.png");
}

// End the game
function end_game()
{
  //could move to another page
  //window.location.href = "menu.html";
}

GAME = new Game()
GAME_CONTROLLER = new Game_Controller()
GAME_CONTROLLER.start()