//SPECIFIC GAME GLOBALS

//create a random sprite
function create_moving_sprite()
{
  if (GAME.SPRITE_LIST.length > 10) { 
    return; 
  }

  let posx = Math.random()*GAME.CANVAS.width;
  let posy = Math.random()*GAME.CANVAS.height; 
  while (true) {
    let spritefound = false;
    for (let sprite in GAME.SPRITE_LIST) {
      if (GAME.sprite_collision_with_point(sprite, posx, posy)){
        spritefound = true;
      }
    }
    if (spritefound == false) {
      break;
    } else {
        let posx = Math.random()*GAME.CANVAS.width;
        let posy = Math.random()*GAME.CANVAS.height; 
    }
  }
  
  zombie = new Zombie_Sprite(posx,posy,100,100,"static/images/zombie.png");
}

// Called every frame
function update_game()
{

}

// Start the game
function start_game()
{
  CREATE_SPRITE_TIMER = setInterval(create_moving_sprite, 1000);
  hero = new Hero_sprite(400,400,50,50,"static/images/hero.gif");
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