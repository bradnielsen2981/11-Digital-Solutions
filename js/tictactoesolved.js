alert("Loaded");

// Select the canvas element from the HTML page
canvas = document.getElementById('board');
// Create a 2D drawing context
ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
lineWidth = 5;
start = true;
player = 0;

// A board in javascript
grid = [[0,0,0],
        [0,0,0],
        [0,0,0]]

//Begin drawing the circle
function draw_circle(x,y)
{
    x = x + 100;
    y = y + 100;
    ctx.strokeStyle = 'green';
    radius = 50;
    startAngle = 0;
    endAngle = 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
}

// Begin drawing the square
function draw_square(x, y)
{
    ctx.strokeStyle = 'black';
    size = 200;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.stroke();
}

// Begin drawing a cross
function draw_cross(x,y)
{
    ctx.strokeStyle = 'red';
    centerX = x + 100;
    centerY = y + 100;

    // Draw the first line at a 45-degree angle
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY - 50);
    ctx.lineTo(centerX + 50, centerY + 50);
    ctx.stroke();

    // Draw the second line at a 45-degree angle
    ctx.beginPath();
    ctx.moveTo(centerX + 50, centerY - 50);
    ctx.lineTo(centerX - 50, centerY + 50);
    ctx.stroke();
}

//draws the game data
function drawboard(grid)
{
    console.log(grid);
    for (row=0; row < 3; row++)
    {
        for (column=0; column < 3; column++) 
        {
            if (start) //when first starting the game draw the squares
            {
                draw_square(column*200,row*200);
                space = String(column) + String(row);                  
            }

            if (grid[row][column] == 1)
            {
                draw_circle(column*200,row*200);
            } else if (grid[row][column] == 2)
            {
                draw_cross(column*200,row*200);
            }
        }
    }
    if (start)
    {
        start = false;
    }
}

drawboard(grid);

// Add a click event listener to the canvas
canvas.addEventListener('click', function(event) {
    // Get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    for (row=0; row < 3; row++)
    {
        for (column=0; column < 3; column++) 
        {
            // Check if the mouse click was inside the square
            if (mouseX > column*200 && mouseX < (column+1)*200 && mouseY > row*200 && mouseY < (row+1)*200) {
                grid[row][column] = player + 1;

                player = (player + 1)%2

            }
        }
    }
    drawboard(grid);

  });