let todoList = [];
let completedList = [];

function addTodo() {
  const task = document.getElementById("newTask").value;
  
  todoList.push(task);
  let todoMarkup = todoList.map(task => `
    <div class="app__todo">
      <input type="text" value="${task}" disabled />
      <button class="app__todo--check">
        &#10004;
      </button>
      <button class="app__todo--delete">
        &#10007;
      </button>
      <button class="app__todo--edit">
        &#9998;
      </button>
    </div>
  `);

  document.getElementById('todos').innerHTML = todoMarkup.join("");
}

function completeTodo() {
  const task = todoList.splice();

}

function deleteTodo() {

}

function editTodo() {

}
