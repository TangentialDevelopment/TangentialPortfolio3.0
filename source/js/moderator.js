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

function typed(update) {
    let size = document.querySelectorAll('.task').length;
    let input = document.querySelectorAll('.task')[size-1];

    if (input.value != '') {
        let draggable = document.createElement('li');
        draggable.setAttribute('id', update);
        draggable.setAttribute('class', 'dropzone');
        draggable.setAttribute('draggable', true);
        let close = document.createElement('input')
        let attr = 'form-check-input done reopen' + update;
        close.setAttribute('class', attr);
        close.setAttribute("type", 'checkbox');
        close.setAttribute("onchange", 'reopen('+ update +')');

        draggable.appendChild(input);
        draggable.appendChild(close);
        document.getElementById('openTasks').appendChild(draggable);


        count += 1;
        document.getElementById('form').appendChild(newTask(count));

        let todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
        document.getElementById('todoCount').innerHTML = todoCount;
    }
}