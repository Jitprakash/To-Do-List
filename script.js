// Define a variable to store the list of to-do items
const inputFeild = document.querySelector("#input-text");
const submitBtn = document.querySelector("#createTodoBtn");
const todoContainer = document.querySelector(".to-do-list-container");
let checkButton;
let dltButton;

//! Get the todos
const getTodos = () => {
    let todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);//Convert the todos back into object
}

let todoList = getTodos();//Get The todo list

//! Just Capitalize the first letter of String
//? Why Do it?? , don't know i just liked it this way
const capitalize = (todo) => {
    return todo.charAt(0).toUpperCase() + todo.slice(1);
}

//!Create a new Todo node
const createTodo = (todo, todoIndex) => {
    let newTodo = document.createElement("li");
    newTodo.classList.add("to-do");
    newTodo.innerHTML = `
            <label class="user-text ${todo.checked ? 'checked' : ''}" id="to-do-text${todoIndex}" for="check${todoIndex}" >${capitalize(todo.text)}</label>
            <div class="buttons">
                <div>
                <input type="checkbox" id="check${todoIndex}" class="hide" ${todo.checked ? 'checked' : ''}>
                <img src="./asset/${todo.checked ? 'Check-Mark.png' : 'Circle.png'}" alt="O" id="checkBtn${todoIndex}" for="check${todoIndex}" class="checkButton">
                </div>
                <img src="./asset/Trash.png" alt="🗑️" id="dltBtn${todoIndex}" class="dltButton">
            </div>
            `;
    return newTodo; // return
}

//! Edit The Ui of To-Do node
const editToDoList = (check, checkIndex, checkedBox) => {
    let userTextId = "to-do-text" + checkIndex;
    let userText = document.querySelector("#" + userTextId);
    if (checkedBox.checked) {
        userText.classList.add("checked");
        check.setAttribute("src", "./asset/Check-Mark.png");
    } else {
        userText.classList.remove("checked");
        check.setAttribute("src", "./asset/Circle.png");
    }
    todoList[checkIndex].checked = checkedBox.checked; // Update the checked status in the todoList array
    saveTodos(); // Save the updated todoList to localStorage
}

//! Assign event to both checkBtn and dltBtn
const assignEvent = () => {
    //? For checkButton
    document.querySelectorAll(".checkButton").forEach((check, checkIndex) => {
        check.addEventListener("click", () => {
            let checkedBox = check.previousElementSibling;
            checkedBox.checked = !checkedBox.checked;
            console.log(checkedBox.checked);
            editToDoList(check, checkIndex, checkedBox);
        });
    });
    //? For dltButton
    document.querySelectorAll(".dltButton").forEach((btn, btnIndex) => {
        btn.addEventListener("click", () => {
            todoList.splice(btnIndex, 1);
            saveTodos();
            updateTheUl();
        });
    });
}

//!Update the  to do container according to the list 
const updateTheUl = () => {
    todoContainer.innerHTML = "";//Set the Container to nothing
    todoList.forEach((todo, todoIndex) => {
        let newTodo = createTodo(todo, todoIndex);//Catch the returned new to-do node
        todoContainer.append(newTodo);//Append the new To-Do node to the container
        saveTodos();//Save the todos in localStorage
    });
    assignEvent();
}


//!Add event so that when we click the + sign a new todo is addedd
submitBtn.addEventListener("click", () => {
    let inputText = inputFeild.value.trim();
    if (inputText === "") {
        alert("Please Enter Something!!");
    } else {
        todoList.push({ text: inputText, checked: false }); // Save the todo in the list with checked status
        updateTheUl(); // Update the to do container according to the list 
        inputFeild.value = "";
    }
});

//! SAve the Todos in the localStorage
const saveTodos = () => {
    let todoJson = JSON.stringify(todoList);//Convert the todo array into String
    localStorage.setItem("todos", todoJson);//Save
}



// Load the to-do list from localStorage when the page loads
document.addEventListener("DOMContentLoaded", updateTheUl);