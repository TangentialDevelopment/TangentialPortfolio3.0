count = 0;
var todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
document.getElementById('todoCount').innerHTML = todoCount;

function newTask(index) {
    let newInput = document.createElement('input');
    newInput.setAttribute('type',"text");
    newInput.setAttribute('class',"task " + index);
    newInput.setAttribute('placeholder',"+ Add New Task");
    newInput.setAttribute('oninput',"typed(" + index + ")");

    return newInput;
}

function done(index) {
    let tasklist = document.getElementById('openTasks').getElementsByTagName('input');

    for(let i=0; i<tasklist.length; i++) {
        let value = tasklist[i].classList[1];
        if (value == index) {
            var place = tasklist[i];
        }
    }

    if (place.classList.length == 2) {
        place.classList.add('done');
        place.setAttribute('disabled', true);
    } else {
        place.classList.remove('done');
        place.removeAttribute('disabled');
    }
}

function typed(update) {
    let size = document.querySelectorAll('.task').length;
    let input = document.querySelectorAll('.task')[size-1];

    if (input.value != '') {
        let draggable = document.createElement('li');
        draggable.setAttribute('id', update);
        draggable.setAttribute('class', 'dropzone');
        draggable.setAttribute('draggable', true);
        let close = document.createElement('input')
        let attr = 'form-check-input reopen' + update;
        close.setAttribute('class', attr);
        close.setAttribute("type", 'checkbox');
        close.setAttribute("onchange", 'done('+ update +')');

        draggable.appendChild(input);
        draggable.appendChild(close);
        document.getElementById('openTasks').appendChild(draggable);


        count += 1;
        document.getElementById('form').appendChild(newTask(count));
        input.focus()

        let todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
        document.getElementById('todoCount').innerHTML = todoCount;
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
    
    document.getElementById('stop').addEventListener('click', function () {
        clearInterval(intervalId);
        display.textContent = '';
    });
}

window.onload = function () {
    display = document.querySelector('#time');
    document.getElementById('newTimer').addEventListener('click', function() {
        let time = document.getElementById('newTime').value;
        if (!time) {
            time = 0;
        }
        let timer = time, minutes, seconds;
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        document.getElementById('start').addEventListener('click', function () {
            if (time == 0) {
                console.log('no time')
            } else {
                startTimer(time, display);
            }
        });
        document.getElementById('newTime').value = '';
    });
};