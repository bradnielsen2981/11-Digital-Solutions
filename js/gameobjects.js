alert("NEW");

//A Draggable object
class Draggable {
  constructor(canvas, image) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = image;
    this.isDragging = false;
    this.rect = this.canvas.getBoundingClientRect();
    this.mouseX = 0;
    this.mouseY = 0;
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  handleMouseDown(event) {
    this.mouseX = event.clientX - this.rect.left; //get mouse coordinates
    this.mouseY = event.clientY - this.rect.top;
    alert(this.mouseX);

    if (this.mouseX > this.x && this.mouseX < this.x + this.width &&
      this.mouseY > this.y && this.mouseY < this.y + this.height) {
        this.isDragging = true;
        alert("DRAGGABLE!!!!");
    }
    this.canvas.style.cursor = "grabbing";
  }

  handleMouseMove(event) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.rect.left - this.mouseX;
      const deltaY = event.clientY - this.rect.top - this.mouseY;
      this.x += deltaX;
      this.y += deltaY;
      this.mouseX = event.clientX - this.rect.left;
      this.mouseY = event.clientY - this.rect.top;
      //this.draw();
    }
  }

  handleMouseUp() {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
  }

  get x() {
    return this._x || 0;
  }

  set x(value) {
    this._x = value;
    //this.draw();
  }

  get y() {
    return this._y || 0;
  }

  set y(value) {
    this._y = value;
    //this.draw();
  }

  get width() {
    return this._width || this.image.width;
  }

  set width(value) {
    this._width = value;
    //this.draw();
  }

  get height() {
    return this._height || this.image.height;
  }

  set height(value) {
    this._height = value;
    //this.draw();
  }
}

// Usage
const canvas = document.getElementById('myCanvas');

const draggables = [];


const image = new Image();
image.src = 'images/pig.png';
image.onload = function() {
    const draggable = new Draggable(canvas, image);
    draggable.x = Math.random() * canvas.width;
    draggable.y = Math.random() * canvas.height;
    draggable.width = Math.floor(Math.random() * 100) + 50;
    draggable.height = Math.floor(Math.random() * 100) + 50;
  };


