// A CLASS is a variable type that contains OTHER variables and functions.
// WHEN IT IS CREATED, ITS CALLED AN OBJECT!!!)
class Zombie_Sprite
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
      this.speed = 1;
      this.margin = -2; //the margin for detecting collision - collision mask has not yet been implemented
      GAME.SPRITE_LIST.push(this); //add to game sprite list
    }

    //draw the image - called every frame and rotate
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
      //this.angle = this.angle + 0.05;
      if (HERO)
      {
        let vec = GAME.get_direction_vector_to_sprite(this, HERO);
        this.hspeed = vec.x;
        this.vspeed = vec.y;
      }

      this.x += this.hspeed*this.speed;
      this.y += this.vspeed*this.speed;
      
      GAME.reflect_sprite_off_boundary(this, GAME.CANVAS);
    }

    //on mouse down
    on_mouse_down(x,y) //on mouse down
    {
      if (GAME.sprite_collision_with_point(this, x, y))
      {
        this.destroy();
      }
    }

    //on mouse move
    on_mouse_move(x,y) //on moving the mouse
    {
      if (GAME.sprite_collision_with_point(this, x, y)) //if mouse moves over sprite
      {
      }
    }

    //on mouse up
    on_mouse_up(x,y)
    {
      if (GAME.sprite_collision_with_point(this, x, y))  //if mouse up on sprite
      {         
      }
    }

    //on key down
    on_key_down(keycode, letter, keyspressed) //on key down
    {
      
    }

    on_key_up(keycode, letter)
    {
      
    }

    destroy()
    {
      GAME.SPRITE_LIST.remove(this);
      //this = null; //why does this not work??
    }
}
