function shuffle(deck) {
    var m = deck.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = deck[m];
        deck[m] = deck[i];
        deck[i] = t;
    }
  
    return deck;
}

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

        struct['deck'] = shuffle(struct['deck']);
    }
    struct['discard'].push(struct['deck'][0]);
    struct['deck'].shift();

    return struct
}

function addDeck(deck, target) {
    deck['discard'].push(target)
    return deck;
}

function endTurn(hand, deck) {
    for (let i=0; i<5; i++) {
        deck = draw(hand, deck);
    }
    hand.style.setProperty('--hand-size', 5);

    return deck
}

function updateShop(shop, shopInven) {
    for (const [key, value] of Object.entries(shopInven)) {
        var item = document.createElement('img');
        item.setAttribute("src", key);
        item.classList.add('item');
        shop.appendChild(item);
    }
}

function init() {
    var hand = document.getElementById("hand");
    var shop = document.getElementById('shop');
    var shopInven = {
        z: 5,
        y: 5,
        x: 5,
        w: 5,
        v: 5,
        u: 5,
        t: 5,
        s: 5
    }
    
    updateShop(shop, shopInven);

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
        document.getElementById('hand').querySelectorAll('img.selected').forEach(e => e.remove());
    });

    $('#end').click(function() {
        var selected = document.getElementsByClassName('card');
        var length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }
        player = endTurn(hand, player);
    });

    $('#add').click(function() {
        let selected = document.getElementById('shop').querySelectorAll('img.selected');
        if (selected.length != 1) {
            alert('select 1 only');
        } else {
            let adding = selected[0].src.split('/').pop();
            player = addDeck(player, adding);
            shopInven[adding] = shopInven[adding] - 1;
        }
    });
}

init();