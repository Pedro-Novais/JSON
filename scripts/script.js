import getConfig from "./utils/config.js"
import addTaskBack from "./utils/addXML.js"
import deleteTaskBack from "./utils/deleteXML.js"
import updateTaskBack from "./utils/updateXML.js"
import order from "./utils/orderPriority.js"
import getStatisticsBack from "./utils/getStatistics.js"
import { modalEdit, modalRemovetext } from "./utils/modals.js"

const api = 'http://localhost:5000/tasks'
const apiConfig = 'http://localhost:5000/config'
const apiStatistics = "http://localhost:5000/statistic/"

let statistic = null;

//document.addEventListener('DOMContentLoaded', getConfig(apiConfig, loadingConfig))
getConfig(apiStatistics, getStatistics)
getConfig(apiConfig, loadingConfig)
getPriority()

const btn = document.querySelector('#btn-add')
const task_put = document.querySelector('#task-add')

if (task_put) {
  task_put.addEventListener('click', () => {
    task_put.removeAttribute('class', 'watch-out')
  })
}
if (btn) {
  btn.addEventListener('click', addTask)
}

let priorityId = null;

function addTask() {
  const agora = new Date();
  const minutos = agora.getMinutes();
  const sec = agora.getSeconds();
  console.log(`${agora.getHours()}:${minutos}:${sec}`)
  const input = document.querySelector('#task-add').value

  if (priorityId == null) {
    priorityId = 0
  }
  if (input == "" || input == null) {
    task_put.setAttribute('class', 'watch-out')
    return false
  }
  priorityId = priorityId + 1
  let val = task_put.value
  let data = {
    task: val,
    priority: priorityId
  }

  changeStatistic(priorityId, 0)
  addTaskBack(api, data)
}

function loadingConfig(configs) {
  let priorityOrderJson = configs["orderPriority"]

  loadingTask(priorityOrderJson)
}

function loadingTask(priorityJson) {
  if (priorityJson == true) {
    for (let i = 3; i >= 1; i--) {
      order(api, orderPriority, i)
    }
  } else {
    order(api, orderPriority)
  }
}

function orderPriority(order) {
  if (order.length > 0) {
    for (let i = 0; i < order.length; i++) {
      createTask(order, i)
    }
  }
}

function createTask(taskJson, index) {
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

function createNameTask(json, i, div) {
  const p = document.createElement('p')
  p.classList.add('task-puted')

  let name = document.createTextNode(json[i]["task"])

  p.appendChild(name)
  div.appendChild(p)
}

function createPriorityTask(json, div, priority, id) {
  const container = document.createElement('div')
  container.setAttribute('class', 'priority-task')
  let level = []
  let priJson = json[id]["priority"]
  for (let i = 0; i < 3; i++) {
    level[i] = document.createElement('div')
    level[i].setAttribute('class', 'priority-level')

    container.appendChild(level[i])
    priority.appendChild(container)
  }

  for (let i = 0; i < priJson; i++) {
    level[i].style.backgroundColor = '#05DBF2';
  }

  div.appendChild(priority)
}

function createActions(div, priority, i, json) {
  let id = json[i]['id']
  let levelPriority = json[i]['priority']
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

  i_add.addEventListener('click', () => {
    modalRemove(json, id, 1)
    validUpdate(id, 2, levelPriority)
  })

  i_del.addEventListener('click', () => {
    modalRemove(json, id, 0)
    validUpdate(id, 1, levelPriority)
  })

  i_edit.addEventListener('click', () => {
    modalChange()
    validUpdate(id, 0)
  })

}

function modalRemove(json, id, determinate) {
  let modalDiv = document.createElement('div');
  modalDiv.setAttribute('class', 'modal')
  modalDiv.setAttribute('id', 'modal-remove')

  const body = document.querySelector('body')

  const main = document.querySelector('main')
  const container = document.querySelector('#container')
  container.style.display = "none"

  //main.style.height="100vh"
  modalDiv.innerHTML = modalRemovetext

  main.appendChild(modalDiv)

  const titleAction = document.querySelector('#title-determinate')

  if (determinate == 0) {
    let title = document.createTextNode("Excluir tarefa")
    titleAction.appendChild(title)
  }
  if (determinate == 1) {
    let title = document.createTextNode("Concluir tarefa")
    titleAction.appendChild(title)
  }
  modalRemovePriority(json, id)
}

function modalRemovePriority(json, id) {
  const levelMark = document.querySelectorAll('[level]')
  let nameTask;
  let levelTask;

  for (let i = 0; i <= json.length; i++) {
    if (id == json[i]["id"]) {
      nameTask = json[i]["task"]
      levelTask = json[i]["priority"]
      break
    }
  }

  let textTask = document.querySelector('#task-remove-text')
  let text = document.createTextNode(nameTask)

  textTask.appendChild(text)

  for (let i = 0; i < levelTask; i++) {
    levelMark[i].style.backgroundColor = "#05DBF2"
  }
}

function modalChange() {
  let modalDiv = document.createElement('div');
  modalDiv.setAttribute('class', 'modal')
  modalDiv.setAttribute('id', 'modal-edit')
  const levelPiority = document.querySelectorAll('.choose-priority')

  for (let i = 0; i < levelPiority.length; i++) {
    levelPiority[i].getAttribute('id')
    levelPiority[i].removeAttribute('id')
    levelPiority[i].removeAttribute('class')
  }

  const body = document.querySelector('body')
  const main = document.querySelector('main')

  const container = document.querySelector('#container')
  container.style.display = "none"

  modalDiv.innerHTML = modalEdit;

  main.appendChild(modalDiv)
  getPriority()

}

function validUpdate(id, determinate, level = null) {
  const btnNewTask = document.querySelector('#btn-edit-edit')
  const btnCancelNewTask = document.querySelector('#btn-edit-cancel')

  btnNewTask.addEventListener('click', function (event) {
    if (determinate == 0) {
      const inputTaskElement = document.querySelector('#input-edit')
      const inputTask = document.querySelector('#input-edit').value
      event.preventDefault()
      if (inputTask == "") {
        inputTaskElement.style.boxShadow = "rgba(216, 34, 18, 0.863) 0px 0px 0px 2px, rgba(228, 5, 5, 0.65) 0px 4px 6px -1px, rgba(153, 26, 26, 0.08) 0px 1px 0px inset"
        inputTaskElement.addEventListener("click", () => {
          inputTaskElement.style.boxShadow = "none"
        })
        return false
      } else {
        updateTask(id, inputTask)
      }
    } else if (determinate == 1) {
      deleteTask(level, id)
    } else if (determinate == 2) {
      finishTask(level, id)
    }
  })

  btnCancelNewTask.addEventListener('click', () => {
    let priority = ["priority-one", "priority-two", "priority-three"]
    let modalType = ".modal"
    let divModal = document.querySelector(modalType)
    divModal.remove();

    const container = document.querySelector('#container')
    container.style.display = "flex"

    if (determinate == 0) {
      const levelPiority = document.querySelectorAll('[mark]')

      for (let i = 0; i < levelPiority.length; i++) {
        levelPiority[i].setAttribute('id', priority[i])
        levelPiority[i].setAttribute('class', 'choose-priority')
      }
    }
  })
}

function finishTask(level, id) {
  changeStatistic(level, 1)
  deleteTaskBack(api, id)
}

function deleteTask(level, id) {
  console.log(level)
  changeStatistic(level, 2)
  deleteTaskBack(api, id)
}

function changeStatistic(priorityId, determinate) {

  if (determinate == 0) {
    let newCreate = statistic[priorityId - 1]["created"] + 1

    let dataStatistic = {
      created: newCreate
    }

    updateTaskBack(apiStatistics, priorityId, dataStatistic, 0)
  }

  else if (determinate == 1) {
    console.log(priorityId)
    let newCreate = statistic[priorityId - 1]["finished"] + 1

    let dataStatistic = {
      finished: newCreate
    }

    updateTaskBack(apiStatistics, priorityId, dataStatistic, 0)
  }

  else if (determinate == 2) {
    let newCreate = statistic[priorityId - 1]["canceled"] + 1

    let dataStatistic = {
      canceled: newCreate
    }

    updateTaskBack(apiStatistics, priorityId, dataStatistic, 0)
  }
}

function updateTask(id, newTask) {
  let data = {
    task: newTask,
    priority: priorityId + 1
  }
  updateTaskBack(api, id, data, 1)
}

function getPriority() {
  const level = document.querySelectorAll('.choose-priority')
  level.forEach(function (level) {
    level.addEventListener('click', function () {
      clearNewClick()
      priorityId = level.getAttribute('id');
      if (priorityId == "priority-one") {
        priorityId = 0
      }
      else if (priorityId == "priority-two") {
        priorityId = 1
      }
      else if (priorityId == "priority-three") {
        priorityId = 2
      }

      if (priorityId !== null) {
        markNewClick(priorityId)
      }
      console.log(priorityId)
    });
  });
}

function getStatistics(json) {
  statistic = json.reverse()
  console.log(json)
}

function markNewClick(index) {
  let level = document.querySelectorAll('.choose-priority')
  for (let i = 0; i <= index; i++) {
    level[i].style.backgroundColor = '#05DBF2';
  }
}

function clearNewClick() {
  let level = document.querySelectorAll('.choose-priority')
  for (let i = 0; i < level.length; i++) {
    level[i].style.backgroundColor = '#0487D9';
  }
}