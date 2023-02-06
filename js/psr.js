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
        return "draws.";
    } else { //SUPER COMPLEX IF STATEMENT
        if ( ((playermove == "paper") && (computermove == "scissors")) || 
        ((playermove == "scissors") && (computermove == "rock")) ||
        ((playermove == "rock") && (computermove == "paper"))  )
        {
            computerscore = computerscore + 1;
            return "loses.";
        } else {
            playerscore = playerscore + 1;
            return "wins.";
        }
    }
}

function play(playermove) 
{
    //new game
    computermove = getRandomItem(movearray); //Computer chooses a random move
    playerwin = logic(playermove,computermove);
    output = document.getElementById("output");
    output.innerHTML = "Computer chose: " + computermove + " Player chose: " + playermove + " " + " Player <b>" + playerwin + "</b><br>" + "Player score : " + playerscore + " Computer score: " + computerscore; 
}

document.getElementById("paper").onclick = function() { play("paper"); }
document.getElementById("scissors").onclick = function() { play("scissors"); }
document.getElementById("rock").onclick = function() { play("rock"); };