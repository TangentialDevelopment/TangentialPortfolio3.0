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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function init() {
    var sequence = []
    var img = document.getElementsByName('canvas');
    var keyActive = true

    sequence = initialImages(sequence, img);
    updateImages(sequence, img);

    document.onkeydown = function (e) {
        if (keyActive) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (sequence[0] == '../../source/images/cake.png') {
                        updateImages(sequence, img);
                    } else {
                        keyActive = false;
                        setTimeout(() => {
                            keyActive = true;
                        }, 5000);
                    }
                    break;
                case 'ArrowRight':
                    if (sequence[0] == '../../source/images/bomb.png') {
                        updateImages(sequence, img);
                    } else {
                        keyActive = false;
                        setTimeout(() => {
                            keyActive = true;
                        }, 5000);
                    }
                    break;
            }
        }
    };
}

init()