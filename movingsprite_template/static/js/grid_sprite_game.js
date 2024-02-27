
//great a list of grid_sprites
function create_sprites() {
  //Create all the sprites
  for (i=0; i<10; i++)
  {
      let column = Math.floor(Math.random()*GAME_ENGINE.GRID[0].length);
      let row = Math.floor(Math.random()*GAME_ENGINE.GRID.length);

      while (GAME_ENGINE.GRID[row][column] != 0)
      {
          column = Math.floor(Math.random()*GAME_ENGINE.GRID[0].length);
          row = Math.floor(Math.random()*GAME_ENGINE.GRID.length);
      }
      
      mySprite = new Grid_Sprite(column,row,"static/images/pig.png", 1); //Create a new Sprite
  } 
}

// Start the game
function start_game()
{

  GAME_ENGINE.GRID = [[0,0,0,0],
                      [0,0,0,0],
                      [0,0,0,0],
                      [0,0,0,0]];

  //CREATE_SPRITE_TIMER = setInterval(create_moving_sprite, 2000);
  create_sprites();
}

// Update the game each frame
function update_game()
{

}

//End the game
function end_game()
{
  //could move to another page
  //window.location.href = "menu.html";
}

GAME_ENGINE = new Game_Engine()
GAME_ENGINE.start();
