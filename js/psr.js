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

function play() 
{
    //new game
    computermove = getRandomItem(movearray); //Computer chooses a random move

    //player clicked button
    response = document.getElementById("input").value;
    //comparison of the player move to the computer move
    playerwin = logic(playermove,computermove);

    output = document.getElementById("output");
    output.innerHTML = playerwin;
}

document.getElementById("play").onclick = play;