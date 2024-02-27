 class Grid_Sprite
{
    constructor(column, row, image, value) { //a constructor is the function called when the OBJECT is created
      
      let pos = GAME_ENGINE.get_GRID_x_y(column,row);
      this.x = pos.x;
      this.y = pos.y;
      this.image = new Image();
      this.image.src = image;
      this.width = GAME_ENGINE.get_square_GRID_width();
      this.height = GAME_ENGINE.get_square_GRID_height();
      this.isDragging = false; 
      this.offsetX = 0;
      this.offsetY = 0;
      GAME_ENGINE.SPRITE_LIST.push(this); //add to game sprite list
      GAME_ENGINE.GRID[row][column] = value; 
      this.value = value;
    }

    //draw the image - called every frame
    draw() {
      GAME_ENGINE.CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //do any logic - called every frame
    update()
    {

    }

    on_mouse_down(x,y) //on mouse down
    {
      if (GAME_ENGINE.sprite_collision_with_point(this, x, y)) {
        if (!this.isDragging)
        { 
          this.isDragging = true;
          //clear column and row
          let pos = GAME_ENGINE.get_GRID_row_column(x,y);
          let column = pos.column;
          let row = pos.row;
          GAME_ENGINE.GRID[row][column] = 0;
        }
        this.offsetX = x - this.x;
        this.offsetY = y - this.y;
      }
    }

    on_mouse_move(x,y) //on moving the mouse
    {
      if (this.isDragging) {
        
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
      }
    }

    on_mouse_up(x,y) //on mouse up
    {
      if (this.isDragging)
      {
        this.isDragging = false;
        
        //get the column and row, move the sprite to the square
        let pos = GAME_ENGINE.get_GRID_row_column(x,y);
        let column = pos.column;
        let row = pos.row;
        GAME_ENGINE.move_sprite_to_square(column, row, this);

        //update grid with sprite value
        GAME_ENGINE.GRID[row][column] = this.value;
        console.log(GAME_ENGINE.GRID);
      }
    }

    //on key down
    on_key_down(keycode, letter) //on key down
    {
      if (keycode == 32) { //key code for special keys
        console.log("Space was pressed");
      }
      else {
        if (letter == 'A') //if letter was used
        { 
          console.log("a was pressed");
        }
      } 
    }

    //destroy the sprite
    die()
    {
      GAME_ENGINE.SPRITE_LIST.remove(this);
      //this = null; //why does this not work
    }

}
