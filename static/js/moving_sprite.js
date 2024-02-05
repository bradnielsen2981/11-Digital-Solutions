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
      this.offsetX = 0;
      this.offsetY = 0; 
      this.hspeed = 0;
      this.vspeed = 0;
    }

    //draw the image - called every frame
    draw() {
      CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //do any logic - called every frame
    update()
    {
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
    keydown(keycode, letter) //on key down
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
      SPRITELIST.remove(this);
      //this = null; //why does this not work??
    }
}
