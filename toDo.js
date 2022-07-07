const CLASSES = {
  TODO_ITEM: 'todo_item',
  DELETE_BTN: 'deleteBtn',
  DONE_COLOR: 'done',
};
const SELECTORS = {
  TODO_ITEM: '.todo_item',
};

const addTask = document.querySelector('#add_task');
const descTaskInput = document.querySelector('#description_task');
const todoWrapper = document.querySelector('#todo_wrapper');
const form = document.querySelector('#todo');


form.addEventListener('submit', onFormSubmit);
todoWrapper.addEventListener('click', onTodoWrapperClick);

function onFormSubmit(event) {
  event.preventDefault();
  const todo = getTodo();

  if (!isValidTodo(todo)) {
    showError();
    return;
  }

  addTodo(todo);
  clearForm();
}

function onTodoWrapperClick(e) {
  const target = e.target;
  const todoItem = getItem(target);
  if (todoItem) {
    if (target.classList.contains(CLASSES.DELETE_BTN)) {
      removeItem(todoItem);
    }
    if (target.classList.contains(CLASSES.TODO_ITEM)) {
      addDoneColor(target);
    }
  }
}

function addTodo(todo) {
  const todoItem = `
    <li class=${CLASSES.TODO_ITEM}> ${todo}
        <button class=${CLASSES.DELETE_BTN}>Delete</button>
    </li>
    
    `;
  todoWrapper.insertAdjacentHTML('beforeend', todoItem);
}

function addDoneColor(todo) {
  return todo.classList.toggle(CLASSES.DONE_COLOR);
}

function removeItem(todo) {
  return todo.remove();
}

function getItem(item) {
  return item.closest(SELECTORS.TODO_ITEM);
}

function isValidTodo(todo) {
  return todo.trim() !== '';
}

function clearForm() {
  form.reset();
}

function getTodo() {
  return descTaskInput.value;
}

function showError() {
  return alert('Пустое поле');
}
