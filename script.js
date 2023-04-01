// to-do list
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// create an array to store the to-dos
const todos = [];

// add a click event listener to the add to-do button
addTodoButton.addEventListener("click", function () {
    // get the to-do text from the input
    const todoText = todoInput.value;

    // create a new to-do object and add it to the array
    const newTodo = {
        text: todoText,
        complete: false,
    };
    todos.push(newTodo);

    // clear the input
    todoInput.value = "";

    // render the to-dos to the page
    renderTodos();
});

function renderTodos() {
    // clear the existing to-dos from the list
    todoList.innerHTML = "";

    // loop through the to-dos and create a list item for each one
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        // create a new list item for the to-do
        const todoListItem = document.createElement("li");

        // add the to-do text to the list item
        const todoText = document.createElement("span");
        todoText.textContent = todo.text;
        if (todo.complete) {
            todoText.classList.add("completed");
        }
        todoListItem.appendChild(todoText);

        // add a complete button to the list item
        const todoCompleteButton = document.createElement("button");
        todoCompleteButton.textContent = "Complete";
        todoCompleteButton.addEventListener("click", function () {
            todo.complete = !todo.complete;
            todoText.classList.toggle("completed");
        });
        todoListItem.appendChild(todoCompleteButton);

        // add a delete button to the list item
        const todoDeleteButton = document.createElement("button");
        todoDeleteButton.textContent = "Delete";
        todoDeleteButton.addEventListener("click", createDeleteTodoHandler(i));
        todoListItem.appendChild(todoDeleteButton);

        // add the new list item to the todoList element
        todoList.appendChild(todoListItem);
    }
}

function deleteTodoHandler(index) {
    return function () {
        todos.splice(index, 1);
        renderTodos();
    };
}

function createDeleteTodoHandler(index) {
    return function () {
        deleteTodoHandler(index)();
    };
}
