// get canvas 2D context object
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const GLOBALS = {
  mouse: { x: 0, y: 0 },
  dragOffset: { x: 0, y: 0 },
  char: { x: 0, y: 0, width: 50, height: 50 },
  events: {
    crash: []
  },
  addEventListener: function (e, c) {
    this.events[e].push(c);
  },
  dispatchEvent: function (e) {
    for (let i of this.events[e]) {
      i();
    }
  }
};

GLOBALS.addEventListener("crash", () => {
  alert("Crash detected!");
});

GLOBALS.addEventListener("crash", () => {
  alert("AHHH");
});

class Square {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.collisions = {
      pinkSquare: {
        conditions:
          "(char.x + char.width > x && char.x < x+width && char.y+char.height > y && char.y < y+height)",
        inContact: false
      }
    };
  }

  render() {
    let newColor = undefined;
    const { char } = GLOBALS;
    const { color, x, y, width, height, collisions } = this;

    /* COLLISION DETECTION LOGIC */

    // test each object in "this.collisions"

    for (let i in collisions) {
      if (eval(collisions[i].conditions)) {
        newColor = "red";
        if (!collisions.pinkSquare.inContact) GLOBALS.dispatchEvent("crash");
        collisions.pinkSquare.inContact = true;
        // call event
      } else {
        collisions.pinkSquare.inContact = false;
        newColor = undefined;
      }
    }

    ctx.beginPath();
    ctx.strokeStyle = newColor ?? color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
  }
}

const PROPS = [];
PROPS.push(
  new Square(
    window.innerWidth / 2 - 25,
    window.innerHeight / 2 - 25,
    "blue",
    50,
    50
  )
);

class Character extends Square {
  constructor(x, y, color, width, height) {
    super(x, y, color, width, height);
    this.offset = { x: 0, y: 0 };
  }
  render() {
    let { color, x, y, width, height, offset } = this;
    x = GLOBALS.mouse.x - GLOBALS.dragOffset.x;
    y = GLOBALS.mouse.y - GLOBALS.dragOffset.y;
    GLOBALS.char.x = x;
    GLOBALS.char.y = y;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
  }
}

const CHARS = [];
CHARS.push(new Character(10, 10, "pink", 50, 50));

// function for applying any initial settings
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function down(e) {
    GLOBALS.dragOffset.x = (e.pageX || e.touches[0]?.pageX) - GLOBALS.char.x;
    GLOBALS.dragOffset.y = (e.pageY || e.touches[0]?.pageY) - GLOBALS.char.y;
    GLOBALS.mouse.x = e.pageX || e.touches[0]?.pageX;
    GLOBALS.mouse.y = e.pageY || e.touches[0]?.pageY;
  }

  window.addEventListener("mousedown", down);
  window.addEventListener("touchstart", down);
  window.addEventListener("mousemove", (e) => {
    GLOBALS.mouse.x = e.pageX;
    GLOBALS.mouse.y = e.pageY;
  });
  window.addEventListener("touchmove", (e) => {
    GLOBALS.mouse.x = e.touches[0].pageX;
    GLOBALS.mouse.y = e.touches[0].pageY;
  });
}

// function for rendering background elements
function renderBackground() {}

// function for rendering prop objects in PROPS

function renderProps() {
  for (let i in PROPS) PROPS[i].render();
}

// function for rendering character objects in CHARS
function renderCharacters() {
  for (let i in CHARS) CHARS[i].render();
}

// function for rendering onscreen controls
function renderControls() {}

// main function to be run for rendering frames
function startFrames() {
  // erase entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // render each type of entity in order, relative to layers
  renderBackground();
  renderProps();
  renderCharacters();
  renderControls();

  // rerun function (call next frame)
  window.requestAnimationFrame(startFrames);
}

init(); // initialize game settings
startFrames(); // start running frames