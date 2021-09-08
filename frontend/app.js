let tasks
let taskList = document.querySelector('#task-list')
let addTaskbutton = document.querySelector('.add-task-button')

addTaskbutton.addEventListener('click', addTask)

let taskListUrl = 'http://127.0.0.1:8000/api/task-list/'
let taskUpdateUrl = 'http://127.0.0.1:8000/api/task-update/'
let taskDeleteUrl = 'http://127.0.0.1:8000/api/task-delete/'
let taskCreateUrl = 'http://127.0.0.1:8000/api/task-create/' 


function get_tasks() {
    fetch(taskListUrl).then((data) => data.json()).then(function(data) {
        tasks = data
        return tasks.map(function(task) {
            let li = document.createElement('li')
            li.id = task.id
            let taskDiv = document.createElement('div')
            taskDiv.classList.add('task')
            let taskStatusDiv = document.createElement('div')
            taskStatusDiv.classList.add('task-status')
            taskStatusDiv.addEventListener('click', changeStatus)
            if (task.completed === true) {
                taskDiv.classList.add('completed')
            }
            // let taskEdit = document.createElement('div')
            // taskEdit.classList.add('edit')
            // taskEdit.addEventListener('click', editTask)
            let taskDetails = document.createElement('div')
            taskDetails.classList.add('task-detail')
            taskDetails.textContent = `${task.title}`
            let trashDiv = document.createElement('div')
            trashDiv.classList.add('trash')
            trashDiv.addEventListener('click', deleteTask)
            taskDiv.append(taskStatusDiv)
            // taskDiv.append(taskEdit)
            taskDiv.append(taskDetails)
            taskDiv.append(trashDiv)
            li.append(taskDiv)
            taskList.append(li)
        })
    })
}

function get_task_id(taskId) {
    for (const task in tasks) {
        if (tasks[task].id === taskId) {
            return task
        }
    }
}

document.addEventListener('load', get_tasks())

function changeStatus(){
    let taskId = parseInt(this.parentNode.parentNode.id)
    let arrayId = get_task_id(taskId)
    if (tasks[arrayId].completed === true) {
        tasks[arrayId].completed = false
        this.parentNode.classList.remove('completed')
    }
    else {
        tasks[arrayId].completed = true
        this.parentNode.classList.add('completed')
    }
    
    fetch(taskUpdateUrl+taskId, {
        method: 'PUT',
        body: JSON.stringify(tasks[arrayId]),
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log('Updated successfully')
        console.log(res)
    })
}


function deleteTask() {
    let taskId = parseInt(this.parentNode.parentNode.id)
    let arrayId = get_task_id(taskId)

    tasks.splice(arrayId, 1)

    fetch(taskDeleteUrl+taskId, {
        method: 'DELETE',
        // body: JSON.stringify(tasks[arrayId]),
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log('Updated successfully')
        console.log(res)
    })
}

function addTask() {
    let task = document.getElementById('task-label').value
    console.log(`Adding task ${task}`)

    if (task){
        let li = document.createElement('li')
        // li.id = task.id
        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
        let taskStatusDiv = document.createElement('div')
        taskStatusDiv.classList.add('task-status')
        taskStatusDiv.addEventListener('click', changeStatus)
        if (task.completed === true) {
            taskDiv.classList.add('completed')
        }
        // let taskEdit = document.createElement('div')
        // taskEdit.classList.add('edit')
        // taskEdit.addEventListener('click', editTask)
        let taskDetails = document.createElement('div')
        taskDetails.classList.add('task-detail')
        taskDetails.textContent = `${task}`
        let trashDiv = document.createElement('div')
        trashDiv.classList.add('trash')
        trashDiv.addEventListener('click', deleteTask)
        taskDiv.append(taskStatusDiv)
        // taskDiv.append(taskEdit)
        taskDiv.append(taskDetails)
        taskDiv.append(trashDiv)
        li.append(taskDiv)
        taskList.append(li)

        fetch(taskCreateUrl, {
            method: 'POST',
            body: JSON.stringify({
                "title": task,
                "completed": "false"
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log('Updated successfully')
            console.log(res)
        })
    }
}

function editTask() {

}