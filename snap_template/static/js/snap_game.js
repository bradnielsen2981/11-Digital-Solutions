//SPECIFIC GAME GLOBALS

//create a random sprite
function create_card()
{
  // Generate a random suit
  let suits = ['heart', 'club', 'spade', 'diamond'];

  for (let i = 0; i < 2; i++)
  {
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];
    // Generate a random number between 1 and 13
    let randomNumber = Math.floor(Math.random() * 13) + 1;

    let cardimage = "static/images/" + String(randomNumber) + randomSuit + ".gif";

    card = new Card(100, i*250, 204, 294, cardimage, cardimage, randomSuit, randomNumber);
  }

}

// Called every frame
function update_game()
{

}

// Start the game
function start_game()
{
  CREATE_SPRITE_TIMER = setInterval(create_card, 2000);
}

// End the game
function end_game()
{

  //could move to another page
  //window.location.href = "menu.html";
}


//DO NOT DELETE THE BELOW CODE - IT LINKS IN THE GAME ENGINE
GAME = new Game()
GAME_CONTROLLER = new Game_Controller()
GAME_CONTROLLER.start()