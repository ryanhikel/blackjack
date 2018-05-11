//normal variables
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let originalDeck = [];
let shuffledDeck = [];
let player;
let dealer;
let win = 0;
let tie = 0;
let loss = 0;

//jQuery vars
const $hit = $('.hit');
const $stay = $('.stay');
const $playerSection = $('.player');
const $dealerSection = $('.dealer');
const $display = $('.display');
const $playerTotalDisplay = $('.total-player');
const $dealerTotalDisplay = $('.total-dealer');
const $reset = $('.reset');
const $win = $('.win');
const $tie = $('.tie');
const $loss = $('.loss');
// functions
function makePeople() {
    player = {
        name: 'Ryan',
        hasAce: false,
        total: 0,
        hand: [

        ]
    };
    dealer = {
        name: 'Rebecca',
        hasAce: false,
        total: 0,
        hand: [

        ]
    };
}
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

    if (!player.hasAce) checkAce(player);
    
    addTotal(player, total);
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
        win++;
        $win.html(`Wins: ${win}`);
        $hit.unbind();
        $stay.unbind();
    } else if (player.total > 21) {
        $display.html(`You went over by ${player.total - 21}. The dealer wins with ${dealer.total}`);
        loss++;
        $loss.html(`Losses: ${loss}`);
        $hit.unbind();
        $stay.unbind();
    }
}
function checkDealerWin() {
    if (dealer.total === 21) {
        $display.html(`21! The dealer wins!`);
        loss++;
        $loss.html(`Losses: ${loss}`);
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
        loss++;
        $loss.html(`Losses: ${loss}`);
    } else if (dealer.total > 21) {
        $display.html(`The dealer went over by ${dealer.total - 21}. You win with ${player.total}`);
        win++;
        $win.html(`Wins: ${win}`);
    } else if (player.total === dealer.total) {
        $display.html(`You and the dealer tie with ${dealer.total}`);
        tie++;
        $tie.html(`Ties: ${tie}`);
    } else if (player.total > dealer.total) {
        $display.html(`You Win! The dealer lost by ${player.total - dealer.total}`);
        win++;
        $win.html(`Wins: ${win}`);
    } else if (dealer.total > player.total) {
        $display.html(`You lose. The dealer won by ${dealer.total - player.total}`);
        loss++;
        $loss.html(`Losses: ${loss}`);
    }
}
// startGame gives the starting two cards to the player and the dealer
function startGame() {
    makePeople();
    buildDeck();
    shuffleDeck();
    for (let i = 0; i < 2; i++) {
        dealCard(player, $playerSection, $playerTotalDisplay);
        dealCard(dealer, $dealerSection, $dealerTotalDisplay);
    }
    checkDealerWin();
    $hit.click(function () {
        dealCard(player, $playerSection, $playerTotalDisplay);
    });
    $stay.click(function () {
        $hit.unbind();
        $display.html(`Your total is  ${player.total}. It is now the dealers turn.`);
        $stay.unbind();
        dealerLogic();
    });
}
function resetTotal(who, totalDisplay) {
    who.total = 0;
    totalDisplay.html(`Total: 0`);
}
//event listeners

$reset.click(function () {
    deck = [];
    originalDeck = [];
    shuffledDeck = [];
    $('.card').remove();
    $hit.unbind();
    $stay.unbind();
    $display.html(`Hit or Stay?`);
    resetTotal(player, $playerTotalDisplay);
    resetTotal(dealer, $dealerTotalDisplay);
    startGame();
});
// start the game
startGame();