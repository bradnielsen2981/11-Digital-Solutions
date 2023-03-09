alert("Loaded");

canvas = document.getElementById('board');
context = canvas.getContext('2d');
context.lineWidth = 5;
turns = 1

function draw_square(x,y)
{
    context.beginPath();
    context.rect(x*200, y*200, 200, 200);
    context.strokeStyle = 'black';
    context.stroke();
}

function draw_circle(x,y)
{
    x = x*200;
    y = y*200;
    context.beginPath();
    context.arc(x+100, y+100, 75, 0, 2*Math.PI);
    context.strokeStyle = 'green';
    context.stroke();
}

function draw_cross(x,y)
{
    x = x*200;
    y = y*200;
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

function draw_board()
{
    for (row=0; row < board.length; row++)  
    {
        for (col=0; col < board[row].length; col++)
        { 
            draw_square(col,row);
            if (board[row][col] == 1)
            {
                draw_circle(col,row);
            }
            else if (board[row][col] == 2)
            {
                draw_cross(col,row);
            }
        }
    }
}

board = [[0,0,0],
         [0,0,0],
         [0,0,0]];
draw_board(board);
player = 0;

// Add a click event listener to the canvas
canvas.onclick = function(event) 
{
    // Get the mouse position relative to the canvas
    rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    
    x = Math.trunc(mouseX / 200);
    y = Math.trunc(mouseY / 200);

    if (player == 0) //player 1
    {
        draw_circle(x,y);
        board[y][x] = 1;
    } else if (player == 1) //player 2
    {
        draw_cross(x,y);
        board[y][x] = 2;
    }
    player = (player + 1)%2; //get remainder after division

    v = victory(); 
    if (v == 1)
    {
        alert("Player 1 wins!");
    } else if (v == 2)
    {
        alert("Player 2 wins!");
    } else if (v == 0 && turns == 9)
    {
        alert("Draw!")
    } 

    turns = turns + 1;
}

//PSEUDOCODE FIRST - BOARD - ROWS, COLUMNS, DIAGONALS
function victory()
{
    columnsum = [1,1,1];
    for (row=0; row < board.length; row++)
    {
        rowsum = 1;
        for (col=0; col<board[row].length; col++)
        {
            rowsum = rowsum*board[row][col];
            columnsum[col] = columnsum[col] * board[row][col];
        }
        if (rowsum == 1)
        {
            return 1; //exit the function
        } else if (rowsum == 8)
        { 
            return 2; //exit the function
        }
    }
    for (i=0; i<columnsum.length; i++)
    {
        if (columnsum[i] == 1)
        {
            return 1;
        }
        else if (columnsum[i] == 8)
        {
            return 1;
        }
    }

    diagonal2 = board[2][0]*board[1][1]*board[0][2];
    diagonal1 = board[0][0]*board[1][1]*board[2][2];
    if (diagonal1 == 1 || diagonal2 == 1)
    {
        return 1
    } else if (diagonal1 == 8 || diagonal2 == 8)
    {
        return 2
    }

    return 0
}

