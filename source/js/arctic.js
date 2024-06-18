function nullCheck(array) {
    for (let i=0; i<array.length;i++) {
        let value = array[i];
        if (value == null) {
            return true;
        }
    }

    return false;
}

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

    if (struct['deck'].length==0) {
        struct['deck'] = struct['deck'].concat(struct['discard']);
        struct['discard'] = [];

        struct['deck'] = shuffle(struct['deck']);
    }

    var card = document.createElement("img");
    card.setAttribute("src", '../../source/images/arctic/'+struct['deck'][0]);
    card.classList.add('card');
    hand.appendChild(card);

    struct['hand'].push(struct['deck'][0]);
    struct['deck'].shift();

    $('#deck').html('deck: ' + struct.deck.length);
    return struct
}

function addDeck(deck, target) {
    deck['discard'].push(target)
    return deck;
}

function endTurn(hand, deck) {
    if(deck.hand.length > 0) {
        for(let i=0;i<deck.hand.length;i++) {
            deck.discard.push(deck.hand[i]);
        }

        deck.hand =[];
    }

    for (let i=0; i<5; i++) {
        deck = draw(hand, deck);
    }

    hand.style.setProperty('--hand-size', 5);

    let selected = document.querySelectorAll('img.selected');
    for (let i=0; i<selected.length; i++) {
        selected[i].classList.remove('selected');
    }

    $('#discardPile').html('discard: ' + deck.discard.length);

    return deck
}

function updateShop(shop, shopInven) {
    shop.innerHTML= '';
    document.getElementById('shopCount').innerHTML = '';
    for (const [key, value] of Object.entries(shopInven)) {
        var item = document.createElement('img');
        item.setAttribute("src", '../../source/images/arctic/'+key+'.png');
        item.classList.add('item');
        shop.appendChild(item);

        var count = document.createElement('p');
        count.classList.add('count');
        count.innerHTML += value;
        document.getElementById("shopCount").appendChild(count);
    }
}

function dig(junk) {
    for (let i=0; i<junk.length; i++) {
        // let temp = junk[Math.floor(Math.random()*junk.length)];
        let temp = junk[i];
        var tempCard = document.createElement("img");
        tempCard.setAttribute("src", '../../source/images/arctic/'+temp);
        tempCard.classList.add('card');
        document.getElementById('junkSample').appendChild(tempCard);
    }
}

function tribeCount(player, cardTypes) {
    var tribeCount = 0;
    player.deck.forEach(
        (element) => tribeCount += cardTypes[element.split('.')[0]][7]
    );
    player.discard.forEach(
        (element) => tribeCount += cardTypes[element.split('.')[0]][7]
    );
    player.hand.forEach(
        (element) => tribeCount += cardTypes[element.split('.')[0]][7]
    );

    return tribeCount;
}

function endGame(player, deck, cardTypes) {   
    if (deck.length == 1) {
        $('#end').click(function() {
            alert('Tribe Count: ' + tribeCount(player, cardTypes));
            return true;
        });
    }
}

function init() {
    var turn = 0;
    var hand = document.getElementById("hand");
    var shop = document.getElementById('shop');
    var cardTypes = {
        //           0food, 1med, 2draw, 3dig, 4hunt, 5medicine, 6fight, 7count 8tool
        scav:        [1,    0,    1,     1,    1,     null,      1,      1,     0],
        scout:       [2,    1,    2,     null, null,  null,      2,      1,     0],
        hunter:      [0,    1,    null,  null, 2,     null,      1,      1,     0],
        brawler:     [2,    0,    null,  1,    null,  null,      2,      1,     0],
        groupLeader: [2,    2,    2,     2,    2,     null,      2,      2,     2],
        thug:        [3,    3,    null,  1,    null,  null,      3,      3,     0],
        saboteur:    [1,    1,    null,  1,    null,  null,      1,      1,     0],
        sniper:      [2,    2,    null,  null, null,  null,      null,   2,     0],
        refugee:     [0,    0,    null,  0,    0,     null,      null,   1,     0],
        //junkyard
        junk:        [null, null, null,  null, null,  null,      null,   0,     1],
        medkit:      [null, null, null,  null, null,  2,         null,   0,     1],
        multitool:   [null, null, null,  1,    1,     null,      1,      0,     1],
        net:         [null, null, null,  null, 2,     null,      1,      0,     1],
        pickaxe:     [null, null, null,  1,    null,  null,      2,      0,     1],
        pills:       [null, null, null,  null, null,  1,         null,   0,     1], 
        shovel:      [null, null, null,  2,    null,  null,      1,      0,     1],
        spear:       [null, null, null,  null, 1,     null,      2,      0,     1],
        //contested
        fieldCrew:   [null, null, null,  2,    2,     null,      2,      4,     0],
        grenade:     [null, null, null,  null, null,  null,      3,      0,     1],
        sledTeam:    [null, null, 2,     null, null,  null,      1,      2,     0],
        tf3:         [null, null, null,  null, 0,     null,      0,      3,     0],
        tf4:         [null, null, null,  null, 0,     null,      0,      4,     0],
        tf5:         [null, null, null,  null, 0,     null,      0,      5,     0],
        wolf:        [null, null, null,  null, 3,     null,      2,      0,     1]
    };
    var shopInven = {
        // scav: 8,
        scav: 1,
        scout: 8,
        hunter: 8,
        brawler: 6,
        groupLeader: 5,
        thug: 5,
        saboteur: 8,
        sniper: 5
    }
    var junkyard = [
        'junk.png', 'junk.png', 'junk.png', 'junk.png', 'junk.png', 'junk.png', 'junk.png',
        'medkit.png', 'medkit.png', 'medkit.png', 'medkit.png', 'medkit.png', 'medkit.png',
        'pills.png', 'pills.png', 'pills.png', 'pills.png', 'pills.png', 'pills.png', 'pills.png', 'pills.png', 'pills.png',
        'pickaxe.png', 'pickaxe.png', 'pickaxe.png', 'pickaxe.png',
        'multitool.png', 'multitool.png', 'multitool.png', 'multitool.png', 
        'net.png', 'net.png', 'net.png', 'net.png', 
        'shovel.png', 'shovel.png',
        'spear.png', 'spear.png'
    ]
    var contested = [
        'fieldCrew.png', 'fieldCrew.png', 'tf3.png', 'tf3.png', 'tf4.png', 'tf4.png', 'tf5.png', 'tf5.png', 
        'sledTeam.png', 'sledTeam.png', 'grenade.png', 'grenade.png', 'wolf.png', 'wolf.png'
    ];
    var player = {
        deck: ['scav.png','scav.png','scav.png','brawler.png','refugee.png','refugee.png','refugee.png','refugee.png','shovel.png','spear.png'],
        hand: [],
        discard: [],
        action: []
    }
    var fightSaved = [];

    player.deck = shuffle(player.deck);
    junkyard = shuffle(junkyard);
    contested = shuffle(contested);
    updateShop(shop, shopInven);
    document.getElementById("fight").disabled = true;
    document.getElementById("draw").disabled = true;
    document.getElementById("buy").disabled = true;
    document.getElementById("dig").disabled = true;
    document.getElementById("discard").disabled = true;

    $('#contested').html('contested: ' + contested.length);
    $('#discardPile').html('discard: ' + player.discard.length);
    
    $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));

    for (let i=0; i<5; i++) {
        player = draw(hand, player);
    }

    $('#deck').html('deck: ' + player.deck.length);
    $('#junk').html('junkyard: ' + junkyard.length);

    $('#discardPile').hover(function() {
        let tempDeck2 = shuffle(player.discard);
        let display2 = [];
        for(let i=0;i<tempDeck2.length;i++) {
            display2[i] = ' ' + tempDeck2[i].slice(0,-4);
        }
        $('#showDiscard').html('discard: ' + display2);
        if (display2.length > 0) {
            $('#showDiscard').css('display', 'block');
        }
    }, function() {
        $('#showDiscard').css("display", "none");}
    );

    $('#deck').hover(function() {
        let tempDeck = shuffle(player.deck);
        let display = [];
        for(let i=0;i<tempDeck.length;i++) {
            display[i] = ' ' + tempDeck[i].slice(0,-4);
        }
        $('#showDeck').html('deck: ' + display);
        if (display.length >0) {
            $('#showDeck').css('display', 'block');
        }
    }, function() {
        $('#showDeck').css("display", "none");}
    );

    $(document).on('click','img', function(event) {
        let clicked = event.target;

        if (clicked.classList.contains('selected')) {
            clicked.classList.remove('selected');
        } else {
            clicked.classList.add('selected');
        }

        if (clicked.parentElement.id == 'hand') {
            let selected = document.getElementById('hand').querySelectorAll('img.selected');
            let hunt = [];
            let medicine = [];
            let draw = [];
            let dig = [];
            let drawV = 0;
            let digV = 0;
            let huntV = 0;
            let medV = 0;

            document.getElementById("discard").disabled = false;

            if (turn > 1) {
                document.getElementById("fight").disabled = false;
            }
            
            for (let i=0; i<selected.length; i++) {
                type = cardTypes[selected[i].src.split('/').pop().split('.')[0]];

                draw.push(type[2]);
                dig.push(type[3]);
                hunt.push(type[4]);
                medicine.push(type[5]);

                for (i in hunt) {
                    huntV += hunt[i];
                }
                for (i in medicine) {
                    medV =+ medicine[i];
                }
            }

            if (selected.length == 0) {
                document.getElementById("draw").disabled = true;
                document.getElementById("buy").disabled = true;
                document.getElementById("dig").disabled = true;
                document.getElementById("discard").disabled = true;
            } else {
                if (nullCheck(draw) || (player.action.includes('draw'))) {
                    document.getElementById("draw").disabled = true; 
                } else {
                    for (i in draw) {
                        drawV += draw[i];
                    }
                    document.getElementById("draw").disabled = false; 
                }
                if (nullCheck(dig) || (player.action.includes('dig'))) {
                    document.getElementById("dig").disabled = true; 
                } else {
                    for (i in dig) {
                        digV += dig[i];
                    }
                    document.getElementById("dig").disabled = false; 
                }

                if (huntV+medV == 0 || (player.action.includes('buy'))) {
                    document.getElementById("buy").disabled = true; 
                } else {
                    document.getElementById("buy").disabled = false;
                }
            }
        }
    });

    $('#discard').click(function() {
        let selected =  document.getElementById('hand').querySelectorAll('img.selected');
        for (let i=0;i<selected.length;i++) {
            let add = selected[i].src.split('/').pop();
            let place = player.hand.indexOf(add);
            player.hand.splice(place, 1);

            junkyard.push(add);
        }
        selected.forEach(e => e.remove());

        $('#junk').html('junkyard: ' + junkyard.length);
        $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));
    });

    $('#end').click(function() {
        turn += 1;
        let selected = document.getElementsByClassName('card');
        let length = selected.length;
        for (let i=0; i<length; i++) {
            selected[0].remove();
        }

        $('#discardPile').html('discard: ' + player.discard.length);

        if (turn > 2) {
            let value = 0;
            fightSaved.forEach(
                (element) => value += cardTypes[element.split('.')[0]][6]
            );

            if (value > 4) {
                let prize = contested.pop();
                $('#fightPreview').show();
                $('#fightPreview').html('Fight Won: ' + prize.split('.')[0]);
                player = addDeck(player, prize);
            } else {
                contested.pop();
                $('#fightPreview').show();
                $('#fightPreview').html('Fight Lost');
            }
        }
        $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));
        player = endTurn(hand, player);
        if (endGame(player, contested, cardTypes)) {
            return;
        } else {
            fightSaved = [];
            $('#fightSave').html(null);
            junkyard = shuffle(junkyard);
            $('#deck').html('deck: ' + player.deck.length);
            $('#junk').html('junkyard: ' + junkyard.length);
            $('#contested').html('contested: ' + contested.length);
            player.action = [];
        };
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

        let power = 0
        fightSaved.forEach(
            (element) => power += cardTypes[element.split('.')[0]][6]
        );

        $('#fightSave').html('Power saved for the fight: ' + power);

        player.action.push('fight');
    });

    $('#buy').click(function() {
        var selected = document.getElementById('shop').querySelectorAll('img.selected');
        if (selected.length != 1) {
            alert('select 1 only');
        } else {
            let hunt = [];
            let medicine = [];
            let huntV = 0;
            let medV = 0;
            let selectedHand = document.getElementById('hand').querySelectorAll('img.selected');
            for (let i=0; i<selectedHand.length; i++) {
                type = cardTypes[selectedHand[i].src.split('/').pop().split('.')[0]];

                hunt.push(type[4]);
                medicine.push(type[5]);
                for (i in hunt) {
                    huntV += hunt[i];
                }
                for (i in medicine) {
                    medV += medicine[i];
                }
            }

            let adding = selected[0].src.split('/').pop();
            let cost = cardTypes[adding.split('.')[0]].slice(0,2);
            let inven = shopInven[adding.split('.')[0]];

            if (inven > 0) {
                if (adding.split('.')[0] == 'thug') {
                    let combined = huntV + medV;
                    if (combined >= 6) {
                        player = addDeck(player, adding);
                        shopInven[adding.split('.')[0]] = inven - 1;
                        selectedHand.forEach(e => e.remove());
                        
                        selected[0].classList.remove('selected');

                        document.getElementById("buy").disabled = true; 
                        player.action.push('buy');
                    } else {
                        alert('not enough resources');
                    }
                } else if (huntV >= cost[0] && medV >= cost[1]) {
                    player = addDeck(player, adding);
                    shopInven[adding.split('.')[0]] = inven - 1;
                    selectedHand.forEach(e => e.remove());
                    
                    selected[0].classList.remove('selected');
                    document.getElementById("buy").disabled = true; 
                    player.action.push('buy');
                } else {
                    alert('not enough resources');
                }
            } else {
                alert('out of stock');
            }
        }

        $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));
        updateShop(shop, shopInven);
    });

    $('#draw').click(function() {
        let selected = document.getElementById('hand').querySelectorAll('img.selected');
        let drawNum = 0;
        for (let i=0;i<selected.length; i++) {
            drawNum += cardTypes[selected[i].src.split('/').pop().split('.')[0]][2];
        }
        let handSize = 5 - selected.length + drawNum;
        document.getElementById('hand').style.setProperty('--hand-size', handSize);
        for (let i=0;i<drawNum; i++) {
            player = draw(hand, player);
        }
        selected.forEach(e => e.remove());

        document.getElementById("draw").disabled = true; 
        player.action.push('draw');
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
        
        let add = document.createElement("button");
        add.setAttribute("id", 'addDig');
        add.setAttribute("class", 'btn btn-primary digButton');
        add.setAttribute("type", 'button');
        add.innerHTML = 'Add to deck';
        document.getElementById('junkSample').appendChild(add);

        let close = document.createElement("button");
        close.setAttribute("id", 'closeDig');
        close.setAttribute("class", 'btn btn-primary digButton');
        close.setAttribute("type", 'button');
        close.innerHTML = 'none';
        document.getElementById('junkSample').appendChild(close);

        document.getElementById("dig").disabled = true;
        player.action.push('dig');
    });

    $(document).on('click', '#closeDig', function() {
        let reshuffle = document.getElementById('junkSample').querySelectorAll('img');
        for (let i=0; i<reshuffle.length; i++) {
            junkyard.push(reshuffle[i].src.split('/').pop());
        }
        document.getElementById('junkSample').querySelectorAll('button').forEach(e => e.remove());
        document.getElementById('junkSample').style.display='none';

        $('#junk').html('junkyard: ' + junkyard.length);
        $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));
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
        $('#tribeCount').html('Tribe Count: ' + tribeCount(player, cardTypes));
    });
}

init();