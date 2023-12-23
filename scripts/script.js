import createXMLHttprequest from "./createXML.js"
import addTaskBack from "./addXML.js"

const api = 'http://localhost:5000/tasks'
const btn = document.querySelector('#btn-add')

document.addEventListener('DOMContentLoaded', loadingTask)

let task_put = document.querySelector('#task-add')
let level = 1

btn.addEventListener('click', addTask)

function addTask(){
  let val = task_put.value
  let data= {
    task: val,
    priority: level
  }
  addTaskBack(api, data)
}

function loadingTask(){
  createXMLHttprequest(api, viewTaskSaved)
  function viewTaskSaved(data){
    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        createTask(data, i)
      }
    }
  }
}

function createTask(taskJson, index){
  const container = document.querySelector('#task-made')
  const container_action = document.querySelector('#container-actions')

  const div_action_add = document.createElement('div')
  const div_action_del = document.createElement('div')
  const i_add = document.createElement('i')
  const i_del = document.createElement('i')

  div_action_add.classList.add('action')
  div_action_del.classList.add('action')

  /*i_add.classList.add('fa-solid fa-check')
  i_del.classList.add('fa-solid fa-x')*/

  div_action_add.id = index
  div_action_del.id = index

  const div = document.createElement('div')
  const p = document.createElement('p')

  let name = document.createTextNode(taskJson[index]["task"])

  div.classList.add('tasks')
  p.classList.add('task-puted')

  p.appendChild(name)
  div.appendChild(p)
  container.appendChild(div)
}
