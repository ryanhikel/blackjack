const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
let deck = [];
let originalDeck = [];
let shuffledDeck = [];
let playerTotal = 0;
let dealerTotal = 0;

const player = {
    name: '',
    hand: [
        { suit: '', value: ''},
        { suit: '', value: ''},
    ]
};
const dealer = {
    name: 'Rebecca',
    hand: [
        { suit: '', value: '' },
        { suit: '', value: '' },
    ]
};