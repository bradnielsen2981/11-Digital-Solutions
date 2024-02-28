piece = "";

monastry.onclick = function() {
  piece = monastry;
  p = new Grid_Sprite(0,0,'static/images/monastry.png',"M");
  SPRITE_LIST.push(p);
  GRID[0][0] = "M";
  console.log(GRID);
};

// Called every frame
function update_game()
{
  GAME.draw_GRID();
}

// Start the game
function start_game()
{
  GAME.GRID = [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]]
  create_sprites();
}

// End the game
function end_game()
{

  //could move to another page
  //window.location.href = "menu.html";
}

GAME = new Game() //GAME ENGINER
GAME_CONTROLLER = new Game_Controller() //GAME ENGINE
GAME_CONTROLLER.start()