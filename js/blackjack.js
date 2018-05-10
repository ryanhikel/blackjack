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
// on every card dealt it will update the total and check for a win.
function playerDeal() {
    const newCard = deck.pop();
    player.hand.push(newCard);
    addPlayerTotal();
    aceToggle();
    checkPlayerWin();
}
function dealerDeal() {
    const newCard = deck.pop();
    dealer.hand.push(newCard);
    addDealerTotal();
    aceToggle();
    checkDealerWin();
}
//toggle ace value
function aceToggle() {
    if (checkAce() === true && (dealerTotal + 10) <= 21) {
        dealerTotal += 10;
    } else if (checkAce() === true && (dealerTotal + 10) > 21) {
        dealerTotal -= 10;
    }
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
function addDealerTotal() {
    if (dealer.hand[dealer.hand.length - 1].value === 'J' || dealer.hand[dealer.hand.length - 1].value === 'Q' || dealer.hand[dealer.hand.length - 1].value === 'K') {
        dealerTotal += 10;
    } else if ($.isNumeric(dealer.hand[dealer.hand.length - 1].value)) {
        dealerTotal += dealer.hand[dealer.hand.length - 1].value;
    } else if (dealer.hand[dealer.hand.length - 1].value === 'A') {
        dealerTotal++;
    }
}
function checkAce() {
    for (let i = 0; i < player.hand.length; i++) {
        return player.hand[i].value === 'A';
    }
}
function checkPlayerWin() {
    if (playerTotal === 21) {
        console.log(`You Win! The dealer lost with ${dealerTotal}`);
        $hit.unbind();
    } else if (playerTotal > 21) {
        console.log(`You went over by ${playerTotal - 21}. The dealer wins with ${dealerTotal}`);
        $hit.unbind();
    }
}
function checkDealerWin() {
    if (dealerTotal === 21) {
        console.log(`Natural 21! The dealer wins! You lost with ${playerTotal}`);
        $hit.unbind();
        $stay.unbind();
    }
}
function dealerLogic() {
    while (dealerTotal <= 15) {
        dealerDeal();
    }
    checkOutcome();
    console.table(dealer.hand);
}
function checkOutcome() {
    if (dealerTotal === 21) {
        console.log(`The dealer wins! You lost with ${playerTotal}`);
    } else if (dealerTotal > 21) {
        console.log(`The dealer went over by ${dealerTotal - 21}. You win with ${playerTotal}`);
    } else if (playerTotal === dealerTotal) {
        console.log(`You and the dealer tie with ${dealerTotal}`);
    } else if (playerTotal > dealerTotal) {
        console.log(`You Win! The dealer lost by ${playerTotal - dealerTotal}`);
    } else if (dealerTotal > playerTotal) {
        console.log(`You lose. The dealer won by ${dealerTotal - playerTotal}`);
    }
}
// startGame gives the starting two cards to the player and the dealer
function startGame() {
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        playerDeal();
        dealerDeal();
    }
    
}
//event listeners
$hit.click(function () {
    playerDeal();
});
$stay.click(function () {
    $hit.unbind();
    console.log(`Your total is  ${playerTotal}. It is now the dealers turn.`);
    $stay.unbind();
    dealerLogic();
});
// start the game
startGame();
console.table(player.hand);
console.table(dealer.hand);
