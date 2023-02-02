console.log("Starting paper scissor rock");
//player score and computer score
playerscore = 0;
computerscore = 0;
drawscore = 0;
response = "";
movearray = ['paper','scissors','rock'];

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
    } else {
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

    //new game
    computermove = getRandomItem(movearray); //Computer chooses a random move
    output = document.getElementById("output");
    output.innerHTML = "What is your move? ";

    //player clicked button
    response = document.getElementById("input").value;
    //comparison of the player move to the computer move
    playerwin = logic(playermove,computermove);
    alert(playerwin);

    
    //if playerwins add 1 to score else if computer wins add 1 to computer score else
    output.innerHTML = "Do you wish to play again ?"; 
    response = document.getElementById("input").value;


output.innerHTML = "What is your move? "; // WE MIGHT GET AN ERROR!!!