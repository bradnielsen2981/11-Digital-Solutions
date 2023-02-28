//function draw cross
BEGIN FUNCTION draw_square(x,y)
END FUNCTION

BEGIN FUNCTION draw_circle(x,y)
END FUNCTION

BEGIN FUNCTION draw_cross(x,y)
END FUNCTION

//function set up the board
//repeately
//call the draw square function
BEGIN FUNCTION draw_board()
    FOR row = 0 to 2
        FOR column = 0 to 2 
            draw_square(column,row)
            OUTPUT(board[row][column])
            IF board[row][column] == 1
                draw_circle(column,row)
            ELSE IF board[row][column] == 2
                draw_cross(column, row)
            END IF
        END FOR
    END FOR
END FUNCTION

BEGIN
    SET board = [[0,1,0],
                 [0,2,1],
                 [1,0,0]]  //array or arrays
END

//clicking event on the canvas
//detect which position was clicked, make sure the position is empty
//depending on whose turn,
//draw a cross or a circle at the position
//change players turn


//HTML - needs a title
//links to css and javascript
//CANVAS

//determine who won ????? 
//score
