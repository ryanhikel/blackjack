//normal variables
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
const player = {
    name: 'Ryan',
    hand: [

    ]
};
const dealer = {
    name: 'Rebecca',
    hand: [

    ]
};
let deck = [];
let originalDeck = [];
let shuffledDeck = [];
let playerTotal = 0;
let dealerTotal = 0;
//jQuery vars
const $hit = $('.hit');
const $stay = $('.stay');
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
// i have the original deck saved before i shuffle it
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
//shuffled the deck and made it equal to deck
//i can pull random cards from here when the user presses hit
//I want to remove cards from the deck array when it is initally dealt
function playerInitialDeal() {
    const startingCards = deck.pop();
    player.hand.push(startingCards);
}
function dealerInitialDeal() {
    const startingCards = deck.pop();
    dealer.hand.push(startingCards);
}

//event listeners
$hit.click(function () {
   console.log('hi');
   
});
$stay.click(function () {
    $hit.unbind();
    console.log('bye');
});
function startGame() {
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        playerInitialDeal();
        dealerInitialDeal();
    }
}
console.table(player.hand);
console.table(dealer.hand);