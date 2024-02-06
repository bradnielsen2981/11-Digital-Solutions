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
      this.speed = 5;
    }

    //draw the image - called every frame
    draw() {

      /* to rotate the sprite
          ctx.save(); // Save the current transformation matrix
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the sprite
      ctx.rotate(this.angle); // Rotate by the current angle
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the image centered at (0, 0)
      ctx.restore(); // Restore the previous transformation matrix
      */


      CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //do any logic - called every frame
    update()
    {
      //bounce off boundary
      reflect_sprite_off_boundary(this, CANVAS)

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

    set_random_vector() {
      // Scale speed components based on delta_time
      let h = Math.random()*2-1;
      let v = Math.random()*2-1;
      let vector = normalize_vector(h,v);
      this.hspeed = vector.x * this.speed * DELTA_TIME * 10;
      this.vspeed = vector.y * this.speed * DELTA_TIME * 10;
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
      SPRITE_LIST.remove(this);
      //this = null; //why does this not work??
    }
}
