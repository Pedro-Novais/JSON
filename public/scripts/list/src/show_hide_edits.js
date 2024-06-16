export class ShowHideEdits {

    constructor() {

        this.hide_pattern = this.hide_pattern.bind(this)
        this.show_pattern = this.show_pattern.bind(this)

        this.hide_edits()

    }

    hide_edits() {

        const btn_hide = document.querySelector('#hide')

        const width = window.innerWidth

        if (width <= 1050) {

            btn_hide.addEventListener('click', this.hide_responsive)
        }

        else if(width > 1050){

            btn_hide.addEventListener('click', this.hide_pattern)
        }
    }

    hide_responsive(btn) {

    }

    show_responsive(btn){

    }

    hide_pattern() {

        const btn_hide = document.querySelector('#hide')
        btn_hide.removeEventListener('click', this.hide_pattern)

        const icon = document.querySelector('#img-icon')
        icon.remove()

        btn_hide.innerHTML = "<img src='./svg/caret-down-solid.svg' alt='down' height='22px' id='img-icon'>"
        btn_hide.setAttribute('title', 'Visualizar edição')

        const container_edits = document.querySelector('#container-info')
        const container_tasks = document.querySelector('#task-made')

        container_edits.style.display = 'none'
        container_tasks.style.minHeight = '22rem'

        btn_hide.addEventListener('click', this.show_pattern)
    }

    show_pattern(){

        const btn_hide = document.querySelector('#hide')
        btn_hide.removeEventListener('click', this.show_pattern)

        const icon = document.querySelector('#img-icon')
        icon.remove()

        btn_hide.innerHTML = "<img src='./svg/caret-up-solid.svg' alt='down' height='22px' id='img-icon'>"
        btn_hide.setAttribute('title', 'Visualizar apenas tarefas')

        const container_edits = document.querySelector('#container-info')
        const container_tasks = document.querySelector('#task-made')

        container_edits.style.display = 'flex'
        container_tasks.style.minHeight = '16rem'

        btn_hide.addEventListener('click', this.hide_pattern)
    }
}