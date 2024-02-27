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

function init() {
    var sequence = []
    var img = document.getElementsByName('canvas');

    sequence = initialImages(sequence, img);
    updateImages(sequence, img);

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowLeft':
                console.log('left');
                break;
            case 'ArrowRight':
                console.log('right');
                break;
        }

        updateImages(sequence, img);
    };
}

init()