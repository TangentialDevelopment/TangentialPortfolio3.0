var images = ['../../source/images/cake.png','../../source/images/bomb.png'];

function init() {
    var img = document.getElementsByName('canvas');

    for (let i=0; i<img.length; i++) {
        var src = img[i].getAttribute('src');
        if (!src) {
            var temp = getImage()
            img[i].src = temp;
        }
    }

    document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowLeft':
                console.log('left');
                break;
            case 'ArrowRight':
                console.log('right');
                break;
        }
        
        temp = getImage();
        img[0].src = temp;
    };
}

function getImage() {
    var num = Math.floor(Math.random()*2);
    return images[num];
}



init()