function init() {
    var img = document.getElementsByName('hand');

    for (let i=0; i<5; i++) {
        img[i].classList.add("card");
    }
}

init();