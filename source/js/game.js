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
    if (counter == 17) {
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

function init() {
    var sequence = []
    var img = document.getElementsByName('canvas');
    var keyActive = true
    var score = 0;
    var streak = 0;
    var counter = 0;
    var visiblescore = document.getElementById('score');
    var count = 60*5;
    var timer = document.querySelector('#timer');

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
                        score += 100;
                        visiblescore.innerHTML = (score);
                        streak += 1;
                    } else if (sequence[0] == '../../source/images/scake.png'){
                        counter = updateImages(sequence, img, counter);
                        score += 100;
                        visiblescore.innerHTML = (score);
                        streak += 1;
                    } else {
                        keyActive = false;
                        $('.blackout').show();
                        setTimeout(() => {
                            keyActive = true;
                            $('.blackout').hide();
                        }, 3000);
                        streak=0;
                    }
                    break;
                case 'ArrowRight':
                    if (sequence[0] == '../../source/images/bomb.png') {
                        counter = updateImages(sequence, img, counter);
                        score += 100;
                        visiblescore.innerHTML = (score);
                        streak += 1;
                    } else {
                        keyActive = false;
                        $('.blackout').show();
                        setTimeout(() => {
                            keyActive = true;
                            $('.blackout').hide();
                        }, 3000);
                        streak=0;
                    }
                    break;
            }
        }
    };
}

init()