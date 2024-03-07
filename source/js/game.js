var images = ['../../source/images/cake.png','../../source/images/bomb.png'];
var simages = ['../../source/images/cake.png','../../source/images/bomb.png','../../source/images/claymore.png','../../source/images/strawberry.png']
var imagesp = ['../../source/images/cake.png','../../source/images/bomb.png','../../source/images/claymore.png','../../source/images/strawberry.png','../../source/images/kitty.png','../../source/images/timebomb.png']

function getImage(streak) {
    if (streak > 400) {
        var num = Math.floor(Math.random()*6);
        return imagesp[num];
    } else if (streak > 200) {
        var num = Math.floor(Math.random()*4);
        return simages[num];
    } else {
        var num = Math.floor(Math.random()*2);
        return images[num];
    }
}

function initialImages(order, img) {
    for (let i=0; i<img.length; i++) {
        var src = img[i].getAttribute('src');
        if (!src) {
            var temp = getImage(0)
            order[i] = temp;
        }
    }
    for (let j=0; j<4; j++) {
        temp = getImage(0);
        order.push(temp);
    }

    return order;
}

function updateImages(order, img, counter, streak) {
    if (counter == 17) { //17
        order.shift();
        order.push('../../source/images/scake.png');
    } else if ((counter+3) % 20 == 1 && counter>20) {
        order.shift();
        order.push('../../source/images/scake.png');
    } else {
        temp = getImage(streak);
        order.shift();
        order.push(temp);
    }

    for (let i=0; i<6; i++) {
        var temp = order[i]
        img[i].src = temp;
    }

    return counter+=1;
}

function cakify(order, img) {
    var set = order[0];
    for (i=1; i<=6; i++) {
        order[i] = set;
    }

    for (let i=0; i<6; i++) {
        var temp = order[i]
        img[i].src = temp;
    }
}

function addScore(score, streak) {
    if (streak >= 400) {
        streak += 5;
        score += 500;
    } else if (streak >= 300) {
        streak += 5;
        score += 400;
    } else if (streak >= 200) {
        streak += 5;
        score += 300;
    } else if (streak >= 155) {
        streak += 5;
        score += 200;
    } else if (streak >= 100) {
        streak += 4;
        score += 100;
    } else if (streak >= 95) {
        streak += 4;
        score += 100;
    } else if (streak >= 50) {
        streak += 3;
        score += 100;
    } else if (streak >= 20) {
        streak += 2;
        score += 100;
    } else {
        streak += 1;
        score += 100;
    }

    return [score, streak]
}

function threeSecondLockout(load, streak) {
    var displayTimer = document.getElementById('timer');
    $('.blackout').show();
    $('.game-start').show();
    if (displayTimer.textContent != '0') {
        var timed = document.querySelector('#inital-timer');

        var initial = Date.now(),
            length,
            display;
        function initalTime() {
            length = 3 - (((Date.now() - initial) / 1000) | 0);
            display = (length % 60) | 0;
            timed.textContent = display;

            if (displayTimer.textContent == '0') {
                $('.game-start').hide();
                return 0;
            } else {
                if (display==0 && load) {
                    clearInterval(interval);
                    keyActive = true;
                    $('.blackout').hide();
                    $('.game-start').hide();
                } else if (display==0 && !load) {
                    clearInterval(interval);
                    $('.blackout').hide();
                    $('.game-start').hide();
                    startGame();
                }
        
                if (length <= 0) {
                    initial = Date.now() + 1000;
                }
            }
        };
    
        initalTime();
        var interval = setInterval(initalTime, 1000);
        streak.innerHTML = '0';
    
        return 0;
    }
}

function startGame() {
    var sequence = [];
    var img = document.getElementsByName('canvas');
    var score = 0;
    var streak = 0;
    var counter = 0;
    var add = [];
    var displayTimer = document.getElementById('timer');
    var visibleScore = document.getElementById('score');
    var visibleMultiplyer = document.getElementById('multiplier');
    left = ['../../source/images/cake.png','../../source/images/strawberry.png','../../source/images/kitty.png'];
    right = ['../../source/images/bomb.png','../../source/images/claymore.png','../../source/images/timebomb.png'];

    //PUT THE TIMER BACK
    var start = Date.now(),
        diff;
    function timer() {
        diff = 60 - (((Date.now() - start) / 1000) | 0);
        displayTimer.textContent = diff;
        
        if (diff== 0) {
            clearInterval(intervalId);
            $('.blackout').show();
            alert(score);
        }

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    timer();
    var intervalId = setInterval(timer, 1000);

    sequence = initialImages(sequence, img);
    counter = updateImages(sequence, img, counter, streak);

    document.onkeydown = function (e) {
        if (!$('.blackout').is(':visible')) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (left.includes(sequence[0])) {
                        counter = updateImages(sequence, img, counter, streak);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else if (sequence[0] == '../../source/images/scake.png'){
                        counter = updateImages(sequence, img, counter, streak);
                        cakify(sequence, img);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else {
                        streak = threeSecondLockout(true, visibleMultiplyer);
                    }
                    break;
                case 'ArrowRight':
                    if (right.includes(sequence[0])) {
                        counter = updateImages(sequence, img, counter, streak);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else {
                        streak = threeSecondLockout(true, visibleMultiplyer);
                    }
                    break;
            }
        }
    };
}

function init() {
    $('#overlay').show();
    $('.popup-load').show();

    $('.start').click(function() {
        $('.popup-load').hide();
        $('#overlay').appendTo(document.body).remove();
        threeSecondLockout(false, 0);

        return false;
      });
    
}

init()