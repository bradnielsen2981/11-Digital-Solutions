//SPECIFIC GAME GLOBALS
//playerhand = []; //FOR BLACKJACK
SNAP_OPPORTUNITY = false;
cardlist = [];


//create a random sprite
function create_cards()
{
  cardlist = [];
  SNAP_OPPORTUNITY = false;
  GAME.clear_sprites();

  // Generate a random suit
  let suits = ['heart', 'club', 'spade', 'diamond'];

  for (let i = 0; i < 2; i++)
  {
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];
    // Generate a random number between 1 and 13
    let randomNumber = Math.floor(Math.random() * 13) + 1;

    let cardimage = "static/images/" + String(randomNumber) + randomSuit + ".gif";

    let card = new Card(i*200, 100, 204, 294, cardimage, cardimage, randomSuit, randomNumber);

    cardlist.push(card);
  }

  if (cardlist[0].suit == cardlist[1].suit)
  {
    console.log("Snap opportunity");
    SNAP_OPPORTUNITY = true;
  } else {
    SNAP_OPPORTUNITY = false;
  }

}

// Called every frame
function update_game()
{
    if (SNAP_OPPORTUNITY == true)
    {
       console.log("SNAP OPPORTUNITY");
       if (GAME.KEYS_PRESSED['W'])
       {
         alert("SNAP");
         SNAP_OPPORTUNITY = false;
         GAME.KEYS_PRESSED = {};
       }
    }
}

// Start the game
function start_game()
{
  CREATE_SPRITE_TIMER = setInterval(create_cards, 2000);
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