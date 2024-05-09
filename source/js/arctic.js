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
    // var handSize = getComputedStyle(hand).getPropertyValue('--hand-size');
    // handSize = Number(handSize) + 1;
    // hand.style.setProperty('--hand-size', handSize);

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

    $('#deck').html('deck: ' + struct.deck.length);
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

        // var count = document.createElement('p');
        // count.innerHTML += value;
        // shop.appendChild(count);
    }
}

function dig(depth, junk) {
    for (let i=0; i<depth; i++) {
        let temp = junk[Math.floor(Math.random()*junk.length)];
        var tempCard = document.createElement("img");
        tempCard.setAttribute("src", temp);
        // tempCard.setAttribute("src", '');
        tempCard.classList.add('card');
        document.getElementById('junkSample').appendChild(tempCard);
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
    var junkyard = [
        'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 'j', 
        'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 
        'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 
        'n', 'n', 'n', 'n', 'n', 'n', 
        'sh', 'sh', 'sh', 'sh', 'sh', 
        's', 's', 's', 's', 's'
    ]
    var player = {
        deck: ['a','b','c','d','e','f','g','h','i','j'],
        discard: []
    }
    var fightSaved = [];

    updateShop(shop, shopInven);

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

    $('#deck').html('deck: ' + player.deck.length);
    $('#junk').html('junkyard: ' + junkyard.length);

    // $('#play').click(function() {
    //     document.getElementById('hand').querySelectorAll('img.selected').forEach(e => e.remove());
    // });

    $('#end').click(function() {
        let selected = document.getElementsByClassName('card');
        let length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }
        player = endTurn(hand, player);
        fightSaved = [];
        document.getElementById("fight").disabled = false; 
        document.getElementById("add").disabled = false; 
        document.getElementById("draw").disabled = false; 
        document.getElementById("dig").disabled = false; 
        // junkyard = shuffle(junkyard);
    });

    $('#fight').click(function() {
        let selected =  document.getElementById('hand').querySelectorAll('img.selected');
        document.getElementById('fightSave').style.display='block';
        $('#fightSave').html('Saved: ' + selected.length);

        for (let i=0; i<selected.length; i++) {
            let adding = selected[i].src.split('/').pop();
            fightSaved.push(adding);
        }
        selected.forEach(e => e.remove());

        document.getElementById("fight").disabled = true; 
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

        document.getElementById("add").disabled = true; 
    });

    $('#draw').click(function() {
        let selected = document.getElementById('hand').querySelectorAll('img.selected');
        for (let i=0;i<selected.length; i++) {
            player = draw(hand, player);
        }
        selected.forEach(e => e.remove());

        document.getElementById("draw").disabled = true; 
    });

    $('#dig').click(function() {
        let selected = document.getElementById('hand').querySelectorAll('img.selected');
        dig(selected.length, junkyard);
        document.getElementById('junkSample').style.setProperty('--hand-size', selected.length);
        document.getElementById('junkSample').style.display='grid';
        selected.forEach(e => e.remove());
        
        var button = document.createElement("button");
        button.setAttribute("id", 'addDig');
        button.setAttribute("class", 'btn btn-primary');
        button.setAttribute("type", 'button');
        button.innerHTML = 'Add to deck';
        document.getElementById('junkSample').appendChild(button);

        document.getElementById("dig").disabled = true; 
    });

    $(document).on('click', '#addDig', function() {
        let tempSelected = document.getElementById('junkSample').querySelectorAll('img.selected');

        if (tempSelected.length != 1) {
            alert('select only 1 card');  
        } else {
            if (tempSelected.length == 1) {
                player.discard.push(tempSelected[0].src.split('/').pop());
                tempSelected.forEach(e => e.remove());
            }

            let tempDiscard = document.getElementById('junkSample').querySelectorAll('img');
            for (let i=0; i<tempDiscard.length;i++) {
                junkyard.push(tempDiscard[i].src);
            }

            document.getElementById('junkSample').querySelectorAll('img').forEach(e => e.remove());
            document.getElementById('junkSample').querySelectorAll('button').forEach(e => e.remove());
            document.getElementById('junkSample').style.display='none';
        }

        $('#junk').html('junkyard: ' + junkyard.length);
    });
}

init();