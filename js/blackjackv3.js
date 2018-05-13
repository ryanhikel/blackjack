// variables for building and storing the deck
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let shuffledDeck = [];

// for making new player objects on new game
let player;
let dealer;

// scoreboard variables
let win = 0;
let tie = 0;
let loss = 0;

// dom manipulation selection in jQuery
// selects where we are adding the cards to
const $playerSection = $('.player');
const $dealerSection = $('.dealer');
// updates the message to narrate the game
const $displayMessage = $('.display');
// for updating the total display
const $playerTotalDisplay = $('.total-player');
const $dealerTotalDisplay = $('.total-dealer');
// selects the play again button, hit button, stay button 
const $reset = $('.reset');
const $hit = $('.hit');
const $stay = $('.stay');
// for the scoreboard selection
const $winTotal = $('.win');
const $tieTotal = $('.tie');
const $lossTotal = $('.loss');

// deck functions
//function to build the deck
function buildDeck() {
  // looping through the array to make objects that store the value and suit
  for (let cardValues of values) {
    for (let cardSuits of suits) {
      deck.push({
        value: cardValues,
        suit: cardSuits,
      });
    }
  }
}
// now that we have the deck we need a shuffled deck to pop random cards from
function shuffleDeck() {
  // loop through the deck and remove a random card
  // then push it into the shuffled deck
  while (shuffledDeck.length < deck.length) {
    let randomCard = Math.floor(Math.random() * 52);
    let moveCard = deck[randomCard];
    if (moveCard) {
      deck.splice(randomCard, 1, null);
      shuffledDeck.push(moveCard);
    }
  }
  // make the deck = the shuffled deck
  deck = shuffledDeck;
}

//lets make people so that we can give them cards
function makePeople() {
  // this will update the player and dealer variables
  player = { hasAce: false, total: 0, hand: [] };
  dealer = { hasAce: false, total: 0, hand: [] };
}

// we have a deck and people now we need to deal to them
// this function deals one card
function dealCard(player, section, total, hide) {
  // this will hold one random deck card as it has already been shuffled and push to the players hand
  const newCard = deck.pop();
  player.hand.push(newCard);
  // makes a new card div and adds a class
  // this needs to be in the function so it creates a new card every time it is called
  if (hide === true) {
    const $newCardElement = $('<div></div>').addClass('card hide slide-in-tl');
    
    //now add this div to the players or dealers section
    section.append($newCardElement);
  } else {
    const $newCardElement = $('<div></div>').addClass('card slide-in-tl');
    // this will make a value and suit it to the card element
    const $makeValueSection = $('<div></div>').addClass('value');
    const $makeSuitSection = $('<div></div>').addClass('suit');
    $makeValueSection.html(player.hand[player.hand.length - 1].value);
    $makeSuitSection.html(player.hand[player.hand.length - 1].suit);
    $newCardElement.append($makeValueSection).append($makeSuitSection);
    //now add this div to the players or dealers section
    section.append($newCardElement);
  }
  // cool one line if statement mike showed me to check if player has ace
  if (!player.hasAce) checkAce(player);
  // update the total every time a card is dealt
  addTotal(player, total);
  // toggle the value of the ace depending on the total
  aceToggle(player, total);
  aceOff(player, total);
  // run this during your turn
  checkWinner();
}

// check for ace
function checkAce(player) {
  for (let i = 0; i < player.hand.length; i++) {
    if (player.hand[i].value === 'A') {
      player.hasAce = true;
      break;
    }
  }
}
// following the order lets add the total of the card we dealt
function addTotal(player, total) {
  if (player.hand[player.hand.length - 1].value === 'J' || player.hand[player.hand.length - 1].value === 'Q' || player.hand[player.hand.length - 1].value === 'K') {
    player.total += 10;
  } else if ($.isNumeric(player.hand[player.hand.length - 1].value)) {
    player.total += player.hand[player.hand.length - 1].value;
  } else if (player.hand[player.hand.length - 1].value === 'A') {
    player.total++;
  }
  total.html(`Total: ${player.total}`);
}
// leave the ace as 11 or subtract 10 if total is over 21
function aceToggle(player, total) {
  if (player.hasAce && ((player.total + 10) <= 21)) {
    player.total += 10;
  }
  total.html(`Total: ${player.total}`);
}
function aceOff(player, total) {
  if (player.hasAce && (player.total > 21)) {
    player.total -= 10;
  }
  total.html(`Total: ${player.total}`);
}
// now check for the player win with this function
// natural player 21 is not registering as a win
function checkWinner() {
  if (player.total === 21) {
    $displayMessage.html(`21! You Win!`);
    win++;
    $winTotal.html(`Wins: ${win}`);
    $hit.unbind();
    $stay.unbind();
    // win tie or loss you want to make the buttons unclickable
  } else if (dealer.total === 21) {
    $displayMessage.html(`21! The dealer wins!`);
    loss++;
    $lossTotal.html(`losses: ${loss}`);
    $hit.unbind();
    $stay.unbind();
  } else if (player.total > 21) {
    $displayMessage.html(`You went over by ${player.total - 21}. The dealer wins with ${dealer.total}`);
    loss++;
    $lossTotal.html(`Losses: ${loss}`);
    $hit.unbind();
    $stay.unbind();
  }
}

// give the dealer a 'brain'
function dealerLogic() {
  while (dealer.total < player.total) {
    dealCard(dealer, $dealerSection, $dealerTotalDisplay, false);
  }
  // when it is the dealers turn we no longer use the check winner function
  checkOutcome();
}

// upon the dealer turn these messages will display
function checkOutcome() {
  if (dealer.total === 21) {
    $displayMessage.html(`The dealer wins! You lost with ${player.total}`);
    loss++;
    $lossTotal.html(`Losses: ${loss}`);
  } else if (dealer.total > 21) {
    $displayMessage.html(`The dealer went over by ${dealer.total - 21}. You win with ${player.total}`);
    win++;
    $winTotal.html(`Wins: ${win}`);
  } else if (player.total === dealer.total) {
    $displayMessage.html(`You and the dealer tie with ${dealer.total}`);
    tie++;
    $tieTotal.html(`Ties: ${tie}`);
  } else if (dealer.total > player.total) {
    $displayMessage.html(`You lose. The dealer won by ${dealer.total - player.total}`);
    loss++;
    $lossTotal.html(`Losses: ${loss}`);
  }
}

// now we have all the pieces lets start the game
function startGame() {
  buildDeck();
  shuffleDeck();
  makePeople();
  // deal two cards initially to each
  // for (let i = 0; i < 2; i++) {
  dealCard(player, $playerSection, $playerTotalDisplay, false);
  dealCard(dealer, $dealerSection, $dealerTotalDisplay, true);
  dealCard(player, $playerSection, $playerTotalDisplay, false);
  dealCard(dealer, $dealerSection, $dealerTotalDisplay, false);
  // }
  // add some button functionality
  $hit.click(function () {
    dealCard(player, $playerSection, $playerTotalDisplay, false);
  });
  $stay.click(function () {
    $hit.unbind();
    $stay.unbind();
    $displayMessage.html(`Your total is  ${player.total}. It is now the dealers turn.`);
    const $showVal =$('div.hide');
    const $makeValueSection = $('<div></div>').addClass('value');
    const $makeSuitSection = $('<div></div>').addClass('suit');
    $makeValueSection.html(dealer.hand[0].value);
    $makeSuitSection.html(dealer.hand[0].suit);
    $showVal.append($makeValueSection).append($makeSuitSection);
    $showVal.toggleClass('hide');
    // now the dealer logic must kick in
    dealerLogic();
  });
}
// this button will clear the whole game and starts again
$reset.click(function () {
  deck = [];
  originalDeck = [];
  shuffledDeck = [];
  // clear all cards
  $('.card').remove();
  // clear event listeners before they are reapplied
  $hit.unbind();
  $stay.unbind();
  $displayMessage.html(`Hit or Stay?`);
  // clear player totals
  resetTotal(player);
  resetTotal(dealer);
  // begin again
  startGame();
});

// clears the player.total to 0
function resetTotal(player) {
  player.total = 0;
}

// let the game begin
startGame();
