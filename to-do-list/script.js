const todoInput = document.getElementById('todoInput');
const addTaskButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('todoList');

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const listItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    const deleteButton = document.createElement('button');

    taskSpan.textContent = taskText;
    deleteButton.textContent = 'Delete';

    // Delete task on button click
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = '';
}

// Add task when the button is clicked
addTaskButton.addEventListener('click', addTask);

// Add task when Enter key is pressed
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
