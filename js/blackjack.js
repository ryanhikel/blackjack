const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let originalDeck = [];
let shuffledDeck = [];
let playerTotal = 0;
let dealerTotal = 0;

//  jQuery
const $body = $('body');
const $hit = $('.hit-me');
const $stay = $('.stay');
const $playerHand = $('.playerHand');
const $dealerHand = $('.dealerHand');
const $playerTotal = $('div#player-total');
const $dealerTotal = $('div#dealer-total');
// store all game data within js objects
//like this below
const player = {
  name: 'Ryan',
  hand: [
    {suit: 'hearts', value: 2 },
    {suit: 'clubs', value: 2 },
  ]
}
//worry about displaying to the html later on to avoid html dependency
function render() {

}

// functions
function buildDeck() {
  for (let cardValues of values) {
    for (let cardSuits of suits) {
      deck.push({
        value: cardValues,
        suit: cardSuits,
      });
    }
    originalDeck = deck.slice(0);
  }
}
function shuffleDeck() {
  while (shuffledDeck.length < deck.length) {
    let randomCard = Math.floor(Math.random() * 52);
    let moveCard = deck[randomCard];
    if (moveCard) {
      deck.splice(randomCard, 1, null);
      shuffledDeck.push(moveCard);
    }
  }
  deck = shuffledDeck;
}
function addCardPlayer() {
  const randomCard = Math.floor(Math.random() * 52);
  const $makeNewCard = $('<div></div>').addClass('card');
  const $makeValueSection = $('<div></div>').addClass('value');
  const $makeSuitSection = $('<div></div>').addClass('suit');
  $makeValueSection.text(deck[randomCard].value);
  $makeSuitSection.text(deck[randomCard].suit);
  //adds the value and suit to two different sub divs within my card objects
  $makeNewCard.append($makeValueSection);
  $makeNewCard.append($makeSuitSection);
  $playerHand.append($makeNewCard);
}
function addCardDealer() {
  const randomCard = Math.floor(Math.random() * 52);
  const $makeNewCard = $('<div></div>').addClass('card');
  const $makeValueSection = $('<div></div>').addClass('value');
  const $makeSuitSection = $('<div></div>').addClass('suit');
  $makeValueSection.text(deck[randomCard].value);
  $makeSuitSection.text(deck[randomCard].suit);
  //adds the value and suit to two different sub divs within my card objects
  $makeNewCard.append($makeValueSection).append($makeSuitSection);

  $dealerHand.append($makeNewCard);
}
function addPlayerTotal() {
  // need to get the html for the card maybe use :first
  const $cardValue = $('div.value').last();
  if ($cardValue.html() === 'J' || $cardValue.html() === 'Q' || $cardValue.html() === 'K') {
    playerTotal += 10;
    $playerTotal.html(playerTotal);
  } else if ($.isNumeric($cardValue.html()) === true) {
    playerTotal += parseInt($cardValue.html());
    $playerTotal.html('Total: ' + playerTotal);
  }  
}
function startGame() {
  buildDeck();
  shuffleDeck();
  for (let i = 0; i < 2; i++) {
    addCardPlayer();
    addPlayerTotal();
    addCardDealer();
  }
}

// clickevents
$hit.click(function () {
  addCardPlayer();
  addPlayerTotal();
});
$stay.click(function () {
  $hit.unbind();
  console.log('bye');
});
startGame();
console.log($playerTotal.html());
console.log(playerTotal);

