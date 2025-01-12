document.addEventListener("DOMContentLoaded", () => {
    let todoInput = document.getElementById("task-input")
    let addTaskButton = document.getElementById("add-task-btn")
    let todoList = document.getElementById("todo-list")

    //getting task from local storage in JSON formet and load into array using parse when the page loaded 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    //when the page load it give me the task in console page
    tasks.forEach((task) => renderTask(task));
    addTaskButton.addEventListener("click", function () {
        const taskText = todoInput.value.trim()
        if (taskText == "") return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask)
        saveTask()
        renderTask(newTask)
        todoInput.value = ""
        console.log(tasks)

    })

    function renderTask(task) {
        const li = document.createAttribute('li')
        li.setAttribute("data-id", task.id)
        if (task.completed) li.classList.add("completed")
        li.innerHTML = `<span> ${task.text}</span>
        <button class="delete-btn" >delete</button>`;
        li.addEventListener("clicck", (e) => {
            if (e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed");
            saveTask();
        });
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id != task.id)
            li.removeChild()
            saveTask()
        })
        todoList.appendChild(li)
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})