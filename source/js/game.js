var images = ['../../source/images/cake.png','../../source/images/bomb.png'];

function getImage() {
    var num = Math.floor(Math.random()*2);
    return images[num];
}

function initialImages(order, img) {
    for (let i=0; i<img.length; i++) {
        var src = img[i].getAttribute('src');
        if (!src) {
            var temp = getImage()
            order[i] = temp;
        }
    }
    for (let j=0; j<4; j++) {
        temp = getImage();
        order.push(temp);
    }

    return order;
}

function updateImages(order, img, counter) {
    if (counter == 17) { //17
        order.shift();
        order.push('../../source/images/scake.png');
    } else if ((counter+3) % 20 == 1 && counter>20) {
        order.shift();
        order.push('../../source/images/scake.png');
    } else {
        temp = getImage();
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

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 
        
        if (minutes==0 && seconds==0) {
            clearInterval(intervalId);
            keyActive = false;
            $('.blackout').show();
        }

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    timer();
    var intervalId = setInterval(timer, 1000);
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

function opps(streak) {
    keyActive = false;
    $('.blackout').show();
    setTimeout(() => {
        keyActive = true;
        $('.blackout').hide();
    }, 3000);
    streak.innerHTML = '0';
}

function init() {
    var sequence = []
    var img = document.getElementsByName('canvas');
    var keyActive = true
    var score = 0;
    var streak = 0;
    var counter = 0;
    var add = [];
    var count = 60*5;
    var timer = document.querySelector('#timer');
    var visibleScore = document.getElementById('score');
    var visibleMultiplyer = document.getElementById('multiplier');

    //PUT THE TIMER BACK
    // startTimer(count, timer);

    sequence = initialImages(sequence, img);
    counter = updateImages(sequence, img, counter);

    document.onkeydown = function (e) {
        if (keyActive) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (sequence[0] == '../../source/images/cake.png') {
                        counter = updateImages(sequence, img, counter);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else if (sequence[0] == '../../source/images/scake.png'){
                        counter = updateImages(sequence, img, counter);
                        cakify(sequence, img);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else {
                        opps(visibleMultiplyer);
                    }
                    break;
                case 'ArrowRight':
                    if (sequence[0] == '../../source/images/bomb.png') {
                        counter = updateImages(sequence, img, counter);
                        add = addScore(score, streak);
                        score = add[0];
                        streak = add[1];
                        visibleScore.innerHTML = score;
                        visibleMultiplyer.innerHTML = streak;
                    } else {
                        opps(visibleMultiplyer);
                    }
                    break;
            }
        }
    };
}

init()