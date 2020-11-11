//const { render } = require("node-sass");

let todo = {
  todoList: [],
  completedList: [],
  addTodo: () => {
    const task = document.getElementById("newTask");

    if (task.value === "") {
      taskNameValidator(task);
    } else {
      task.classList.remove('invalidTask');
      task.placeholder = 'Enter new task';

      todo.todoList.push(task.value);
      renderTodos();
    }
  },
  completeTodo: (task) => {
    todo.todoList.splice(todo.todoList.indexOf(task), 1);
    todo.completedList.push(task);

    renderTodos();
    renderCompleted();
  },
  deleteTodo: (task, list) => {
    list.splice(list.indexOf(task), 1);
    (list === todo.todoList) ? renderTodos() : renderCompleted(); // re-render list
  },
  editTodo: (elem, list) => {
    let input = elem.parentNode.firstElementChild;
    let task = input.value;
    
    if (task === "") {
      taskNameValidator(input);
    } else {
      
      // Remove old entry and add the edited task
      if (input.hasAttribute("disabled")) { 
        list.splice(list.indexOf(task), 1, '');
      } else {
        list.splice(list.indexOf(''), 1, task);
        (list === todo.todoList) ? renderTodos() : null;
      }
      
      input.toggleAttribute('disabled'); // Toggles input field on and off
    }
  }
}

function renderTodos() {

  // remove edit inline style, add SVG's

  let todoMarkup = todo.todoList.map(task => `
    <div class="app__todo">
      <input type="text" value="${task}" disabled />
      <button 
        class="app__todo--edit"
        onclick="todo.editTodo(this, todo.todoList)">
        <svg class="icon icon-pencil">
          <use xlink:href="./img/sprites.svg#icon-pencil"></use>
        </svg>
      </button>
      <button 
        class="app__todo--check"
        onclick="todo.completeTodo('${task}')">
        <svg class="icon icon-plus">
          <use xlink:href="./img/sprites.svg#icon-check"></use>
        </svg>
      </button>
      <button 
        class="app__todo--delete"
        onclick="todo.deleteTodo('${task}', todo.todoList)">
        <svg class="icon icon-plus">
          <use xlink:href="./img/sprites.svg#icon-close"></use>
        </svg>
      </button>
    </div>
  `);

  let targetElem = document.getElementById('todos');
  let parentElem = targetElem.parentElement;

  if (todo.todoList.length === 0) {
    parentElem.classList.add('hidden');
  } else {
    parentElem.classList.remove('hidden');
  }
  
  targetElem.innerHTML = todoMarkup.join("");
}

function renderCompleted() {

  // remove edit inline style, add SVG's

  let completedMarkup = todo.completedList.map(task => `
    <div class="app__todo">
      <input type="text" value="${task}" disabled />
      <button
        style="color: #444" 
        class="app__todo--edit"
        onclick="todo.editTodo(this, todo.completedList)">
        <svg class="icon icon-pencil">
          <use xlink:href="./img/sprites.svg#icon-pencil"></use>
        </svg>
      </button>
      <button 
        class="app__todo--delete"
        onclick="todo.deleteTodo('${task}', todo.completedList)">
        <svg class="icon icon-plus">
          <use xlink:href="./img/sprites.svg#icon-close"></use>
        </svg>
      </button>
    </div>
  `);

  let targetElem = document.getElementById('completed');
  let parentElem = targetElem.parentElement;

  if (todo.completedList.length === 0) {
    parentElem.classList.add('hidden');
  } else {
    parentElem.classList.remove('hidden');
  }

  targetElem.innerHTML = completedMarkup.join("");
}

function taskNameValidator(task) {
  task.classList.add('invalidTask');
  task.placeholder = 'Invalid task name';
}

document.getElementById('addTask').addEventListener('click', todo.addTodo);