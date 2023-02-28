alert("Loaded");

canvas = document.getElementById('board');
context = canvas.getContext('2d');
context.lineWidth = 5;

function draw_square(x,y)
{
    context.beginPath();
    context.rect(x, y, 200, 200);
    context.strokeStyle = 'black';
    context.stroke();
}

function draw_circle(x,y)
{
    context.beginPath();
    context.arc(x+100, y+100, 75, 0, 2*Math.PI);
    context.strokeStyle = 'green';
    context.stroke();
}

function draw_cross(x,y)
{
    context.strokeStyle = 'red';
    centerX = x + 100;
    centerY = y + 100;
    // Draw the first line at a 45-degree angle
    context.beginPath();
    context.moveTo(centerX - 50, centerY - 50);
    context.lineTo(centerX + 50, centerY + 50);
    context.stroke();
    // Draw the second line at a 45-degree angle
    context.beginPath();
    context.moveTo(centerX + 50, centerY - 50);
    context.lineTo(centerX - 50, centerY + 50);
    context.stroke();
}

draw_square(0,0);
draw_circle(100,100);
draw_cross(200,200);
