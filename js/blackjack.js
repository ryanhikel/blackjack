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
const $playerSection = $('.player');
const $dealerSection = $('.dealer');
let $playerTotalDisplay = $('.total-player');
let $dealerTotalDisplay = $('.total-dealer');
const $display = $('.display');


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
function dealCard(player, section, total) {
    const newCard = deck.pop();
    player.hand.push(newCard);
    const $makeNewCard = $('<div></div>').addClass('card slide-in-top');
    const $makeValueSection = $('<div></div>').addClass('value');
    const $makeSuitSection = $('<div></div>').addClass('suit');
    $makeValueSection.html(player.hand[player.hand.length - 1].value);
    $makeSuitSection.html(player.hand[player.hand.length - 1].suit);
    $makeNewCard.append($makeValueSection);
    $makeNewCard.append($makeSuitSection);
    section.append($makeNewCard);
    addTotal(player, total);
    if (!player.hasAce) checkAce(player);
    aceToggle(player);
    checkPlayerWin();
}

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
function checkAce(player) {
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
        $display.html(`21! You Win!`);
        $hit.unbind();
        $stay.unbind();
    } else if (player.total > 21) {
        $display.html(`You went over by ${player.total - 21}. The dealer wins with ${dealer.total}`);
        $hit.unbind();
        $stay.unbind();
    }
}
function checkDealerWin() {
    if (dealer.total === 21) {
        display.html(`21! The dealer wins!`);
        $hit.unbind();
        $stay.unbind();
    }
}
function dealerLogic() {
    while (dealer.total <= 15) {
        dealCard(dealer, $dealerSection, $dealerTotalDisplay);
    }
    checkOutcome();
    console.table(dealer.hand);
}
function checkOutcome() {
    if (dealer.total === 21) {
        $display.html(`The dealer wins! You lost with ${player.total}`);
    } else if (dealer.total > 21) {
        $display.html(`The dealer went over by ${dealer.total - 21}. You win with ${player.total}`);
    } else if (player.total === dealer.total) {
        $display.html(`You and the dealer tie with ${dealer.total}`);
    } else if (player.total > dealer.total) {
        $display.html(`You Win! The dealer lost by ${player.total - dealer.total}`);
    } else if (dealer.total > player.total) {
        $display.html(`You lose. The dealer won by ${dealer.total - player.total}`);
    }
}
// startGame gives the starting two cards to the player and the dealer
function startGame() {
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        dealCard(player, $playerSection, $playerTotalDisplay);
        dealCard(dealer, $dealerSection, $dealerTotalDisplay);
    }
    checkDealerWin();
}
//event listeners
$hit.click(function () {
    dealCard(player, $playerSection, $playerTotalDisplay);
});
$stay.click(function () {
    $hit.unbind();
    $display.html(`Your total is  ${player.total}. It is now the dealers turn.`);
    $stay.unbind();
    dealerLogic();
});
// start the game
startGame();
console.table(player.hand);
console.table(dealer.hand);

let arr = 0;
function getMultiples() {
    for (let i = 1; i <= 1000; i++) {
        if (((i % 3) === 0) || ((i % 5) === 0)) {
            arr+=i;
        }
    }
}
console.log(arr);
