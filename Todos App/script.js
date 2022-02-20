const form = document.getElementById("form");
const inputEl = document.getElementById("input");
const todoParentEl = document.getElementById("todos");


const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log(inputEl.value);
    addTodo();

    inputEl.value = '';
});

function addTodo(oldTodo) {

    let todoText = inputEl.value;
    if(oldTodo){
        todoText = oldTodo.text;
    }

    const todo = document.createElement('li');

    todo.innerText = todoText;

    if(oldTodo && oldTodo.completed){
        todo.classList.add("completed");
    }

    todo.addEventListener("click", ()=> {
       todo.classList.toggle("completed"); 
       updateLocalStorage();
    });

    todo.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        todo.remove();
        updateLocalStorage();
    });

    todoParentEl.appendChild(todo);
    updateLocalStorage();
}

function updateLocalStorage(){
    const todos = document.querySelectorAll("li");
    // console.log(todos);

    const allTodos = [];

    todos.forEach(todo => {
        // console.log(todo);
        allTodos.push({
            text: todo.innerText,
            completed: todo.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(allTodos));
}

