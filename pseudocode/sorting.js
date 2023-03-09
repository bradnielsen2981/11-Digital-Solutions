//Psuedocode for a sort function

BEGIN
    SET numberlist = [5,10,100,7,3,2,1,45,13,4]
    SET sortedlist = []

    WHILE length of numberlist > 0
        SET length = length of numberlist
        SET MAX = 0
        SET maxindex = 0
        FOR index = 0 to (length-1)
            IF numberlist[index] > MAX    //100 > 10
                MAX = numberlist[index] //100
                maxindex = index   //2
            END IF
        END FOR
        add MAX to sortedlist
        remove item from numberlist with maxindex
    END WHILE

    OUTPUT sortedlist
END