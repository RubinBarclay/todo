let todoList = [];
let completedList = []

function renderTodos() {

  // remove edit inline style, add SVG's

  let todoMarkup = todoList.map(task => `
    <div class="app__todo">
      <input type="text" value="${task}" disabled />
      <button 
        style="color: #444"
        class="app__todo--edit"
        onclick="editTodo(this)">
        &#9998;
      </button>
      <button 
        class="app__todo--check"
        onclick="completeTodo('${task}')">
        &#10004;
      </button>
      <button 
        class="app__todo--delete"
        onclick="deleteTodo('${task}')">
        &#10007;
      </button>
    </div>
  `);

  document.getElementById('todos').innerHTML = todoMarkup.join("");
}

function renderCompleted() {

  // remove edit inline style, add SVG's

  let completedMarkup = completedList.map(task => `
    <div class="app__todo">
      <input type="text" value="${task}" disabled />
      <button
        style="color: #444" 
        class="app__todo--edit"
        onclick="editTodo(this)">
        &#9998;
      </button>
      <button 
        class="app__todo--delete"
        onclick="deleteTodo('${task}')">
        &#10007;
      </button>
    </div>
  `);

  document.getElementById('finTodos').innerHTML = completedMarkup.join("");
}

function addTodo() {
  const task = document.getElementById("newTask");

  if (task.value === "") {
    taskNameValidator(task);
  } else {
    task.classList.remove('invalidTask');
    task.placeholder = 'Enter new task';

    todoList.push(task.value);
    renderTodos();
  }
}

function completeTodo(task) {
  todoList.splice(todoList.indexOf(task), 1);
  completedList.push(task);

  renderTodos();
  renderCompleted();
}

function deleteTodo(task) {
  if (todoList.includes(task)) {
    todoList.splice(todoList.indexOf(task), 1);
    renderTodos();
  } else {
    completedList.splice(completedList.indexOf(task), 1);
    renderCompleted();
  }
}

function editTodo(element) {
  let input = element.parentNode.firstElementChild;
  let task = input.value;

  if (task === "") {
    taskNameValidator(input);
  } else {
    input.toggleAttribute('disabled'); // Turns input on and off
  }
}

function taskNameValidator(task) {
  task.classList.add('invalidTask');
  task.placeholder = 'Invalid task name';
}