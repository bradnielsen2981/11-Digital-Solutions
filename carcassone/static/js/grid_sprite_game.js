
//great a list of grid_sprites
function create_sprites() {
  //Create all the sprites
  for (i=0; i<10; i++)
  {
      let column = Math.floor(Math.random()*GAME.GRID[0].length);
      let row = Math.floor(Math.random()*GAME.GRID.length);

      while (GAME.GRID[row][column] != 0)
      {
          column = Math.floor(Math.random()*GAME.GRID[0].length);
          row = Math.floor(Math.random()*GAME.GRID.length);
      }
      
      mySprite = new Grid_Sprite(column,row,"static/images/pig.png", 1); //Create a new Sprite
  } 
}

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