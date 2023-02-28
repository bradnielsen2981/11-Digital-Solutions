alert("Loaded");


class GameObject {
    constructor(x, y, sprite) {
      this.x = x;
      this.y = y;
      this.sprite = sprite;
    }
  
    draw(ctx) {
      // Draw the sprite on the canvas at the object's position
      console.log("DRAW");
      ctx.drawImage(this.sprite, this.x, this.y);
    }

    
    update() {
      this.x = this.x + 1;
      this.y = this.y + 1;
    }

  }

class ClickableObject extends GameObject {
    constructor(x, y, sprite) {
      console.log("Created");
      super(x, y, sprite);
    }
  
    handleClick(mouseX, mouseY) {
      // Check if the mouse click was inside the sprite
      if (mouseX > this.x && mouseX < this.x + this.sprite.width &&
          mouseY > this.y && mouseY < this.y + this.sprite.height) {
        alert('Object clicked!');
      }
    }
  
    bindClickEvent(canvas) {
      // Bind a click event listener to the canvas for the object
      canvas.addEventListener('click', (event) => {
        // Get the mouse position relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
  
        // Call the handleClick method with the mouse position
        this.handleClick(mouseX, mouseY);
      });
      
    }

  }

  // Load the sprite image
const sprite = new Image();
sprite.src = 'images/pig.png';

// Create a game object instance with the sprite
//const gameObject = new GameObject(130, 100, sprite);

// Create a clickable game object instance with the sprite
const clickableObject = new ClickableObject(130, 100, sprite);

// Bind the click event to the canvas element
const canvas = document.getElementById('myCanvas');
clickableObject.bindClickEvent(canvas);
ctx = canvas.getContext('2d');

//start game loop
setInterval(gameloop, 10);

function gameloop()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clickableObject.draw(ctx);
  clickableObject.update();
}

