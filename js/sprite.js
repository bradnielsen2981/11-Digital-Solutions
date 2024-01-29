//A CLASS is a variable type that contains OTHER variables and functions (WHEN IT IS CREATED, ITS CALLED AN OBJECT!!!)
class Sprite
{
    constructor(x, y, width, height, image, rect) { //a constructor is the function called when the OBJECT is created
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.boundary = rect;
      this.image = new Image();
      this.image.src = image;
      this.isDragging = false; 
      this.offsetX = 0;
      this.offsetY = 0; 
      this.hspeed = 0;
      this.vspeed = 0;
    }

    //draw the image - called every frame
    draw(canvas) {
      canvas.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //do any logic - called every frame
    update(canvas)
    {
      this.x += this.hspeed;
      this.y += this.vspeed;
    }

    mouseDown(x,y) //on mouse down
    {
      if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
        this.isDragging = true;
        this.offsetX = x - this.x;
        this.offsetY = y - this.y;
      }
    }

    mouseMove(x,y) //on moving the mouse
    {
      if (this.isDragging) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
      }
    }

    mouseUp(x,y) //on mouse up
    {
            //align with BOARD
      column*squarewidth,row*squareheight;

      column = Math.trunc(event.offsetX/squarewidth);
      row = Math.trunc(event.offsetY/squareheight);

      console.log("ROW: " + String(row) + " COLUMN: " + String(column));


      if (this.isDragging)
      {
        sprite.x = x; //align sprite after mouse up - comment out if you want precise positioning
        sprite.y = y; //align sprite after mouse up - comment out if you want precise positioning
        this.isDragging = false;
      }
    }

    keydown(keycode, letter) //on key down
    {
      if (keycode == 32) { // space bar
        this.y += 1;
      }
      else {
        if (letter == 'A')
          { this.hspeed = -1; }
        else if (letter == 'D')
          { this.hspeed = 1; }
      } 
    }

}
