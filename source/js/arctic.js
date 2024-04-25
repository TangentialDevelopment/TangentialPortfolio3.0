function draw(hand) {
    var handSize = getComputedStyle(hand).getPropertyValue('--hand-size');
    handSize = Number(handSize) + 1;
    hand.style.setProperty('--hand-size', handSize);

    var card = document.createElement("img");
    card.setAttribute("src", '');
    card.classList.add('card');
    hand.appendChild(card);

    // if (deck == []) {
    //     deck = discard.slice();
    //     discard =[]
    // }
    
    // discard.push(deck[0]);
    // deck.shift();
}

function endTurn(hand) {
    for (let i=0; i<5; i++) {
        draw(hand);
    }
    hand.style.setProperty('--hand-size', 5);
}

function init() {
    var hand = document.getElementById("hand")
    var player = {
        deck: ['a','b','c','d','e','f','g','h','i','j'],
        discard: []
    }

    $(document).on('click','img',function(event) {
        var clicked = event.target;
        if (clicked.classList[1] == 'selected') {
            clicked.classList.remove('selected');
        } else {
            clicked.classList.add('selected');
        }
    });
    
    for (let i=0; i<5; i++) {
        draw(hand);
    }

    $('#play').click(function() {
        var selected = document.getElementsByClassName('selected');
        var length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }
    });

    $('#end').click(function() {
        var selected = document.getElementsByClassName('card');
        var length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }
        endTurn(hand);
    });
}

init();