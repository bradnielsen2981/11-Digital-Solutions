//SPECIFIC GAME GLOBALS

//create a random sprite
function create_moving_sprite()
{
  
  s = new Moving_Sprite(posx,posy,100,100,"static/images/pig.png");
  set_sprite_random_direction(s);
}

// Called every frame
function update_game()
{

}

// Start the game
function start_game()
{
  CREATE_SPRITE_TIMER = setInterval(create_card, 2000);
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