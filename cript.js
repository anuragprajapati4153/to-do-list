document.addEventListener('DOMContentLoaded', () => {
    let taskInput = document.getElementById("task-input")
    let addTaskButton = document.getElementById("add-task-btn")
    let taskList = document.getElementById("todo-list")
    let deleteTaskButton = document.getElementsByClassName("delete-btn")

    //when the page loaded we fetch the task data from local storage. if there is no task on the local storage then we start with empty string
    let taskArray = JSON.parse(localStorage.getItem('storedTask')) || []

    //render all the task on the screen by adding the listitem
    taskArray.forEach(task => renderTask(task));

    //add the task on the local storage when the addTask button was clicked
    addTaskButton.addEventListener("click", () => {
        const inputText = taskInput.value.trim();
        if (inputText == "") return;
        const TaskObject = {
            id: Date.now(),
            isCompleted: false,
            text: inputText
        }
        //add into array
        taskArray.push(TaskObject)
        //also add task on the local storage
        saveTask()
        //empty the input field
        taskInput.value = ""

        console.log(taskArray);
        renderTask(TaskObject)
    })

    function renderTask(task) {
        //creating an li element
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if (task.isCompleted) li.classList.add('isCompleted')
        //set inner html
        li.innerHTML = `<span>${task.text}</span> <button>delete</button>`;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return
            task.isCompleted = !task.isCompleted
            li.classList.toggle('isCompleted')
            saveTask()
        });

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation()
            taskArray = taskArray.filter(t => t.id != task.id)
            li.remove();
            saveTask();
        })
        //add and show in the task list
        taskList.appendChild(li)
    }

    function saveTask() {
        localStorage.setItem("storedTask", JSON.stringify(taskArray))
    }


})