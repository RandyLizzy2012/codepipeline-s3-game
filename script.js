document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/API Gateway.png' },
        { name: 'card1', img: 'images/API Gateway.png' },
        { name: 'card2', img: 'images/CloudTrail.png' },
        { name: 'card2', img: 'images/CloudTrail.png' },
        { name: 'card3', img: 'images/CloudWatch.png' },
        { name: 'card3', img: 'images/CloudWatch.png' },
        { name: 'card4', img: 'images/CodeDeploy.png' },
        { name: 'card4', img: 'images/CodeDeploy.png' },
        { name: 'card5', img: 'images/CodePipeline.png' },
        { name: 'card5', img: 'images/CodePipeline.png' },
        { name: 'card7', img: 'images/DynamoDB.png' },
        { name: 'card7', img: 'images/DynamoDB.png' },
        { name: 'card8', img: 'images/EC2.png' },
        { name: 'card8', img: 'images/EC2.png' },
        { name: 'card9', img: 'images/Elastic Block Store.png' },
        { name: 'card9', img: 'images/Elastic Block Store.png' },
        { name: 'card10', img: 'images/Elastic Load Balancing.png' },
        { name: 'card10', img: 'images/Elastic Load Balancing.png' },
        
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
