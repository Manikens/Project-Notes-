const addTaskBtn = document.getElementById ('add-task-btn');
const deskTaskInput = document.getElementById ('task-list');
const dynamicList = document.querySelector ('.dynamic-list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let dynamicItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const creatTemplate = (task, index) => {
    const note = document.createElement('div');
    note.className = 'note';

    const noteWrapper = document.createElement('div');
    noteWrapper.className = `dynamic-item ${task.completed ? 'checked' : ''}`;

    const noteDescription = document.createElement('div');
    noteDescription.className = 'description';

    const description = document.createTextNode(task.description);

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'buttons-wrapper';

    const completeButton = document.createElement('input');
    completeButton.className = 'checkbox-complete';
    completeButton.type = 'checkbox';
    completeButton.checked = task.completed;
    completeButton.onclick = () => completeList(index);

    const deleteText = document.createTextNode('Удалить');

    const deleteButton = document.createElement('button');
    deleteButton.className ='btn-delete';
    deleteButton.checked = task.completed;
    deleteButton.onclick = () => deleteList(index);
    deleteButton.value = 'Удалить';

    deleteButton.appendChild(deleteText);

    buttonsWrapper.appendChild(completeButton);
    buttonsWrapper.appendChild(deleteButton);

    noteDescription.appendChild(description);

    noteWrapper.appendChild(noteDescription);
    noteWrapper.appendChild(buttonsWrapper);

    note.appendChild(noteWrapper);

    return note;
}

const filterList = () => {
    const activeList = tasks.length && tasks.filter(item => item.completed  == false);
    const completedList = tasks.length && tasks.filter(item => item.completed  == true);
    tasks = [...activeList,...completedList];
}

const fillHtmlList = () => {
    dynamicList.innerHTML = '';
    if(tasks.length > 0) {
        filterList();
        tasks.forEach((item, index) => {
            dynamicList.appendChild(creatTemplate(item, index))
        });
        dynamicItemElems = document.querySelectorAll('.dynamic-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeList = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        dynamicItemElems[index].classList.add('checked');
    } 
    else {
        dynamicItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteList = index => {
    dynamicItemElems[index].classList.add('delete')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}