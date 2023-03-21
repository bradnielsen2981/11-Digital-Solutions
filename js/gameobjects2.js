const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", onMouseUp);
exit = false;

//--------------------------------------------------------------------------
class Sprite
{
    constructor(x, y, width, height, image, rect) {
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
    }

    draw(canvas) {
      canvas.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() //do any logic
    {
    }

    mouseDown(x,y) //react to mouseDown
    {
      if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
        this.isDragging = true;
        this.offsetX = x - this.x;
        this.offsetY = y - this.y;
      }
    }

    mouseMove(x,y) //react to mouseMove
    {
      if (this.isDragging) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
      }
    }

    mouseUp(x,y) //react to mouseUp
    {
      if (this.isDragging)
      {
        alert("X: " + String(this.x) + " Y: " + String(this.y));
        this.isDragging = false;
      }
    }

}

//-------------------------------------------------------------------------

//EVENT HANDLING - check with all sprites
function onMouseDown(event) {
  for (sprite of SpriteList) {
    sprite.mouseDown(event.offsetX,event.offsetY);
  }
}

function onMouseMove(event) {
  for (sprite of SpriteList) {
    sprite.mouseMove(event.offsetX,event.offsetY);
  }
}

function onMouseUp(event) {
  for (sprite of SpriteList) {
    sprite.mouseUp(event.offsetX,event.offsetY);
  }
}

//-----------------------------------------------------------------------------

//animation
function animate() {
    if (exit == true) { return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (sprite of SpriteList) //draw all sprites
    {
      sprite.draw(ctx);
    }
    requestAnimationFrame(animate);
}


//GAME SET UP
SpriteList = []; //all sprites get added to SpriteList
for (i=0; i<10; i++)
{
    let x = Math.floor(Math.random()*600);
    let y = Math.floor(Math.random()*600);
    mySprite = new Sprite(x, y, 50, 50, "images/pig.png", ctx.getBoundingClientRect);
    SpriteList.push(mySprite);
}

animate();