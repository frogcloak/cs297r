//Credit: original tutorial posted by Ayo on https://freshman.tech/todo-list/

// Create a list to store the todo list
let todoItems = [];

// A function that gets the input from the text box from the output of addTodo and renders the todo list
function renderTodo(todo) {

    // select the portion of the DOM to render the checklist
    const list = document.querySelector('.js-todo-list');
    // select the clicked item in the list to make changes if needed
    const item = document.querySelector(`[data-key='${todo.id}']`);

    // if the deleted flag is true, then remove the item from the DOM
    if (todo.deleted) {
        item.remove();
        return
    }

    // Set the status of this new item to be either "done" or "" based on the input's "checked" status; items marked with done will change its CSS style
    const isChecked = todo.checked ? 'done': '';

    // Create a node that contains the checked status, id, and html component of each todo item
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    // For each todo item, render a checkbox, the content of the todo item, a favorite icon, and a delete icon
    // If the favorite flag is true, then render the solid star, otherwise render a hollow star
    if (!todo.favorite) {
        node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button type="button" class="btn favorite-todo js-favorite-todo"><i class='far fa-star' style='font-size:30px;color:orange'></i></button>       
        <button class="delete-todo js-delete-todo"><svg><use href="#delete-icon"></use></svg></button>`;
    } else {
        node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button type="button" class="btn favorite-todo js-favorite-todo"><i class='fas fa-star' style='font-size:30px;color:orange'></i></button>       
        <button class="delete-todo js-delete-todo"><svg><use href="#delete-icon"></use></svg></button>`;
    }


    // if an item is clicked (i.e. being updated), then replace the node with the item; otherwise, add the new node to the list
    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }

}

// A function that creates a todo item with its id (defined by the timestamp of enter), checked status (default false),
// and favorite status (default false). It then updates the todo list, and then passes the new todo item to the
// renderTodo function to render into the DOM
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        favorite: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    renderTodo(todo);
}

// A function that changes the checked flag of a clicked todo item to its opposite state (i.e. true to false, or false to true)
function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

// A function that adds a deleted flag to the stored list of todos and update the list of todos by removing the deleted element,
// and then calls the renderTodo function to update the DOM
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

// A function that changes the favorite flag of a clicked todo item to its opposite state (i.e. true to false, or false to true)
function toggleFav(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].favorite = !todoItems[index].favorite;
    renderTodo(todoItems[index]);
}

// Listen for updates of the text box: once it is submitted and not empty, call the addTodo function to update the todo list
document.querySelector('.js-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim(); //remove trailing and ending spaces
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

// Listen for any clicks within the segment of the DOM that shows the todo list.
// If the click is on the tick, then call the toggleDone function to update the done/unfinished status of the item.
// If the click is on delete, then call the deleteTodo function to remove the todo.
// If the click is on the favorite button, then call the toggleFav function to change the status of the star
document.querySelector('.js-todo-list').addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }

    if (event.target.classList.contains('fa-star')) {
        const itemKey = event.target.parentElement.parentElement.dataset.key;
        toggleFav(itemKey);
    }
});