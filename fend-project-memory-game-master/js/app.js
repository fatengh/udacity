

// Done By : Faten Ghamdi 
// main array of cards
const picOfCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
    "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
    "fa fa-cube", "fa fa-cube", "fa fa-bomb", "fa fa-bomb", "fa fa-leaf",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];
let openedArray = []; // to check two cards
let matchedArray = []; // put matched
// get all html class
const cardsCont = document.querySelector(".deck");
const restartCont = document.querySelector(".restart");
const movesCont = document.querySelector(".moves");
const starCont = document.querySelector(".stars");
const timerCont = document.querySelector(".timer");
const modal = document.querySelector('.modal');
const timeModal = document.querySelector('.time-modal');
const ratingModal = document.querySelector('.rating-modal');
const movesModal = document.querySelector('.moves-modal');
const btnModal = document.querySelector('.btn-modal');
const titleT = document.querySelector('.titleType');
// main varibal
const starPic = `<li><i class="fa fa-star"></i></li>`;
starCont.innerHTML = starPic + starPic + starPic;
let moves = 0;
let firstClick = true;
let timer = 0;
let totalSec = 0;
let finalStar = " ";
timerCont.innerHTML = totalSec + '&nbsp sec';

function createCard() {// to init the board of the game
    shuffle(picOfCards);//to make it random
    for (let i = 0; i < picOfCards.length; i++) {
        const cards = document.createElement("div");
        cards.classList.add("card");// add card div 
        cards.innerHTML = "<i class='" + picOfCards[i] + "'</i>";
        cardsCont.appendChild(cards);
        // click event
        clickEv(cards);
    }
}
function clickEv(cards) {// event happend when you click on the card
    cards.addEventListener("click",
        function () {
            if (firstClick) {
                startTime();
                firstClick = false; 
            }
            const cCard = this;
            const pCard = openedArray[0];
            if (openedArray.length === 1) {
                cards.classList.add("open", "show", "display");// flip all pic
                openedArray.push(cCard);//func to check
                checkMatched(cCard, pCard);

            } else { // dont have any open cards 
                cards.classList.add("open", "show", "display");// flip all pic
                openedArray.push(cCard);//func to check

            }

        })
}
function checkMatched(cCard, pCard) {// check matched cards 

    if (cCard.innerHTML === pCard.innerHTML) { // match
        cCard.classList.add("match");
        pCard.classList.add("match");
        matchedArray.push(pCard, cCard);
        openedArray = [];//rest the array
        finishTheGame();

    } else {   //dosen't match 
        setTimeout(function () {// delay to show then close 
            cCard.classList.remove("open", "show", "display");
            pCard.classList.remove("open", "show", "display");
            openedArray = [];//rest the array
        }, 300);
    }
    countMoves();
}
function finishTheGame() {// if you win
    if (matchedArray.length === 16) { // all pic match 
        titleT.innerHTML = "Congratulations";
        timeModal.innerText = totalSec + 'sec'; // show sec
        ratingModal.innerHTML = finalStar; // show star
        movesModal.innerHTML = moves + 1; // show moves 

        stopTime(); // restart game
        modal.style.display = 'block'; // all in box

    }
}
function finishTheGameEarly() { // Your moves run out of 30 

    titleT.innerHTML = "Game over, Your moves run out";
    timeModal.innerText = totalSec + 'sec';
    ratingModal.innerHTML = "";
    movesModal.innerHTML = moves + 1;

    stopTime();
    modal.style.display = 'block';

}
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
restartCont.addEventListener("click", restart);// restart icon event
btnModal.addEventListener('click', function () { //play again btn
    modal.style.display = 'none';
    restart();
})

function restart() { //rest all varibal and create the board again 

    cardsCont.innerHTML = " ";
    matchedArray = [];
    moves = 0;
    movesCont.innerHTML = moves;
    starCont.innerHTML = starPic + starPic + starPic;
    stopTime();
    firstClick = true;
    totalSec = 0;
    timerCont.innerHTML = totalSec + '&nbsp sec';
    createCard();

}
function countMoves() { //count moves 
    moves++;
    movesCont.innerHTML = moves;
    starCount();

}
function starCount() { // if conditions of rating 
    if (moves < 10) {
        starCont.innerHTML = starPic + starPic + starPic;
        finalStar = starPic + starPic + starPic;
    } else if (moves < 20) {
        starCont.innerHTML = starPic + starPic;
        finalStar = starPic + starPic;
    } else if (moves < 30) {
        starCont.innerHTML = starPic;
        finalStar = starPic;
    } else if (moves === 30) {
        finishTheGameEarly();
    }
}

function startTime() {//calculate time
    timer = setInterval(function () {
        totalSec++;
        timerCont.innerHTML = totalSec + '&nbsp sec';
    }, 500)
}
function stopTime() {//rest time
    clearInterval(timer);
}

createCard(); //call main function
//2020
