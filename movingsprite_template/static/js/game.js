//THIS IS THE GAME_ENGINE
class Game
{
  //GLOBAL GAME VARIABLES--------------------------------------------
  constructor() 
  { 
    this.SPRITE_LIST = []; //global spritelist
    this.GRID = []; //if there is a this.GRID in the game
    this.CANVAS = document.getElementById("gamecanvas");
    this.EXIT = false; //when ready to exit game
    this.STARTTIME = 0;
    this.LAST_FRAME_TIME = 0;
    this.DELTA_TIME = 0; //the elapsed time between frames
    this.TIME = 0; //actual game time
    this.PLAYER1_HEALTH = 0; //health of player
    this.PLAYER2_HEALTH = 0; //health of player
    this.PLAYER1_SCORE = 0;
    this.PLAYER2_SCORE = 0; 
    this.TURN = 1;
    this.MOUSEX = 0;
    this.MOUSEY = 0;
  }

  //GLOBAL GAME FUNCTIONS--------------------------------------------
  //detects if the sprite has collided with a point e.g. is the mouse cursor on the sprite
  sprite_collision_with_point(sprite1, x, y)
  {
      return (
        x >= sprite1.x &&
        x <= sprite1.x + sprite1.width &&
        y >= sprite1.y &&
        y <= sprite1.y + sprite1.height
      );
  }

  //TODO: check for collision between two sprites containing transparent pixels


  // Check for the collision between two sprites
  sprite_collision_with_sprite(sprite1, sprite2) {

    // Expand or shrink the collision area by the margin
    const expandedSprite1 = {
      x: sprite1.x - sprite1.margin,
      y: sprite1.y - sprite1.margin,
      width: sprite1.width + sprite1.margin * 2,
      height: sprite1.height + sprite1.margin * 2,
    };

    const expandedSprite2 = {
      x: sprite2.x - sprite2.margin,
      y: sprite2.y - sprite2.margin,
      width: sprite2.width + sprite2.margin * 2,
      height: sprite2.height + sprite2.margin * 2,
    };

    // Check for collision between the expanded sprite1 and sprite2
    let result = (
      expandedSprite1.x <= expandedSprite2.x + expandedSprite2.width &&
      expandedSprite1.x + expandedSprite1.width >= expandedSprite2.x &&
      expandedSprite1.y <= expandedSprite2.y + expandedSprite2.height &&
      expandedSprite1.y + expandedSprite1.height >= expandedSprite2.y
    );

    return result;
  }

  //detect a collision between a sprite and a group. Return the other sprite.
  sprite_collision_with_spritelist(sprite1, spritelist)
  {
    for (let i = 0; i < spritelist.length; i++) {
      if (spritelist[i] !== sprite1) {
          if (this.sprite_collision_with_sprite(sprite1, spritelist[i]))
          {
            return spritelist[i];
          }
      }
    }
    return null;
  }

  // align the sprite with angle with the direction its travelling in 
  align_sprite_angle_with_direction(sprite1) {
    // Calculate the angle of the direction vector
    sprite1.angle = Math.atan2(sprite1.vspeed, sprite1.hspeed);
  }

  //align the sprite to face the point
  align_sprite_to_face_point(sprite1, x, y) {
    // Calculate angle in radians
    sprite1.angle = Math.atan2(y - sprite1.y, x - sprite1.x);
  }

  // Set a random direction
  set_sprite_random_direction(sprite1) {
    // Scale speed components based on delta_time
    let h = Math.random()*2-1;
    let v = Math.random()*2-1;
    let vector = this.normalize_vector(h,v);
    sprite1.hspeed = vector.x * sprite1.speed * this.DELTA_TIME * 10;
    sprite1.vspeed = vector.y * sprite1.speed * this.DELTA_TIME * 10;
  }

  //reflect the sprite off the boundary
  reflect_sprite_off_boundary(sprite1, canvas) {
    if (sprite1.x < 0 || sprite1.x + sprite1.width > canvas.width) {
      sprite1.hspeed *= -1; // Reverse hspeed if outside horizontally
    }
    if (sprite1.y < 0 || sprite1.y + sprite1.height > canvas.height) {
      sprite1.vspeed *= -1; // Reverse vspeed if outside vertically
    }
  }

  // Check if any part of the sprite is outside the this.CANVAS boundaries
  detect_if_sprite_outside_CANVAS(sprite1) {
    
    return (
      sprite1.x < 0 ||
      sprite1.x + sprite1.width > this.CANVAS.width ||
      sprite1.y < 0 ||
      sprite1.y + sprite1.height > this.CANVAS.height
    );
  }

  //detect distance between two sprites
  get_distance_between_sprites(sprite1, sprite2)
  {
    const dx = sprite2.x - sprite1.x;
    const dy = sprite2.y - sprite1.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  get_direction_vector_to_sprite(sprite1, othersprite)
  {
    const dx = othersprite.x - sprite1.x;
    const dy = othersprite.y - sprite1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { x: dx/distance, y: dy/distance }; //returns a vector object vector.x, vector.y
  }

  //get the normalised vector e.g a vector with a distance of 1
  normalize_vector(h,v) {
    const magnitude = Math.sqrt(h*h + v*v);
    if (magnitude !== 0) {
      return {
        x: h / magnitude,
        y: v / magnitude
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }

  set_direction_of_sprite_to_point(sprite1, x, y) {
    // Calculate direction vector
    let dx = x - sprite1.x;
    let dy = y - sprite1.y;

    // Calculate distance
    let distance = Math.sqrt(dx*dx + dy*dy);

    // Normalize direction vector
    let dirX = dx / distance;
    let dirY = dy / distance;

    // Set sprite's hspeed and vspeed
    sprite1.hspeed = dirX;
    sprite1.vspeed = dirY;
  }

  // GRID FUNCTIONS //---------------------------------------

  //align the sprite to this.GRID square
  align_sprite_to_square(sprite1) {
    // Calculate the size of a this.GRID square
    const squareWidth = this.CANVAS.width / this.GRID[0].length;;
    const squareHeight = this.CANVAS.height / this.GRID.length;

    // Calculate the this.GRID square index for the sprite's position
    const GRIDColumn = Math.floor(sprite1.x / squareWidth);
    const GRIDRow = Math.floor(sprite1.y / squareHeight);

    // Calculate the top-left corner of the this.GRID square
    const squareX = GRIDColumn * squareWidth;
    const squareY = GRIDRow * squareHeight;

    // Update the sprite's position to align with the this.GRID square
    sprite1.x = squareX;
    sprite1.y = squareY;
  }

  //get the x and y coordinates for this.GRID corresponding to the column and row
  get_GRID_x_y(column, row) {

    // Calculate the size of a this.GRID square
    const squareWidth = this.CANVAS.width / this.GRID[0].length;
    const squareHeight = this.CANVAS.height / this.GRID.length;

    // Calculate the position for the specified column and row
    const x = column*squareWidth;
    const y = row*squareHeight;

    // Return the position as an object
    let pos = { x, y };
    return pos
  }

  //get column and row based on the x and y
  get_GRID_row_column(x, y) {

    // Calculate the size of a this.GRID square
    const squareWidth = this.CANVAS.width / this.GRID[0].length;
    const squareHeight = this.CANVAS.height / this.GRID.length;

    // Calculate the row and column based on the x and y coordinates
    const column = Math.floor(x / squareWidth);
    const row = Math.floor(y / squareHeight);

    // Return the row and column as an object
    let pos = { column, row };
    return pos;
  }

  //move sprite to square
  move_sprite_to_square(column, row, sprite) {
    // Calculate the size of a this.GRID square
    const squareWidth = this.CANVAS.width / this.GRID[0].length;
    const squareHeight = this.CANVAS.height / this.GRID.length;

    // Calculate the position for the specified column and row
    const x = column*squareWidth;
    const y = row*squareHeight;

    // Set the sprite position
    sprite.x = x;
    sprite.y = y;
  }

  //is the sprite in the centre of a square
  is_sprite_in_centre_of_square(sprite1) {
    // Calculate the center of the sprite
    const spriteCenterX = sprite1.x + sprite1.width / 2;
    const spriteCenterY = sprite1.y + sprite1.height / 2;

    // Calculate the size of a this.GRID square
    const squareWidth = this.CANVAS.width / this.GRID[0].length;
    const squareHeight = this.CANVAS.height / this.GRID.length;

    // Calculate the this.GRID square index for the sprite's center
    const GRIDColumn = Math.floor(spriteCenterX / squareWidth);
    const GRIDRow = Math.floor(spriteCenterY / squareHeight);

    // Calculate the center of the this.GRID square
    const squareCenterX = (GRIDColumn + 0.5) * squareWidth;
    const squareCenterY = (GRIDRow + 0.5) * squareHeight;

    // Check if the sprite's center is within a margin of error from the this.GRID square center
    const margin = 0.1*squareWidth; // Adjust this value as needed
    const inCentreX = Math.abs(spriteCenterX - squareCenterX) < squareWidth * margin;
    const inCentreY = Math.abs(spriteCenterY - squareCenterY) < squareHeight * margin;

    return inCentreX && inCentreY;
  }

  //if there is GRID, get the height of a square
  get_square_GRID_height()
  {
    return this.CANVAS.height/this.GRID.length;
  }

  //if there is a GRID, get the width of a square
  get_square_GRID_width()
  {
    return this.CANVAS.width/this.GRID[0].length;
  }

  // Draw square
  draw_square(x,y,width,height)
  {
    this.CTX.beginPath();
    this.CTX.rect(x*width, y*height, width, height);
    this.CTX.strokeStyle = 'black';
    this.CTX.stroke();
  }

  // Draw a grid
  draw_GRID()
  {
    width = get_square_GRID_width()
    height = get_square_GRID_height()

    for (row=0; row < this.GRID.length; row++)  
    {
      for (col=0; col < this.GRID[row].length; col++)
      { 
          draw_square(col,row,width,height); //draws a black square
      }
    }
  }

} //close game engine

//removes an item from an array - used for removing sprites from sprite list
Array.prototype.remove = function(item) {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] === item) {
      this.splice(i, 1);
    }
  }
};


