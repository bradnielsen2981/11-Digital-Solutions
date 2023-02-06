console.log("Starting paper scissor rock");
//player score and computer score
playerscore = 0;
computerscore = 0;
drawscore = 0;
response = "";
movearray = ['paper','scissors','rock'];
output = document.getElementById("output");
output.innerHTML = "What is your move? ";

function getRandomItem(arr) {
    randomIndex = Math.floor(Math.random() * arr.length); // get random index value
    item = arr[randomIndex]; // get random item
    return item;
}

//Compare the players move to the computers
function logic(playermove,computermove)
{

    if (playermove == computermove) 
    {
        return "draw";
    } else { //SUPER COMPLEX IF STATEMENT
        if ( ((playermove == "paper") && (computermove == "scissors")) || 
        ((playermove == "scissors") && (computermove == "rock")) ||
        ((playermove == "rock") && (computermove == "paper"))  )
        {
            return "lose";
        } else {
            return "win";
        }
    }
}

function play(playermove) 
{
    //new game
    computermove = getRandomItem(movearray); //Computer chooses a random move

    //player clicked button
    //playermove = document.getElementById("input").value;
    //comparison of the player move to the computer move
    playerwin = logic(playermove,computermove);

    output = document.getElementById("output");
    output.innerHTML = playerwin;

}

function paper() 
{ 
    play('paper'); 
}
function scissors() 
{ 
    play('rock'); 
}
function rock() 
{ 
    play('rock'); 
}

document.getElementById("paper").onclick = paper;
document.getElementById("scissors").onclick = scissors;
document.getElementById("rock").onclick = rock;