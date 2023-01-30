cost = 1.5; //float or decimal
message = "Your total cost is: "; //string
shopclosed = false; //boolean

numberofapples = prompt("How many apples? ");
numberofapples = Number(numberofapples);

total = cost * numberofapples;
total = String(total);
alert(message + total);

