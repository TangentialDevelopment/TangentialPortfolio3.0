// const canvas = document.querySelector('canvas')
// const c = canvas.getContext('2d')
// addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight
// })

// c.strokeStyle = 'white'
// c.fillStyle = 'blue'
// c.rect(100, 20, 150, 100)
// c.stroke()
// c.fill()

// c.fillStyle = 'red'
// c.fillRect(400, 500, 300, 250)

// c.fillStyle = 'green'
// c.fillRect(1500, 500, 300, 250)

var images = ['../../source/images/cake.png','../../source/images/bomb.png'];
function getImage() {
    var num = Math.floor(Math.random()*2);
    return images[num];
}

var img = document.getElementsByName('canvas');

for (let i=0; i<img.length; i++) {
    var src = img[i].getAttribute('src');
    if (!src) {
        var temp = getImage()
        img[i].src = temp;
    }
}
