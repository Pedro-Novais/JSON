import getConfig from "./config.js"
import addTaskBack from "./addXML.js"
import deleteTask from "./deleteXML.js"
import updateTaskBack from "./updateXML.js"
import order from "./orderPriority.js"

const api = 'http://localhost:5000/tasks'
const apiConfig = 'http://localhost:5000/config'

let priorityOrderJson = true;

document.addEventListener('DOMContentLoaded', getConfig(apiConfig, loadingConfig))
//document.addEventListener('DOMContentLoaded', loadingTask)

const level = document.querySelectorAll('.choose-priority')
level.forEach(function(level) {
  level.addEventListener('click', function() {
      clearNewClick()
      priorityId = level.getAttribute('id');
      if(priorityId == "priority-one"){
        priorityId = 0
      }
      else if(priorityId == "priority-two"){
        priorityId = 1
      }
      else if(priorityId == "priority-three"){
        priorityId = 2
      }

      if(priorityId !== null){
        markNewClick(priorityId)
      }
  });
});

const btn = document.querySelector('#btn-add')
btn.addEventListener('click', addTask)

let priorityId = null;
function addTask(){
  let task_put = document.querySelector('#task-add')
  const input = document.querySelector('#task-add').value

  if(priorityId == null){
    priorityId = 0
  }
  if(input == "" || input == null){
    return false
  }
  priorityId = priorityId + 1
  let val = task_put.value
  let data= {
    task: val,
    priority: priorityId
  }
    addTaskBack(api, data)
}

function loadingConfig(configs){
  priorityOrderJson = configs["orderPriority"]

  loadingTask(priorityOrderJson)
}

function loadingTask(priorityJson){
  if (priorityJson == true){
    for(let i = 3; i >= 1; i--){
      order(api, orderPriority, i)
    }
  }else{
    order(api, orderPriority)
  }
}

function orderPriority(order){
  if(order.length > 0){
    for(let i = 0; i < order.length; i++){
      createTask(order, i)
    }
  }
}

function createTask(taskJson, index){
  const container = document.querySelector('#task-made')

  const div = document.createElement('div')
  div.setAttribute('class', 'tasks')

  const priorityAction = document.createElement('div')
  priorityAction.setAttribute('class', 'priority-action')

  createNameTask(taskJson, index, div)
  createPriorityTask(taskJson, div, priorityAction, index)
  createActions(div, priorityAction, index, taskJson)
  container.appendChild(div)
}

function createNameTask(json, i, div){
  const p = document.createElement('p')
  p.classList.add('task-puted')

  let name = document.createTextNode(json[i]["task"])

  p.appendChild(name)
  div.appendChild(p)
}

function createPriorityTask(json, div, priority,id){
  const container = document.createElement('div')
  container.setAttribute('class', 'priority-task')
  let level = []
  let priJson = json[id]["priority"]
  for(let i = 0; i < 3; i++){
    level[i] = document.createElement('div')
    level[i].setAttribute('class', 'priority-level')

    container.appendChild(level[i])
    priority.appendChild(container)
  }

    for(let i = 0; i < priJson; i++){
        level[i].style.backgroundColor='#d6ac5e';
    }
    div.appendChild(priority)
}

function createActions(div, priority,i, json){
  let id = json[i]['id']
  const div_action = document.createElement('div')
  div_action.setAttribute('class', 'container-actions')

  const i_add = document.createElement('img')
  const i_del = document.createElement('img')
  const i_edit = document.createElement('img')

  i_add.setAttribute('class', 'actions')
  i_del.setAttribute('class', 'actions')
  i_edit.setAttribute('class', 'actions')

  i_add.setAttribute('id', `add-${id}`)
  i_del.setAttribute('id', `del-${id}`)
  i_edit.setAttribute('id', `edit-${id}`)

  i_add.setAttribute('src', './svg/check-solid.svg')
  i_del.setAttribute('src', './svg/xmark-solid.svg')
  i_edit.setAttribute('src', './svg/pencil-solid.svg')

  i_add.setAttribute('height', '20px')
  i_del.setAttribute('height', '20px')
  i_edit.setAttribute('height', '17px')

  i_add.setAttribute('alt', 'check-in')
  i_del.setAttribute('alt', 'remove')
  i_edit.setAttribute('alt', 'edit')

  div_action.appendChild(i_add)
  div_action.appendChild(i_del)
  div_action.appendChild(i_edit)

  priority.appendChild(div_action)
  div.appendChild(priority)

  i_add.addEventListener('click', function(){
    deleteTask(api, id)
  })

  i_del.addEventListener('click', () => {
    deleteTask(api, id)
  })

  i_edit.addEventListener('click', () => {
    updateTask(id)
  })

}

function updateTask(id){
  let inputName = window.prompt('Digite a nova tarefa')
  let inputPriority = window.prompt('Digite a prioridade')

  let data={
    task: inputName,
    priority: inputPriority
  }

  updateTaskBack(api, id, data)
}

function markNewClick(index){
    let level = document.querySelectorAll('.choose-priority')
    for(let i = 0; i <= index; i++){
        level[i].style.backgroundColor='#d6ac5e';
    }
}

function clearNewClick(){
    let level = document.querySelectorAll('.choose-priority')
    for(let i = 0; i < level.length; i++){
        level[i].style.backgroundColor='#6acfc9';
    }
}