const addTask = document.querySelector('#add_task');
const descTaskInput = document.querySelector('#description_task');
const todoWrapper = document.querySelector('#todo_wrapper');

addTask.addEventListener('click', () => {
    if (descTaskInput.value === '') return;
    createElements(descTaskInput.value);
    descTaskInput.value = '';
}
)

function createElements(value) {
    const createItem = document.createElement('li');
    createItem.className = 'todo_item';
    createItem.textContent = value;
    todoWrapper.append(createItem);
}