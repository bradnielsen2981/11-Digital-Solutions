//GLOBAL GAME VARIABLES--------------------------------------------
GAME_STATUS = "Ready"
SPRITE_LIST = []; //global spritelist
GRID = []; //if there is a GRID in the game
CANVAS = null;
CTX = null; //the context for drawing
EXIT = false; //when ready to exit game
STARTTIME = 0;
LAST_FRAME_TIME = 0;
DELTA_TIME = 0; //the elapsed time between frames
TIME = 0; //actual game time
PLAYER1_HEALTH = 0; //health of player
PLAYER2_HEALTH = 0; //health of player
PLAYER1_SCORE = 0;
PLAYER2_SCORE = 0; 
TURN = 1;

//GLOBAL GAME FUNCTIONS--------------------------------------------
//detects if the sprite has collided with a point e.g. is the mouse cursor on the sprite
function sprite_collision_with_point(sprite, x, y)
{
    return (
      x >= sprite.x &&
      x <= sprite.x + sprite.width &&
      y >= sprite.y &&
      y <= sprite.y + sprite.height
    );
}

//TODO: check for collision between two sprites containing transparent pixels


// Check for the collision between two sprites
function sprite_collision_with_sprite(sprite1, sprite2, margin) {
  // Expand or shrink the collision area by the margin
  const expandedSprite1 = {
    x: sprite1.x - margin,
    y: sprite1.y - margin,
    width: sprite1.width + margin * 2,
    height: sprite1.height + margin * 2,
  };

  // Check for collision between the expanded sprite1 and sprite2
  return (
    expandedSprite1.x < sprite2.x + sprite2.width &&
    expandedSprite1.x + expandedSprite1.width > sprite2.x &&
    expandedSprite1.y < sprite2.y + sprite2.height &&
    expandedSprite1.y + expandedSprite1.height > sprite2.y
  );
}

//detect a collision between a sprite and a group. Return the other sprite.
function sprite_collision_with_spritelist(sprite, spritelist)
{
  for (let i = 0; i < spritelist.length; i++) {
    if (spritelist[i] !== sprite) {
        if (sprite_collision_with_sprite(sprite, spritelist[i]))
        {
          return spritelist[i];
        }
    }
  }
  return null;
}

// Check if any part of the sprite is outside the CANVAS boundaries
function detect_if_sprite_outside_CANVAS(sprite) {
  
  return (
    sprite.x < 0 ||
    sprite.x + sprite.width > CANVAS.width ||
    sprite.y < 0 ||
    sprite.y + sprite.height > CANVAS.height
  );
}

//align the sprite to GRID square
function align_sprite_to_square(sprite) {
  // Calculate the size of a GRID square
  const squareWidth = CANVAS.width / GRID[0].length;;
  const squareHeight = CANVAS.height / GRID.length;

  // Calculate the GRID square index for the sprite's position
  const GRIDColumn = Math.floor(sprite.x / squareWidth);
  const GRIDRow = Math.floor(sprite.y / squareHeight);

  // Calculate the top-left corner of the GRID square
  const squareX = GRIDColumn * squareWidth;
  const squareY = GRIDRow * squareHeight;

  // Update the sprite's position to align with the GRID square
  sprite.x = squareX;
  sprite.y = squareY;
}

//get the x and y coordinates for GRID corresponding to the column and row
function get_GRID_x_y(column, row) {

  // Calculate the size of a GRID square
  const squareWidth = CANVAS.width / GRID[0].length;
  const squareHeight = CANVAS.height / GRID.length;

  // Calculate the position for the specified column and row
  const x = column*squareWidth;
  const y = row*squareHeight;

  // Return the position as an object
  let pos = { x, y };
  return pos
}

//get column and row based on the x and y
function get_GRID_row_column(x, y) {

  // Calculate the size of a GRID square
  const squareWidth = CANVAS.width / GRID[0].length;
  const squareHeight = CANVAS.height / GRID.length;

  // Calculate the row and column based on the x and y coordinates
  const column = Math.floor(x / squareWidth);
  const row = Math.floor(y / squareHeight);

  // Return the row and column as an object
  let pos = { column, row };
  return pos;
}

//move sprite to square
function move_sprite_to_square(column, row, sprite) {
  // Calculate the size of a GRID square
  const squareWidth = CANVAS.width / GRID[0].length;
  const squareHeight = CANVAS.height / GRID.length;

  // Calculate the position for the specified column and row
  const x = column*squareWidth;
  const y = row*squareHeight;

  // Set the sprite position
  sprite.x = x;
  sprite.y = y;
}
//is the sprite in the centre of a square
function is_sprite_in_centre_of_square(sprite) {
  // Calculate the center of the sprite
  const spriteCenterX = sprite.x + sprite.width / 2;
  const spriteCenterY = sprite.y + sprite.height / 2;

  // Calculate the size of a GRID square
  const squareWidth = CANVAS.width / GRID[0].length;
  const squareHeight = CANVAS.height / GRID.length;

  // Calculate the GRID square index for the sprite's center
  const GRIDColumn = Math.floor(spriteCenterX / squareWidth);
  const GRIDRow = Math.floor(spriteCenterY / squareHeight);

  // Calculate the center of the GRID square
  const squareCenterX = (GRIDColumn + 0.5) * squareWidth;
  const squareCenterY = (GRIDRow + 0.5) * squareHeight;

  // Check if the sprite's center is within a margin of error from the GRID square center
  const margin = 0.1*squareWidth; // Adjust this value as needed
  const inCentreX = Math.abs(spriteCenterX - squareCenterX) < squareWidth * margin;
  const inCentreY = Math.abs(spriteCenterY - squareCenterY) < squareHeight * margin;

  return inCentreX && inCentreY;
}

//if there is GRID, get the height of a square
function get_square_GRID_height()
{
  return CANVAS.height/GRID.length;
}

//if there is a GRID, get the width of a square
function get_square_GRID_width()
{
  return CANVAS.width/GRID[0].length;
}

//detect distance between two sprites
function get_distance_between_sprites(sprite1, sprite2)
{
  const dx = sprite2.x - sprite1.x;
  const dy = sprite2.y - sprite1.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function get_direction_vector_to_sprite(sprite, othersprite)
{
  const dx = othersprite.x - sprite.x;
  const dy = othersprite.y - sprite.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return { x: dx/distance, y: dy/distance }; //returns a vector object vector.x, vector.y
}

//removes an item from an array - used for removing sprites from sprite list
Array.prototype.remove = function(item) {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] === item) {
      this.splice(i, 1);
    }
  }
};

// Draw square
function draw_square(x,y,width,height)
{
    CTX.beginPath();
    CTX.rect(x*width, y*height, width, height);
    CTX.strokeStyle = 'black';
    CTX.stroke();
}

// Draw a grid
function draw_grid()
{
  width = get_square_GRID_width()
  height = get_square_GRID_height()

  for (row=0; row < GRID.length; row++)  
  {
    for (col=0; col < GRID[row].length; col++)
    { 
        draw_square(col,row,width,height); //draws a black square
    }
  }
}

// on mouse down on canvas
function on_mouse_down(event) {
  for (sprite of SPRITE_LIST) {
    sprite.on_mouse_down(event.offsetX,event.offsetY);
  }
}

// on mouse move event on canvas
function on_mouse_move(event) {
  for (sprite of SPRITE_LIST) {
    sprite.on_mouse_move(event.offsetX,event.offsetY);
  }
}

// on mouse down event on canvas
function on_mouse_up(event) {
  
  for (sprite of SPRITE_LIST) {
    sprite.on_mouse_up(event.offsetX,event.offsetY);
  }
}

// on key down event during game
function on_key_down(event) {
  for (sprite of SPRITE_LIST) {
    letter = String.fromCharCode(event.keyCode);
    sprite.on_key_down(event.keyCode, letter);
  } 
}

