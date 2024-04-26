function draw(hand, struct) {
    var handSize = getComputedStyle(hand).getPropertyValue('--hand-size');
    handSize = Number(handSize) + 1;
    hand.style.setProperty('--hand-size', handSize);

    var card = document.createElement("img");
    card.setAttribute("src", '');
    card.classList.add('card');
    hand.appendChild(card);

    if (struct['deck'].length==0) {
        struct['deck'] = struct['deck'].concat(struct['discard']);
        struct['discard'] = [];
    }
    struct['discard'].push(struct['deck'][0]);
    struct['deck'].shift();

    return struct
}

function endTurn(hand, deck) {
    for (let i=0; i<5; i++) {
        deck = draw(hand, deck);
    }
    hand.style.setProperty('--hand-size', 5);

    return deck
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
        player = draw(hand, player);
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
        player = endTurn(hand, player);
    });
}

init();