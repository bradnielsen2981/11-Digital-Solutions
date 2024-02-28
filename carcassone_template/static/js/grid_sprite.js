 class Grid_Sprite
{
    constructor(column, row, image, value) { //a constructor is the function called when the OBJECT is created
      
      let pos = GAME.get_GRID_x_y(column,row);
      this.x = pos.x;
      this.y = pos.y;
      this.image = new Image();
      this.image.src = image;
      this.angle = 0;
      this.width = GAME.get_square_GRID_width();
      this.height = GAME.get_square_GRID_height();
      this.isDragging = false; 
      this.offsetX = 0;
      this.offsetY = 0;
      GAME.SPRITE_LIST.push(this); //add to game sprite list
      GAME.GRID[row][column] = value; 
      this.value = value;
    }

    //draw the image - called every frame
    draw() {
      GAME.CTX.save(); // Save the current transformation matrix
      GAME.CTX.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the sprite
      GAME.CTX.rotate(this.angle); // Rotate by the current angle
      GAME.CTX.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image centered at (0, 0)
      GAME.CTX.restore(); // Restore the previous transformation matrix
    }

    //do any logic - called every frame
    update()
    {

    }

    on_mouse_down(x,y) //on mouse down
    {
      if (GAME.sprite_collision_with_point(this, x, y)) {
        if (!this.isDragging)
        { 
          this.isDragging = true;
          //clear column and row
          let pos = GAME.get_GRID_row_column(x,y);
          let column = pos.column;
          let row = pos.row;
          GAME.GRID[row][column] = 0;
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
        let pos = GAME.get_GRID_row_column(x,y);
        let column = pos.column;
        let row = pos.row;
        GAME.move_sprite_to_square(column, row, this);

        //update grid with sprite value
        GAME.GRID[row][column] = this.value;
        console.log(GAME.GRID);
      }
    }

    //on key down
    on_key_down(keycode, letter, keyspressed) //on key down
    {

    }

    //on key up
    on_key_up(keycode, letter)
    {

    }

    //destroy the sprite
    die()
    {
      GAME.SPRITE_LIST.remove(this);
      //this = null; //why does this not work
    }

}
