piece = "";

tile1.onclick = function() {
  piece = new Grid_Sprite(0,0,'static/images/tile1.png',"village");
};

tile2.onclick = function() {
  piece = new Grid_Sprite(0,0,'static/images/tile2.png',"monastery");
};

tile3.onclick = function() {
  piece = new Grid_Sprite(0,0,'static/images/tile3.png',"road");
};

tile4.onclick = function() {
  piece = new Grid_Sprite(0,0,'static/images/tile4.png',"church");
};

// Called every frame
function update_game()
{
  GAME.draw_GRID();
}

// Start the game
function start_game()
{
  GAME.GRID = [[0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0]]
 
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