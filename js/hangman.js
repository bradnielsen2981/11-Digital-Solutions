BEGIN
    SET global wordlist = ['apple','banana','cherry']
    SET global word = random word from wordlist
    SET global lives = 7
    SET global wordblanks = []
    SET global letterlist = []
    FOR letter in word
        wordblanks APPEND '_'
    END FOR
    OUTPUT wordblanks
END

//this function will draw the current state of the hangman
BEGIN FUNCTION Draw(lives)
END

//this function is triggered by a keyboard input event
BEGIN FUNCTION playerchooseletter(letter)
    
    /*looking for the letter in the word 
    if the wrong, then lose a live */
    SET loselife = TRUE
    FOR index = 0 to word length   //0,1,2,...word length
        IF word[index] ==  letter   // apple
            wordblanks[index] = letter   // ['a''_''_''_''_''_']
            loselife = FALSE
        END IF
    END FOR

    IF loselife
        lives = lives - 1
        letterlist APPEND letter
        OUTPUT letterlist
        Draw(lives)
    END IF

    OUTPUT wordblanks
END

//APPLE
//X