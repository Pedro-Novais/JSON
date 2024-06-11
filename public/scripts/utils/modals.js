let viewBarsCode = " <div class='container-name-symbol'> <h1>List-To-Do</h1> <img src='./svg/xmark-solid.svg' alt='Cancelar' height='20px' id='cancel-bar' class='actions'> </div> <div class='container-bars'> <div class='seeing-options-bar' id='visit-profile-responsive'><p>Perfil</p></div> <div class='seeing-options-bar' id='visit-list-responsive'><p>Tarefas</p></div> <div class='seeing-options-bar' id='visit-ranking-responsive'><p>Ranking</p></div> <div class='seeing-options-bar' id='visit-about-responsive'><p>Sair</p></div> </div>"
let initialViewBarsCode = " <div class='container-name-symbol'> <h1>List-To-Do</h1> <img src='../svg/xmark-solid.svg' alt='Cancelar' height='20px' id='cancel-bar' class='actions'> </div> <div class='container-bars'> <div class='seeing-options-bar' id='visit-welcome-responsive'><p>Welcome</p></div> <div class='seeing-options-bar' id='visit-login-responsive'><p>Entrar</p></div> <div class='seeing-options-bar' id='visit-register-reponsive'><p>Registrar-se</p></div> </div> "
let popup_global = " <img src='../svg/xmark-solid.svg' id='close-popup' class='icon-close'> <div class='title'> <p id='type' class='style-title'></p> </div> <div class='container-alert'> <p id='info' class='style-container'></p> </div> "

export {
    viewBarsCode,
    initialViewBarsCode,
    popup_global,
}