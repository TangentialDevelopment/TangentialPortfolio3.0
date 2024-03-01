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

    return order;
}

function updateImages(order, img) {
    temp = getImage();
    order.shift();
    order.push(temp);

    for (let i=0; i<order.length; i++) {
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

function init() {
    var sequence = []
    var img = document.getElementsByName('canvas');
    var keyActive = true
    var score = 0;
    var visiblescore = document.getElementById('score');
    var count = 60*5;
    var timer = document.querySelector('#timer');
    startTimer(count, timer);

    sequence = initialImages(sequence, img);
    updateImages(sequence, img);

    document.onkeydown = function (e) {
        if (keyActive) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (sequence[0] == '../../source/images/cake.png') {
                        updateImages(sequence, img);
                        score += 100;
                        visiblescore.innerHTML = (score);
                    } else {
                        keyActive = false;
                        $('.blackout').show();
                        setTimeout(() => {
                            keyActive = true;
                            $('.blackout').hide();
                        }, 3000);
                    }
                    break;
                case 'ArrowRight':
                    if (sequence[0] == '../../source/images/bomb.png') {
                        updateImages(sequence, img);
                        score += 100;
                        visiblescore.innerHTML = (score);
                    } else {
                        keyActive = false;
                        $('.blackout').show();
                        setTimeout(() => {
                            keyActive = true;
                            $('.blackout').hide();
                        }, 3000);
                    }
                    break;
            }
        }
    };
}

init()