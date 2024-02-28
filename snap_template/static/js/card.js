// A CLASS is a variable type that contains OTHER variables and functions.
// WHEN IT IS CREATED, ITS CALLED AN OBJECT!!!)
class Card
{
    constructor(x, y, width, height, card, cardback) { //a constructor is the function called when the OBJECT is created
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = cardback;
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
      
    }

    //on mouse down
    on_mouse_down(x,y) //on mouse down
    {

    }

    //on mouse move
    on_mouse_move(x,y) //on moving the mouse
    {

    }

    //on mouse up
    on_mouse_up(x,y)
    {
 
    }

    //on key down
    on_key_down(keycode, letter, keyspressed) //on key down
    {

    }

    on_key_up(keycode, letter) //on key up    {
    {

    }    

    destroy()
    {
      GAME.SPRITE_LIST.remove(this);
      //this = null; //why does this not work??
    }
}
