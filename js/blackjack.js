const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let originalDeck = [];
let shuffledDeck = [];

//  jQuery
const $body = $('body');
const $hit = $('.hit-me');
const $stay = $('.stay');

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
function initialDeal() {
  
}
buildDeck();
shuffleDeck();
// clickevents
$hit.click(function() {
  console.log('hi');
});
$stay.click(function () {
  console.log('bye');
});
console.table(deck);
