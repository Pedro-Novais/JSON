import { addTaskBack, deleteTaskBack, updateTaskBack, order } from "./utils/functionsReq.js"
import { modalEdit, modalRemovetext } from "./utils/modals.js"
import { verifyUser } from "./utils/verificationUser.js"

const apiTask = '/api/user/tasks'
const apiStatistic = '/api/user/statistic'

let priorityId = null;
let activeHover = null;

export async function interactorList() {
  priorityId = null
  const responseVerificationUser = await verifyUser()

  statusUser(responseVerificationUser)
  
  const configJson = responseVerificationUser.responseData.configurations
  const statistic = responseVerificationUser.responseData.statistic

  const arrayStatistic = [statistic.priorityOne, statistic.priorityTwo, statistic.priorityThree]

  loadingTask(0)

  getPriority()
  hoverPriority()

  const btn = document.querySelector('#btn-add')
  const task_put = document.querySelector('#task-add')

  btn.addEventListener('click', addTask)

  function statusUser(user) {
    if (!user.ok) {

      window.location.href = "/login"
    } else if (user.ok) {

      return true
    }
  }

  //Function that make the verification and add new tasks from user
  async function addTask() {
    const token = localStorage.getItem('token')
    const input = document.querySelector('#task-add').value

    if (input == "" || input == null) {
      task_put.setAttribute('class', 'watch-out')

      task_put.addEventListener('click', () => {
        task_put.removeAttribute('class', 'watch-out')
      })

      return false
    }

    if (priorityId == null) {
      priorityId = 0
    }

    priorityId = priorityId + 1
    let val = task_put.value

    let data = {
      task: val,
      priority: priorityId
    }

    try {
      const resultStatistic = await changeStatistic(priorityId, 0)
      const resultAdding = await addTaskBack(apiTask, data, token)

      if (resultAdding.ok) {
        loadingTask(1)
        priorityId = null
      }

    } catch (err) {
      console.log(err)
    }

  }

  async function loadingTask(determinate = null) {
    try {
      const token = localStorage.getItem('token')
      const tasks = await order(apiTask, token)
      //configJson.orderPriority = true

      if (determinate != null) {
        const tasksElement = document.querySelectorAll('.tasks')
        for (let i = 0; i < tasksElement.length; i++) {

          tasksElement[i].remove()

        }
        cleanValues()
        clearNewClick()
        activeHover = null

      }

      if (tasks.length != 0) {
        if (configJson.orderPriority == true) {

          let taskOrderPriority = []
          let state = 3;

          for (let i = 0; i <= tasks.length; i++) {
            if (i == tasks.length) {
              i = 0;
              state = state - 1
            }
            if (state == 0) {
              break
            }
            if (state == 3) {
              if (tasks[i].priority == 3) {
                taskOrderPriority.push(tasks[i])
              }
            } else if (state == 2) {
              if (tasks[i].priority == 2) {
                taskOrderPriority.push(tasks[i])
              }
            } else if (state == 1) {
              if (tasks[i].priority == 1) {
                taskOrderPriority.push(tasks[i])
              }
            }
          }

          orderPriority(taskOrderPriority)

        }
        else {

          orderPriority(tasks)

        }
      }

    } catch (error) {
      console.log(error)
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
    const idTask = taskJson[index]['_id']

    const container = document.querySelector('#task-made')

    const div = document.createElement('div')
    div.setAttribute('class', 'tasks')
    div.setAttribute('id', `_${idTask}`)

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

    let idTask = json[i]['_id']
    let levelPriority = json[i]['priority']
    const div_action = document.createElement('div')
    div_action.setAttribute('class', 'container-actions')

    const i_add = document.createElement('img')
    const i_del = document.createElement('img')
    const i_edit = document.createElement('img')

    i_add.setAttribute('class', 'actions')
    i_del.setAttribute('class', 'actions')
    i_edit.setAttribute('class', 'actions')

    i_add.setAttribute('id', `add-${idTask}`)
    i_del.setAttribute('id', `del-${idTask}`)
    i_edit.setAttribute('id', `edit-${idTask}`)

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

      modalRemove(json, idTask, 1)
      validUpdate(idTask, 2, levelPriority)
    })

    i_del.addEventListener('click', () => {
      modalRemove(json, idTask, 0)
      validUpdate(idTask, 1, levelPriority)
    })

    i_edit.addEventListener('click', () => {
      modalChange()
      validUpdate(idTask, 0)
    })
  }

  function modalRemove(json, id, determinate) {
    let modalDiv = document.createElement('div');
    modalDiv.setAttribute('class', 'modal')
    modalDiv.setAttribute('id', 'modal-remove')

    let posDiv = modalDiv.offsetTop

    window.scrollTo({
      top: posDiv,
      behavior: 'smooth' // Adiciona uma animação de rolagem suave (opcional)
    });

    document.body.style.overflow = 'hidden';

    const main = document.querySelector('main')
    const header = document.querySelector('header')
    const container = document.querySelector('#container')
    container.style.display = "none"

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

    header.style.pointerEvents = 'none';
  }

  function modalRemovePriority(json, id) {
    const levelMark = document.querySelectorAll('[level]')
    let nameTask;
    let levelTask;

    for (let i = 0; i <= json.length; i++) {
      if (id == json[i]["_id"]) {
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

    let posDiv = modalDiv.offsetTop

    window.scrollTo({
      top: posDiv,
      behavior: 'smooth' // Adiciona uma animação de rolagem suave (opcional)
    });
    document.body.style.overflow = 'hidden';

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

    if (activeHover !== null) {
      activeHover = null
    }

    const header = document.querySelector('header')
    header.style.pointerEvents = 'none';

    getPriority()
    hoverPriority()

  }

  function validUpdate(id, determinate, level = null) {
    const btnNewTask = document.querySelector('#btn-edit-edit')
    const btnCancelNewTask = document.querySelector('#btn-edit-cancel')

    btnNewTask.addEventListener('click', function (event) {
      document.body.style.overflow = 'auto';
      if (determinate == 0) {
        const inputTaskElement = document.querySelector('#input-edit')
        const inputTask = document.querySelector('#input-edit').value
        event.preventDefault()

        if (inputTask == "") {
          inputTaskElement.style.boxShadow = "rgba(216, 34, 18, 0.863) 0px 0px 0px 2px, rgba(228, 5, 5, 0.65) 0px 4px 6px -1px, rgba(153, 26, 26, 0.08) 0px 1px 0px inset"
          inputTaskElement.addEventListener("click", () => {
            inputTaskElement.style.boxShadow = "none"

          })
          document.body.style.overflow = 'hidden';

        } else {
          updateTask(id, inputTask)
          if (determinate == 0) {
            let priority = ["priority-one", "priority-two", "priority-three"]
            const levelPiority = document.querySelectorAll('[mark]')

            for (let i = 0; i < levelPiority.length; i++) {
              levelPiority[i].setAttribute('id', priority[i])
              levelPiority[i].setAttribute('class', 'choose-priority')
            }
          }
        }
      } else if (determinate == 1) {
        deleteTask(level, id)

      } else if (determinate == 2) {
        finishTask(level, id)

      }
    })

    btnCancelNewTask.addEventListener('click', () => {
      document.body.style.overflow = 'auto';

      let priority = ["priority-one", "priority-two", "priority-three"]
      let modalType = ".modal"
      let divModal = document.querySelector(modalType)


      divModal.remove();

      const header = document.querySelector('header')
      header.style.pointerEvents = 'auto';

      const container = document.querySelector('#container')
      container.style.display = "flex"

      if (determinate == 0) {
        const levelPiority = document.querySelectorAll('[mark]')

        for (let i = 0; i < levelPiority.length; i++) {
          levelPiority[i].setAttribute('id', priority[i])
          levelPiority[i].setAttribute('class', 'choose-priority')
        }
      }
      activeHover = null
      cleanValues()
      clearNewClick()
    })
  }

  async function finishTask(level, id) {
    try {

      changeStatistic(level, 1)
      const token = localStorage.getItem('token')
      let responseDelete = await deleteTaskBack(apiTask, id, token)

      if (responseDelete.ok) {
        removeTaskFront(responseDelete.responseData.taskId, 0)
        cleanValues()
        clearNewClick()
        activeHover = null
      }

    } catch (err) {
      console.log(err)
    }
  }

  async function deleteTask(level, id) {
    try {
      changeStatistic(level, 2)
      const token = localStorage.getItem('token')
      let responseDelete = await deleteTaskBack(apiTask, id, token)

      if (responseDelete.ok) {
        removeTaskFront(responseDelete.responseData.taskId, 0)
        cleanValues()
        clearNewClick()
        activeHover = null
      }

    } catch (err) {
      console.log(err)
    }
  }

  function cleanValues() {
    const input = document.querySelector('#task-add')

    input.value = ""
  }

  function removeTaskFront(task, determinate = null) {
    const div = document.querySelector('.modal')
    const header = document.querySelector('header')
    const container = document.querySelector('#container')

    div.remove()
    header.style.pointerEvents = 'auto';
    container.style.display = "flex"

    if (determinate == 0) {
      const taskRemoved = document.querySelector(`#_${task}`)

      taskRemoved.remove();
    }
  }

  async function updateTask(id, newTask) {
    try {
      const token = localStorage.getItem('token')

      let data = {
        taskEdit: {
          task: newTask,
          priority: priorityId + 1
        }
      }


      const responseUpdateTask = await updateTaskBack(apiTask, id, data, 1, token)

      if (responseUpdateTask) {
        const taskChange = document.querySelector(`#_${id}`)

        loadingTask(1)

        removeTaskFront(null, 1)

      }

    } catch (err) {
      console.log(err)
    }
  }

  /*function updateTaskFront(id){
    const taskChange = document.querySelector(`#_${id}`)

  }*/

  async function changeStatistic(priorityId, determinate) {
    try {
      const token = localStorage.getItem('token')
      let responseUpdateStatistic = [];
      if (determinate == 0) {
        const endStatistic = priorityName(priorityId)

        responseUpdateStatistic = arrayStatistic[priorityId - 1]

        let dataStatistic = {
          [endStatistic]: {
            created: responseUpdateStatistic.created + 1,
            finished: responseUpdateStatistic.finished,
            canceled: responseUpdateStatistic.canceled
          },
          taskCreated: 1
        }

        const responseUpdate = await updateTaskBack(apiStatistic, endStatistic, dataStatistic, 1, token)

        if (!responseUpdate.ok) {
          console.log('Ocorreu um erro inesperado, não foi possível alterar as estatísticas')
        }

      }

      else if (determinate == 1) {
        const endStatistic = priorityName(priorityId)

        responseUpdateStatistic = arrayStatistic[priorityId - 1]

        let dataStatistic = {
          [endStatistic]: {
            created: responseUpdateStatistic.created,
            finished: responseUpdateStatistic.finished + 1,
            canceled: responseUpdateStatistic.canceled
          },
          taskFinished: 1
        }

        const responseUpdate = await updateTaskBack(apiStatistic, endStatistic, dataStatistic, 1, token)

        if (!responseUpdate.ok) {
          console.log('Ocorreu um erro inesperado, não foi possível alterar as estatísticas')
        }
      }

      else if (determinate == 2) {
        const endStatistic = priorityName(priorityId)

        responseUpdateStatistic = arrayStatistic[priorityId - 1]

        let dataStatistic = {
          [endStatistic]: {
            created: responseUpdateStatistic.created,
            finished: responseUpdateStatistic.finished,
            canceled: responseUpdateStatistic.canceled + 1
          },
          taskCanceled: 1
        }

        const responseUpdate = await updateTaskBack(apiStatistic, endStatistic, dataStatistic, 1, token)

        if (!responseUpdate.ok) {
          console.log('Ocorreu um erro inesperado, não foi possível alterar as estatísticas')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  function priorityName(priority) {
    let priorityName

    if (priority == null) {
      priorityName = "priorityOne"
      return priorityName
    }
    else if (priority == 1) {
      priorityName = "priorityOne"
      return priorityName
    }
    else if (priority == 2) {
      priorityName = "priorityTwo"
      return priorityName
    }
    else if (priority == 3) {
      priorityName = "priorityThree"
      return priorityName
    }
  }

  function getPriority() {
    const level = document.querySelectorAll('.choose-priority')
    level.forEach(function (lvl) {
      lvl.addEventListener('click', function () {
        clearNewClick()
        priorityId = lvl.getAttribute('id');
        if (priorityId == "priority-one") {
          priorityId = 0
          activeHover = 0

        }
        else if (priorityId == "priority-two") {
          priorityId = 1
          activeHover = 1

        }
        else if (priorityId == "priority-three") {
          priorityId = 2
          activeHover = 2

        }

        if (priorityId !== null) {
          markNewClick(priorityId)
        }
      });
    });
  }

  function getStatistics(json) {
    statistic = json.reverse()
  }

  function markNewClick(index) {
    let level = document.querySelectorAll('.choose-priority')
    for (let i = 0; i <= index; i++) {
      level[i].removeEventListener('mouseleave', outHover)
      level[i].style.backgroundColor = '#05DBF2';
    }
  }

  function clearNewClick() {
    let level = document.querySelectorAll('.choose-priority')
    for (let i = 0; i < level.length; i++) {
      level[i].style.backgroundColor = '#0487D9';
    }
  }

  function hoverPriority() {

    let levelHover;
    const level = document.querySelectorAll('.choose-priority')

    level.forEach(function (lvl) {
      lvl.addEventListener('mouseenter', function () {

        levelHover = lvl.getAttribute('id')

        if (activeHover !== 0) {
          if (levelHover == "priority-one") {

            level[0].style.backgroundColor = "#05DBF2"

            level[0].addEventListener('mouseleave', outHover)

          }
        }

        if (levelHover == "priority-two") {

          for (let i = 0; i < 2; i++) {
            level[i].style.backgroundColor = "#05DBF2"
          }
          level[1].addEventListener('mouseleave', outHover)

        }

        if (levelHover == "priority-three") {

          for (let i = 0; i < 3; i++) {
            level[i].style.backgroundColor = "#05DBF2"
          }

          level[2].addEventListener('mouseleave', outHover)

        }
      })
    })
  }

  function outHover() {
    const level = document.querySelectorAll('.choose-priority')

    for (let i = 0; i < 3; i++) {
      level[i].style.backgroundColor = "#0487d9"

      if (activeHover !== null) {

        for (let i = 0; i <= activeHover; i++) {
          level[i].style.backgroundColor = "#05DBF2"
        }
      }
    }
  }

}