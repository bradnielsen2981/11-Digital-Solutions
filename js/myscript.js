/*
cost = 1.5; //float or decimal
message = "Your total cost is: "; //string
shopclosed = false; //boolean

numberofapples = prompt("How many apples? ");
numberofapples = Number(numberofapples);

total = cost * numberofapples;
total = String(total);
alert(message + total);
*/
//              0     1       2
applearray = ['red','green','yellow', 45]; //list of string
for (i=0; i < applearray.length; i++)
{
    console.log(applearray[i])
}
//JavaScript object
car = { type:"Fiat", model:"500", color:"white" };
console.log(car.type);
car.type = "Lamborgini";
console.log(car.type);

answer = document.getElementById("answer");
answer.innerHTML = "A web server is a computer program that delivers HTML";

function hideimage() 
{
    image = document.getElementById("myimage");
    image.style.display = "None";
}

image = document.getElementById("myimage");
image.onmouseover = hideimage;


