//normal variables
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
const player = {
    name: 'Ryan',
    hasAce: false,
    total: 0,
    hand: [

    ]
};
const dealer = {
    name: 'Rebecca',
    hasAce: false,
    total: 0,
    hand: [

    ]
};
let deck = [];
let originalDeck = [];
let shuffledDeck = [];



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
    if (!player.hasAce) checkAce(player);
    aceToggle(player);
    checkPlayerWin();
}
function dealerDeal() {
    const newCard = deck.pop();
    dealer.hand.push(newCard);
    addDealerTotal();
    if (!dealer.hasAce) checkAce(dealer);
    aceToggle(dealer);
}
//toggle ace value

function addPlayerTotal() {
    if (player.hand[player.hand.length - 1].value === 'J' || player.hand[player.hand.length - 1].value === 'Q' || player.hand[player.hand.length - 1].value === 'K') {
        player.total += 10;
    } else if ($.isNumeric(player.hand[player.hand.length - 1].value)) {
        player.total += player.hand[player.hand.length - 1].value;
    } else if (player.hand[player.hand.length - 1].value === 'A') {
        player.total++;
    }
}
function addDealerTotal() {
    if (dealer.hand[dealer.hand.length - 1].value === 'J' || dealer.hand[dealer.hand.length - 1].value === 'Q' || dealer.hand[dealer.hand.length - 1].value === 'K') {
        dealer.total += 10;
    } else if ($.isNumeric(dealer.hand[dealer.hand.length - 1].value)) {
        dealer.total += dealer.hand[dealer.hand.length - 1].value;
    } else if (dealer.hand[dealer.hand.length - 1].value === 'A') {
        dealer.total++;
    }
}


function checkAce(player) {
    console.log('hi');
    
    for (let i = 0; i < player.hand.length; i++) {
        if (player.hand[i].value === 'A') {
            player.hasAce = true;
            break;
        }
    }
}
function aceToggle(player) {
    if (player.hasAce && (player.total + 10) <= 21) {
        player.total += 10;
    }
}

function checkPlayerWin() {
    if (player.total === 21) {
        console.log(`21! You Win!`);
        $hit.unbind();
        $stay.unbind();
    } else if (player.total > 21) {
        console.log(`You went over by ${player.total - 21}. The dealer wins with ${dealer.total}`);
        $hit.unbind();
        $stay.unbind();
    }
}
function checkDealerWin() {
    if (dealer.total === 21) {
        console.log(`21! The dealer wins!`);
        $hit.unbind();
        $stay.unbind();
    }
}
function dealerLogic() {
    while (dealer.total <= 15) {
        dealerDeal();
    }
    checkOutcome();
    console.table(dealer.hand);
}
function checkOutcome() {
    if (dealer.total === 21) {
        console.log(`The dealer wins! You lost with ${player.total}`);
    } else if (dealer.total > 21) {
        console.log(`The dealer went over by ${dealer.total - 21}. You win with ${player.total}`);
    } else if (player.total === dealer.total) {
        console.log(`You and the dealer tie with ${dealer.total}`);
    } else if (player.total > dealer.total) {
        console.log(`You Win! The dealer lost by ${player.total - dealer.total}`);
    } else if (dealer.total > player.total) {
        console.log(`You lose. The dealer won by ${dealer.total - player.total}`);
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
    console.log(`Your total is  ${player.total}. It is now the dealers turn.`);
    $stay.unbind();
    dealerLogic();
});
// start the game
startGame();
console.table(player.hand);
console.table(dealer.hand);
