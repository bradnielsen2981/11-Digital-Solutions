// A CLASS is a variable type that contains OTHER variables and functions.
// WHEN IT IS CREATED, ITS CALLED AN OBJECT!!!)
class Moving_Sprite
{
    constructor(x, y, width, height, image) { //a constructor is the function called when the OBJECT is created
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = image;
      this.hspeed = 0;
      this.vspeed = 0;
      this.angle = 0;
      this.speed = 5;
      this.margin = -2;
    }

    //draw the image - called every frame and rotate
    draw() {
      CTX.save(); // Save the current transformation matrix
      CTX.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the sprite
      CTX.rotate(this.angle); // Rotate by the current angle
      CTX.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image centered at (0, 0)
      CTX.restore(); // Restore the previous transformation matrix
    }

    //do any logic - called every frame
    update()
    {
      //this.angle = this.angle + 0.05;

      this.x += this.hspeed;
      this.y += this.vspeed;

      //check for collision between sprites
      let othersprite = sprite_collision_with_spritelist(this, SPRITE_LIST);
      if (othersprite != null)
      {
        console.log("Collision between sprites was detected.")
        //SPRITELIST.remove(this); //remove the sprite from the list of sprites being drawn, rendered
        //SPRITELIST.remove(othersprite);
      }
    }

    //on mouse down
    on_mouse_down(x,y) //on mouse down
    {
      if (sprite_collision_with_point(this, x, y))
      {
        console.log("You clicked me.");
      }
    }

    //on mouse move
    on_mouse_move(x,y) //on moving the mouse
    {
      if (sprite_collision_with_point(this, x, y)) //if mouse moves over sprite
      {
        console.log("You hovered over me.");
      }
    }

    //on mouse up
    on_mouse_up(x,y)
    {
      if (sprite_collision_with_point(this, x, y))  //if mouse up on sprite
      {         
        console.log("You released mouse on me.");
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

    destroy()
    {
      SPRITE_LIST.remove(this);
      //this = null; //why does this not work??
    }
}
