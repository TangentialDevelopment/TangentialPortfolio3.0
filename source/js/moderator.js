$('#done').hide();
var doneCount = document.getElementById('done').getElementsByTagName('input').length;
document.getElementById('doneCount').innerHTML = doneCount;
var doneCount = document.getElementById('openTasks').getElementsByTagName('li').length;
document.getElementById('todoCount').innerHTML = doneCount;

count = 0;
function newTask(index) {
    let newInput = document.createElement('input');
    newInput.setAttribute('type',"text");
    newInput.setAttribute('class',"task " + index);
    newInput.setAttribute('placeholder',"+ Add New Task");
    newInput.setAttribute('oninput',"typed(" + index + ")");

    return newInput;
}

function doneTask(index, place, entry) {
    let done = document.createElement('input');
    done.setAttribute('type',"text");
    done.setAttribute('class',"task "+ index);
    done.setAttribute('value', entry);
    done.setAttribute('onchange',"typed(" + place + ")");
    document.getElementById('done').appendChild(done);
    let open = document.createElement('input')
    let attr = 'form-check-input reopen' + index;
    open.setAttribute('class', attr);
    open.setAttribute("type", 'checkbox');
    open.setAttribute("onclick", 'reopen('+ index +')');
    document.getElementById('done').appendChild(open);
}

function reopenTask(index, entry) {
    let reopenbtn = document.createElement('input')
    let attr = 'form-check-input reopen' + index;
    reopenbtn.setAttribute('class', attr);
    reopenbtn.setAttribute("type", 'checkbox');
    reopenbtn.setAttribute("onchange", 'reopen('+ index +')');
    document.getElementById('openTasks').appendChild(reopenbtn);
    let reopen = document.createElement('input');
    reopen.setAttribute('type',"text");
    reopen.setAttribute('class',"task "+ index);
    reopen.setAttribute('value', entry);
    document.getElementById('openTasks').appendChild(reopen);
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
        close.setAttribute("onchange", 'reopen('+ update +')');

        draggable.appendChild(input);
        draggable.appendChild(close);
        document.getElementById('openTasks').appendChild(draggable);


        count += 1;
        document.getElementById('form').appendChild(newTask(count));

        var doneCount = document.getElementById('done').getElementsByTagName('input').length;
        document.getElementById('doneCount').innerHTML = doneCount;
        var todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
        document.getElementById('todoCount').innerHTML = todoCount;
    }
}

function finished(index) {
    let tasklist = document.getElementById('openTasks').getElementsByTagName('input');
    let tasklistbtn = document.getElementById('openTasks').getElementsByTagName('button');

    for(let i=0; i<tasklist.length; i++) {
        let value = tasklist[i].classList[1];
        if (value == index) {
            var place = tasklist[i];
            var btn = tasklistbtn[i];
        }
    }

    let entry = place.value;
    doneTask(index, place, entry);

    place.remove();
    btn.remove();

    var doneCount = document.getElementById('done').getElementsByTagName('input').length;
    document.getElementById('doneCount').innerHTML = doneCount;
    var todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
    document.getElementById('todoCount').innerHTML = todoCount;
}

function reopen(index) {
    let tasklist = document.getElementById('done').getElementsByTagName('input');
    let tasklistbtn = document.getElementById('done').getElementsByTagName('button');

    for(let i=0; i<tasklist.length; i++) {
        let value = tasklist[i].classList[1];
        if (value == index) {
            var place = tasklist[i];
            var btn = tasklistbtn[i];
        }
    }

    let entry = place.value;
    reopenTask(index, entry);
    

    place.remove();
    btn.remove();

    var doneCount = document.getElementById('done').getElementsByTagName('input').length;
    document.getElementById('doneCount').innerHTML = doneCount;
    var todoCount = document.getElementById('openTasks').getElementsByTagName('li').length;
    document.getElementById('todoCount').innerHTML = todoCount;
}

document.getElementById('completed').onclick = () => {
    $('#list').removeClass('active');
    $('#form').hide();
    $('#completed').addClass('active');
    $('#done').show();
}
document.getElementById('list').onclick = () => {
    $('#list').addClass('active');
    $('#form').show();
    $('#completed').removeClass('active');
    $('#done').hide();
}