const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let startingDeck = [];
const $body = $('body');
const $hit = $('.hit-me');
const $stay = $('.stay');

function buildDeck() {
  //   $.each(values, function (key, value) {
  //     deck.push({
  //       value: cardValues,
  //       suit: cardSuits,
  //     });


  for (let cardValues of values) {
    for (let cardSuits of suits) {
      deck.push({
        value: cardValues,
        suit: cardSuits,
      });
    }
    startingDeck = deck.slice(0);
  }
}
buildDeck();
console.table(deck);
