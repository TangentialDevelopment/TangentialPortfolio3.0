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
    } else {
        place.classList.remove('done');
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

        let todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
        document.getElementById('todoCount').innerHTML = todoCount;
    }
}