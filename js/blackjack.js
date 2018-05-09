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
    const $cardValue = this.$('');
}

function startGame() {
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        addCardPlayer();
        addCardDealer();
    }
}

// clickevents
$hit.click(function () {
    addCardPlayer();
});
$stay.click(function () {
    $hit.unbind();
    console.log('bye');
});
console.log($dealerHand);
console.log($playerHand);
startGame();
