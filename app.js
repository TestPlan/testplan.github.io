var scores, roundScore, activePlayer, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    var dice = Math.ceil(Math.random() * 6);
    var diceDOM = document.querySelector('.dice');

    diceDOM.setAttribute('src', 'dice-' + dice + '.png');
    diceDOM.style.display = 'block';

    if (lastDice === 6 && dice === 6) {
        roundScore = 0;
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        changePlayer();
    } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        changePlayer();
    }

    lastDice = dice;
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function () {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-' + activePlayer).textContent = '0';
    var finalScore = document.querySelector('.score-to-win').value;
    var winningScore = 100;
    if (finalScore && !isNaN(finalScore) && finalScore > 0) {
        winningScore = finalScore;
    }
    console.log(winningScore);
    checkWin(winningScore);
});

function changePlayer() {
    lastDice = 0;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer = 1 - activePlayer;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

function checkWin(winningScore) {
    console.log(winningScore);
    if (scores[activePlayer] >= winningScore) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
        changePlayer();
    }
}

function init() {
    lastDice = 0;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
