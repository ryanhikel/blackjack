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
function playerDeal() {
    const newCard = deck.pop();
    player.hand.push(newCard);
    addPlayerTotal();
    if (checkAce() === true && (playerTotal + 10) <= 21) {
        playerTotal += 10;
    } else if (checkAce() === true && (playerTotal + 10) > 21) {
        playerTotal -= 10;
    }
    checkPlayerWin();


}
function dealerDeal() {
    const newCard = deck.pop();
    dealer.hand.push(newCard);
}
function addPlayerTotal() {
    if (player.hand[player.hand.length - 1].value === 'J' || player.hand[player.hand.length - 1].value === 'Q' || player.hand[player.hand.length - 1].value === 'K') {
        playerTotal += 10;
    } else if ($.isNumeric(player.hand[player.hand.length - 1].value)) {
        playerTotal += player.hand[player.hand.length - 1].value;
    } else if (player.hand[player.hand.length - 1].value === 'A') {
        playerTotal++;
    }
}
function checkAce() {
    for (let i = 0; i < player.hand.length; i++) {
        return player.hand[i].value === 'A';
    }
}
function checkPlayerWin() {
    if (playerTotal === 21) {
        console.log('You Win!');
        $hit.unbind();
    } else if (playerTotal > 21) {
        console.log(`You went over by ${playerTotal - 21}.`);
        $hit.unbind();
    }
}

//event listeners
$hit.click(function () {
    playerDeal();
    console.table(player.hand);
});
$stay.click(function () {
    $hit.unbind();
    console.log(`Your total is  ${playerTotal}. It is now the dealers turn.`);
});
function startGame() {
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        playerDeal();
        dealerDeal();
    }
}
startGame();
