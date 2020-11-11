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
    
    // Remove old entry and add the edited task
    if (input.hasAttribute("disabled")) { 
      list.splice(list.indexOf(task), 1, 'EDITED_TASK');
    } else {
      list.splice(list.indexOf('EDITED_TASK'), 1, task);
      (list === todo.todoList) ? renderTodos() : null;
    }

    if (task === "") {
      taskNameValidator(input);
    } else {
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
        style="color: #444"
        class="app__todo--edit"
        onclick="todo.editTodo(this, todo.todoList)">
        &#9998;
      </button>
      <button 
        class="app__todo--check"
        onclick="todo.completeTodo('${task}')">
        &#10004;
      </button>
      <button 
        class="app__todo--delete"
        onclick="todo.deleteTodo('${task}', todo.todoList)">
        &#10007;
      </button>
    </div>
  `);

  document.getElementById('todos').innerHTML = todoMarkup.join("");
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
        &#9998;
      </button>
      <button 
        class="app__todo--delete"
        onclick="todo.deleteTodo('${task}', todo.completedList)">
        &#10007;
      </button>
    </div>
  `);

  document.getElementById('finTodos').innerHTML = completedMarkup.join("");
}

function taskNameValidator(task) {
  task.classList.add('invalidTask');
  task.placeholder = 'Invalid task name';
}

document.getElementById('addTask').addEventListener('click', todo.addTodo);