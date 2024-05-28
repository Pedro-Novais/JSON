let modal_edit = "         <h1>Editar Tarefa</h1>         <div class='content-modal'>             <input type='text' id='input-edit' class='input' placeholder='Nova task'>             <div class='content-priority'>                 <div>                     <p>Prioridade</p>                 </div>                 <div class='content-level'>                     <div class='choose-priority' id='priority-one-edit' piority-edit = 'True' marked = 'False'></div>                     <div class='choose-priority' id='priority-two-edit' piority-edit = 'True' marked = 'False'></div>                     <div class='choose-priority' id='priority-three-edit' piority-edit = 'True' marked = 'False'></div>                 </div>             </div>         </div>         <div class='content-btn'>             <button type='button' class='btn-edit' id='btn-edit-cancel'>                 <img src='svg/xmark-solid.svg' alt='Cancelar' height='40px'>             </button>             <button type='button' class='btn-edit' id='btn-edit-edit'>                 <img src='svg/check-solid.svg' alt='Alterar' height='40px'>             </button>         </div>     ";
let modal_finish_cancel = " <h1 id='title-determinate'></h1> <div class='tasks' id='task-remove'> <p class='task-puted' id='task-remove-text'></p> <div class='content-priority'> <div class='content-level'> <div class='priority-level' level='priority'></div> <div class='priority-level' level='priority'></div> <div class='priority-level' level='priority'></div> </div> </div> </div> <div class='content-btn'> <button type='button' class='btn-edit' id='btn-edit-cancel'> <img src='svg/xmark-solid.svg' alt='Cancelar' height='40px'> </button> <button type='button' class='btn-edit' id='btn-edit-edit'> <img src='svg/check-solid.svg' alt='Alterar' height='40px'> </button>"

let viewBarsCode = " <div class='container-name-symbol'> <h1>List-To-Do</h1> <img src='./svg/xmark-solid.svg' alt='Cancelar' height='20px' id='cancel-bar' class='actions'> </div> <div class='container-bars'> <div class='seeing-options-bar' id='visit-profile-responsive'><p>Perfil</p></div> <div class='seeing-options-bar' id='visit-list-responsive'><p>Tarefas</p></div> <div class='seeing-options-bar' id='visit-ranking-responsive'><p>Ranking</p></div> <div class='seeing-options-bar' id='visit-about-responsive'><p>Sair</p></div> </div>"
let initialViewBarsCode = " <div class='container-name-symbol'> <h1>List-To-Do</h1> <img src='../svg/xmark-solid.svg' alt='Cancelar' height='20px' id='cancel-bar' class='actions'> </div> <div class='container-bars'> <div class='seeing-options-bar' id='visit-welcome-responsive'><p>Welcome</p></div> <div class='seeing-options-bar' id='visit-login-responsive'><p>Entrar</p></div> <div class='seeing-options-bar' id='visit-register-reponsive'><p>Registrar-se</p></div> </div> "

let alertAddTask = " <div class='box-info-add-task'> <div class='info-add-task'> <p>Adicione Novas Tarefas </p> </div> </div> "

let popup_global = " <img src='../svg/xmark-solid.svg' id='close-popup' class='icon-close'> <div class='title'> <p id='type' class='style-title'></p> </div> <div class='container-alert'> <p id='info' class='style-container'></p> </div> "

export {
    modal_edit,
    modal_finish_cancel,
    viewBarsCode,
    initialViewBarsCode,
    alertAddTask,
    popup_global,
}