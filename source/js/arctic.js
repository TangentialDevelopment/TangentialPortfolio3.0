function init() {
    var img = document.getElementsByName('hand');

    for (let i=0; i<5; i++) {
        img[i].classList.add("card");
    }

    $('img').click(function(event) {
        var clicked = event.target;
        if (clicked.classList[1] == 'selected') {
            clicked.classList.remove('selected');
        } else {
            clicked.classList.add('selected');
        }
    });

    $('#play').click(function() {
        for (let i=0; i<img.length; i++) {
            if (img[i].classList.contains('selected')) {
                img[i].style.display = 'none';
            }
        }
    });
}

init();