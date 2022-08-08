const CLASSES = {
    TODO_ITEM: "todo_item",
    DELETE_BTN: "deleteBtn",
    DONE_COLOR: "done",
  };
  const SELECTORS = {
    TODO_ITEM: ".todo_item",
  };
  
  const URL = "https://62054479161670001741b708.mockapi.io/api/todo/";
  
  function getTodoList(URL) {
    return fetch(URL).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Problem with fetching TodoList");
    });
  }
  
  function updateTodo(id, todo) {
    return fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Sorry todo isn't updated");
    });
  }
  
  function deleteTodo(id) {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Sorry error with Deleting todo");
    });
  }
  
  function createTodo(todo) {
    return fetch(URL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Sorry problem with Creating Todo");
    });
  }
  
  const form = document.querySelector(".todo");
  const todoWrapper = document.querySelector(".todo_items");
  const descTaskInput = document.querySelector(".todo_input");
  
  let listFromServer = [];
  
  form.addEventListener("submit", onFormSubmit);
  todoWrapper.addEventListener("click", onWrapperClick); 
  
  function displayTodoList() {
    getTodoList()
      .then((listData) => {
        renderTodoList(listData);
        setList(listData);
      })
      .catch(errorCatcher);
  }
  
  displayTodoList();
  
  function setList(data) {
    listFromServer = data;
  }
  
  function onFormSubmit(e) {
    e.preventDefault();
  }
  
  function onWrapperClick(e) {
    const target = e.target;
    const todoEl = getTodoElement(target);
  
    if (todoEl) {
      if (target.classList.contains(CLASSES.DELETE_BTN)) {
        removeTodoElement(todoEl);
      }
      if (target.classList.contains(CLASSES.TODO_ITEM)) {
        todoAddDoneColor(todoEl);
      }
    }
  }
  
  function removeTodoElement(todo) {
    const getElemId = getElementId(todo);
    deleteTodo(getElemId)
      .then(() => {
        todo.remove();
      })
      .catch(errorCatcher);
  }
  
  function renderTodoList(list) {
    const getHtml = list.map(renderHtml).join("");
    todoWrapper.innerHTML = getHtml;
  }
  
  function renderHtml(el) {
    const done = el.status ? CLASSES.DONE_COLOR : "";
  
    return `
      <li class='${CLASSES.TODO_ITEM}  ${done}' data-id=${el.id} >
      ${el.title}
          <span>
              <button class=${CLASSES.DELETE_BTN}>Delete</button>
          </span>
      </li>
    `;
  }
  
  function todoAddDoneColor(el) {
    const elemId = getElementId(el);
    const currentElem = getCurrentElem(elemId);
    const status = !currentElem.status;
  
    updateTodo(elemId, { status: status })
      .then(() => {
        el.classList.toggle(CLASSES.DONE_COLOR);
      })
      .catch();
  }
  
  function getTodoElement(el) {
    return el.closest(SELECTORS.TODO_ITEM);
  }
  
  function getElementId(el) {
    return el.dataset.id;
  }
  
  function errorCatcher(e) {
    alert(e.message);
  }
  
  function getCurrentElem(id) {
    return listFromServer.find((elem) => elem.id === id);
  }