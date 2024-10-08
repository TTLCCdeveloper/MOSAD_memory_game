// Flipped Card Vars
var FirstCard = null;
var FirstCardIMG = null;
var SecondCard = null;
var SecondCardIMG = null;
var FlippedCards = 0; //

var selectedDeck = "funny"; // Default Deck
var State = true; // Gamestate, true = pick a card, false = wait 
var cardlist = null;  // Contains the parent element of all cards

var TotalMatches = 0; // Counter for win condition

// Score Variables
var HighscoreListElement = null;
var HighscoreListMobileElement = null;

var highscoreList = [];
var TotalTries = 0;
var FailedTries = 0;
var ScoreMult = 1;
var GameScore = 0;

var TotalTriesElement = null;
var GameScoreElement = null;


let gameDeck = [];

const deckLoL = [
    {
        card_icon: 'assets\decks\lol\image1.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image2.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image3.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image4.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image5.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image6.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image7.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image8.jpg',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image9.png',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    /*{
        card_icon: 'assets\decks\lol\image10.png',
        card_bg: 'assets\decks\lol\background.jpg'
    },
    {
        card_icon: 'assets\decks\lol\image11.png',
        card_bg: 'assets\decks\lol\background.jpg'
    },*/
]


var init = 1;

let isMobile = false;
var sidebar = null;
var navbar = null;

window.onload = function () {
    cardlist = document.getElementById("CardList");
    TotalTriesElement = document.getElementById("Tries");
    GameScoreElement = document.getElementById("Score");
    HighscoreListElement = document.getElementById("highscore-list");
    HighscoreListMobileElement = document.getElementById("highscore-list-mobile");
    sidebar = document.getElementById("sidebar-left");
    navbar = document.getElementById("navbar");

    initCards();
    RebuildHighscores();


    window.addEventListener('resize', isMobileObs);
    this.isMobile = window.innerWidth <= 991.98;
    toggleUiElements();
}

function toggleUiElements() {
    if (this.isMobile) {
        this.sidebar.classList.add("d-none");
        this.navbar.classList.remove("d-none");
    }
    else {
        this.sidebar.classList.remove("d-none");
        this.navbar.classList.add("d-none");
    }
}



function isMobileObs() {
    this.isMobile = window.innerWidth <= 991.98;
    toggleUiElements();
}

function initCards() {

    FirstCard = null;
    SecondCard = null;

    FlippedCards = 0;

    TotalTries = 0;
    FailedTries = 0;
    TotalTriesElement.innerHTML = TotalTries;

    ScoreMult = 1;
    GameScore = 0;
    GameScoreElement.innerHTML = GameScore;
    TotalMatches = 0;
    State = true;

    this.gameDeck = [];
    cardlist.innerHTML = "";

    //TODO: add difficlty
    for (let i = 1; i <= 10; i++) { // generate 10 pairs
        for (let j = 1; j <= 2; j++) { // generate 2 cards per pair

            let index = i + "" + j;

            let card = {
                id: index,
                dataValue: i,
            }

            this.gameDeck.push(card);

        }
    }

    this.gameDeck.sort((a, b) => 0.5 - Math.random());


    for (let item of this.gameDeck) {


        const col = document.createElement('div');
        col.className = "col-3 py-2 ";

        const card = document.createElement('div');
        card.id = item.id;

        card.setAttribute("onclick", "DisplayCard(this)");
        card.className = "gamecard shadow mx-auto";
        card.setAttribute("data-value", item.dataValue);

        const cardImg = document.createElement('div');
        cardImg.className = "card-img cardimg";
        cardImg.setAttribute("style", "background-image: url('assets/decks/" + selectedDeck + "/image" + item.dataValue + ".jpg');background-size: 100% 100%;"); // use background img to avoid problems with extension IMAGUS

        const cardBG = document.createElement('div');
        cardBG.className = "card-img cardbg";
        cardBG.setAttribute("style", "background-image: url('assets/decks/" + selectedDeck + "/background" + ".jpg');background-size: 100% 100%;"); // use background img to avoid problems with extension IMAGUS

        card.append(cardImg);
        card.append(cardBG);

        col.append(card);

        cardlist.appendChild(col);
    }

    // RandomizeCards();
}


// OLD LOGIC
// function RandomizeCards() {
//     // re-initiliaze game aka reset button is pressed
//     FirstCard = null;
//     SecondCard = null;

//     FlippedCards = 0;

//     TotalTries = 0;
//     FailedTries = 0;
//     TotalTriesElement.innerHTML = TotalTries;

//     ScoreMult = 1;
//     GameScore = 0;
//     GameScoreElement.innerHTML = GameScore;
//     TotalMatches = 0;
//     State = true;

//     //randomizes cards
//     var nodes = cardlist.childNodes, i = 0;
//     nodes = Array.prototype.slice.call(nodes).sort(function (a, b) { return 0.5 - Math.random() });

//     while (i < nodes.length) {
//         cardlist.appendChild(nodes[i]);
//         var x = document.getElementById("CardList").lastElementChild;
//         x.classList.remove('flip'); // remove flip class, used when user resets game and not on initilization of the game
//         // x.style.pointerEvents = 'auto'; // TODO: not sure about its purpose
//         ++i;
//     }
// }

function changeDeck(deckname) {
    cardlist.innerHTML = "";
    this.selectedDeck = deckname;
    initCards();
}

function DisplayCard(element) {
    if (State == true) {
        if (FlippedCards == 0) {
            FirstCard = document.getElementById(element.id)
            FlippedCards++
            TotalTries++
            TotalTriesElement.innerHTML = TotalTries;
            FirstCard.classList.add('flip');
            document.getElementById(FirstCard.id).style.pointerEvents = 'none';

        } else if (FlippedCards == 1) {
            SecondCard = document.getElementById(element.id)
            SecondCard.classList.add('flip');
            FindMatch(FirstCard, SecondCard)
        }
    }
}


function FindMatch(FirstCard, SecondCard) {
    if (document.getElementById(FirstCard.id).getAttribute("data-value") == document.getElementById(SecondCard.id).getAttribute("data-value")) {
        //change background & disable click on element
        document.getElementById(SecondCard.id).style.pointerEvents = 'none';
        document.getElementById(FirstCard.id).style.pointerEvents = 'none';
        //clear turn values
        SecondCard = null;
        FirstCard = null;
        FlippedCards = 0;
        TotalMatches++;
        GameScore = Math.round(GameScore + (100 * ScoreMult));
        GameScoreElement.innerHTML = GameScore;
        if (TotalMatches == 10) {
            sleep(500).then(() => {
                WinGame();
            });
        }
    }
    else {
        sleep(800).then(() => {
            ResetCards(FirstCard, SecondCard);
            FlippedCards = 0;
            State = true;
        });
    }
}

function ResetCards(FirstCard, SecondCard) {
    FirstCard.classList.remove('flip');
    SecondCard.classList.remove('flip');
    //prevent bug clicking same card again
    document.getElementById(FirstCard.id).style.pointerEvents = 'auto';

    SecondCard = null;
    FirstCard = null;
    FailedTries++
    if (FailedTries >= 5) {
        if (ScoreMult > 0.5) {
            ScoreMult = ScoreMult - 0.1;
        } else if (ScoreMult > 0.1) {
            ScoreMult = ScoreMult - 0.05;
        }
    }
}

function sleep(time) {
    State = false
    return new Promise((resolve) => setTimeout(resolve, time));
}

function buildHighscores() {

    var nodes = highscoreList, i = 0;

    while (i < nodes.length) {
        HighscoreListElement.appendChild(nodes[i]);
        HighscoreListMobileElement.appendChild(nodes[i]);
        // TODO: isws einai perito na to kanw kol giati to highscore table de tha ginete rebuild otan patiete reset button, ara one time on load
        //maybe an thelw na allazei dunamika o pinakas an briskete neo highscore meta apo game
        ++i;
    }
}

function WinGame() {
    // TODO: make a modal for information input
    var PlayerName = prompt("You win! What's your name ?");
    highscoreList.push({ GameScore, PlayerName });
    localStorage.setItem('highscoresList', JSON.stringify(highscoreList))
    RebuildHighscores();
}

function RebuildHighscores() {
    HighscoreListElement.innerHTML = ""; // Clears Highscore list
    HighscoreListMobileElement.innerHTML = "";

    if (init == 1) {
        var HighScores = JSON.parse(localStorage.getItem('highscoresList')) || [];
        HighScores.map(HighScore => {
            highscoreList.push(HighScore)
        })
        init = 0;
    }

    highscoreList.sort(function (a, b) { return a.GameScore - b.GameScore });
    highscoreList.reverse();
    highscoreList.splice(4);

    for (var i = 0; i < highscoreList.length; i++) {
        var HighscoreNode = document.createElement("li");

        var HighscoreTxt = document.createTextNode(highscoreList[i].PlayerName + " - " + highscoreList[i].GameScore);

        HighscoreNode.appendChild(HighscoreTxt);
        HighscoreNode.className = 'list-group-item';

        let newNode = HighscoreNode.cloneNode(true);


        HighscoreListMobileElement.appendChild(HighscoreNode);
        HighscoreListElement.appendChild(newNode);
    }

}

