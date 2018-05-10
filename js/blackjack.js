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
    checkPlayerAce();
    aceTogglePlayer();
    checkPlayerWin();
}
function dealerDeal() {
    const newCard = deck.pop();
    dealer.hand.push(newCard);
    addDealerTotal();
    checkDealerAce();
    aceToggleDealer();
    // checkDealerWin();
}
//toggle ace value
function aceTogglePlayer() {
    if (checkPlayerAce() === true && (playerTotal + 10) <= 21) {
        playerTotal += 10;
    } else if (checkPlayerAce() === true && (playerTotal + 10) > 21) {
        playerTotal -= 10;
    }
}
function aceToggleDealer() {
    if (checkDealerAce() === true && (dealerTotal + 10) <= 21) {
        dealerTotal += 10;
    } else if (checkDealerAce() === true && (dealerTotal + 10) > 21) {
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
function checkPlayerAce() {
    for (let i = 0; i < player.hand.length; i++) {
        return player.hand[i].value === 'A';
    }
}
function checkDealerAce() {
    for (let i = 0; i < dealer.hand.length; i++) {
        return dealer.hand[i].value === 'A';
    }
}
function checkPlayerWin() {
    if (playerTotal === 21) {
        console.log(`21! You Win!`);
        $hit.unbind();
    } else if (playerTotal > 21) {
        console.log(`You went over by ${playerTotal - 21}. The dealer wins with ${dealerTotal}`);
        $hit.unbind();
    }
}
function checkDealerWin() {
    aceToggleDealer();
    if (dealerTotal === 21) {
        console.log(`21! The dealer wins!`);
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
    checkDealerWin();
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
