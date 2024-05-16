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
    card.setAttribute("src", '../../source/images/arctic/'+struct['deck'][0]);
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

    let selected = document.querySelectorAll('img.selected');
    for (let i=0; i<selected.length; i++) {
        selected[i].classList.remove('selected');
    }

    return deck
}

function updateShop(shop, shopInven) {
    for (const [key, value] of Object.entries(shopInven)) {
        var item = document.createElement('img');
        item.setAttribute("src", '../../source/images/arctic/'+key+'.png');
        // item.setAttribute("src", '');
        item.classList.add('item');
        shop.appendChild(item);

        // var count = document.createElement('p');
        // count.innerHTML += value;
        // shop.appendChild(count);
    }
}

function dig(junk) {
    for (let i=0; i<junk.length; i++) {
        // let temp = junk[Math.floor(Math.random()*junk.length)];
        let temp = junk[i];
        var tempCard = document.createElement("img");
        tempCard.setAttribute("src", temp);
        tempCard.classList.add('card');
        document.getElementById('junkSample').appendChild(tempCard);
    }
}

function init() {
    var hand = document.getElementById("hand");
    var shop = document.getElementById('shop');
    var cardTypes = {
        //      0food, 1med, 2draw, 3dig, 4hunt, 5medicine, 6fight, 7tribe count
        scav:   [1,    null, 1,     1,    1,     null,      1,      1],
        scout:  [2,    1,    2,     null, null,  null,      2,      1],
        hunter: [0,    1,    null,  null, 2,     null,      1,      1]
    };
    var shopInven = {
        scav: 5,
        scout: 5,
        hunter: 5,
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
        deck: ['scav.png','scav.png','scav.png','d','e','f','g','h','i','j'],
        discard: []
    }
    var fightSaved = [];

    player.deck = shuffle(player.deck);
    junkyard = shuffle(junkyard);
    updateShop(shop, shopInven);
    document.getElementById("draw").disabled = true;
    document.getElementById("buy").disabled = true;
    document.getElementById("dig").disabled = true;

    $(document).on('click','img', function(event) {
        let clicked = event.target;
        document.getElementById("draw").disabled = true;
        document.getElementById("buy").disabled = true;
        document.getElementById("dig").disabled = true;

        if (clicked.classList.contains('selected')) {
            clicked.classList.remove('selected');
        } else {
            clicked.classList.add('selected');
        }

        if (clicked.parentElement.id == 'hand') {
            let selected = document.getElementById('hand').querySelectorAll('img.selected');
            let draw = [];
            let dig = [];
            let hunt = [];
            let medicine = [];
            let drawV = 0;
            let digV = 0;
            let huntV = 0;
            let medV = 0;
            for (let i=0; i<selected.length; i++) {
                type = cardTypes[selected[i].src.split('/').pop().split('.')[0]];

                draw.push(type[2]);
                dig.push(type[3]);
                hunt.push(type[4]);
                medicine.push(type[5]);
            }
            if (null in draw) {
                document.getElementById("draw").disabled = true; 
            } else {
                for (i in draw) {
                    drawV += draw[i];
                }
                document.getElementById("draw").disabled = false; 
                console.log(drawV);
            }
            if (null in dig) {
                document.getElementById("dig").disabled = true; 
            } else {
                for (i in dig) {
                    digV += dig[i];
                }
                document.getElementById("dig").disabled = false; 
                console.log(digV);
            }
        }
    });
    
    for (let i=0; i<5; i++) {
        player = draw(hand, player);
    }

    $('#deck').html('deck: ' + player.deck.length);
    $('#junk').html('junkyard: ' + junkyard.length);

    $('#end').click(function() {
        let selected = document.getElementsByClassName('card');
        let length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }
        player = endTurn(hand, player);
        fightSaved = [];
        // document.getElementById("buy").disabled = true; 
        // document.getElementById("draw").disabled = true; 
        // document.getElementById("dig").disabled = true; 
        junkyard = shuffle(junkyard);
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
    });

    $('#buy').click(function() {
        let selected = document.getElementById('shop').querySelectorAll('img.selected');
        if (selected.length != 1) {
            alert('select 1 only');
        } else {
            let adding = selected[0].src.split('/').pop();
            player = addDeck(player, adding);
            shopInven[adding] = shopInven[adding] - 1;
        }

        // document.getElementById("buy").disabled = true; 
    });

    $('#draw').click(function() {
        let selected = document.getElementById('hand').querySelectorAll('img.selected');
        for (let i=0;i<selected.length; i++) {
            player = draw(hand, player);
        }
        selected.forEach(e => e.remove());

        // document.getElementById("draw").disabled = true; 
    });

    $('#dig').click(function() {
        let selected = document.getElementById('hand').querySelectorAll('img.selected');
        if (selected.length == 0) {
            return;
        }
        let drawn = junkyard.slice(0, selected.length);
        for (let i=0; i<selected.length; i++) {
            junkyard.shift();
        }
        dig(drawn);
        document.getElementById('junkSample').style.setProperty('--hand-size', selected.length);
        document.getElementById('junkSample').style.display='grid';
        selected.forEach(e => e.remove());
        
        var button = document.createElement("button");
        button.setAttribute("id", 'addDig');
        button.setAttribute("class", 'btn btn-primary');
        button.setAttribute("type", 'button');
        button.innerHTML = 'Add to deck';
        document.getElementById('junkSample').appendChild(button);

        // document.getElementById("dig").disabled = true; 
    });

    $(document).on('click', '#addDig', function() {
        let tempSelected = document.getElementById('junkSample').querySelectorAll('img.selected');

        if (tempSelected.length != 1) {
            alert('select only 1 card');  
        } else {
            if (tempSelected.length == 1) {
                let = tempDiscard = tempSelected[0].src.split('/').pop();
                player.discard.push(tempDiscard);
                tempSelected.forEach(e => e.remove());
            }

            let reshuffle = document.getElementById('junkSample').querySelectorAll('img');
            for (let i=0; i<reshuffle.length; i++) {
                junkyard.push(reshuffle[i].src.split('/').pop());
            }

            document.getElementById('junkSample').querySelectorAll('img').forEach(e => e.remove());
            document.getElementById('junkSample').querySelectorAll('button').forEach(e => e.remove());
            document.getElementById('junkSample').style.display='none';
        }

        $('#junk').html('junkyard: ' + junkyard.length);
    });
}

init();