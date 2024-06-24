export class ShowHideEdits {

    constructor() {

        this.hide_pattern = this.hide_pattern.bind(this)
        this.show_pattern = this.show_pattern.bind(this)
        this.hide_responsive = this.hide_responsive.bind(this)
        this.show_responsive = this.show_responsive.bind(this)

        this.hide_edits()

    }

    hide_edits() {

        const btn_hide = document.querySelector('#hide')

        const width = window.innerWidth

        if (width <= 1050) {

            btn_hide.addEventListener('click', this.hide_responsive)
        }

        else if (width > 1050) {

            btn_hide.addEventListener('click', this.hide_pattern)
        }
    }

    hide_responsive() {
        
        const btn_hide = document.querySelector('#hide')
        btn_hide.removeEventListener('click', this.hide_responsive)

        const icon = document.querySelector('#img-icon')
        icon.remove()

        btn_hide.innerHTML = "<img src='./svg/caret-down-solid.svg' alt='down' height='22px' id='img-icon'>"
        btn_hide.setAttribute('title', 'Visualizar edição')

        const container_edits = document.querySelector('#container-info')
        const container_tasks = document.querySelector('#task-made')


        container_edits.style.animation = 'hideAddTaskResponsive .2s ease-out'

        setTimeout(() => {
            const tasks = document.querySelectorAll('.tasks')

            tasks.forEach(element => {

                element.style.minHeight = '30%'
            })

            container_edits.style.display = 'none'
            container_tasks.style.minHeight = '33rem'
            container_edits.style.animation = 'none'
        
        }, 200)
        
        btn_hide.addEventListener('click', this.show_responsive)

    }

    show_responsive() {
 
        const btn_hide = document.querySelector('#hide')
        btn_hide.removeEventListener('click', this.show_responsive)

        const icon = document.querySelector('#img-icon')
        icon.remove()

        btn_hide.innerHTML = "<img src='./svg/caret-up-solid.svg' alt='down' height='22px' id='img-icon'>"
        btn_hide.setAttribute('title', 'Visualizar apenas tarefas')

        const container_edits = document.querySelector('#container-info')
        const container_tasks = document.querySelector('#task-made')

        container_edits.style.display = 'flex'
        container_edits.style.animation = 'showAddTaskResponsive .2s ease-out'

        setTimeout(() => {
            
            const tasks = document.querySelectorAll('.tasks')

            tasks.forEach(element => {

                element.style.minHeight = '46%'
            })

            container_edits.style.animation = 'none'
            container_tasks.style.minHeight = '19rem'
        }, 200)


        btn_hide.addEventListener('click', this.hide_responsive)


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


        container_edits.style.animation = 'hideAddTask .2s ease-out'

        setTimeout(() => {
            container_edits.style.display = 'none'
            container_edits.style.animation = 'none'
        
        }, 200)

        container_tasks.style.minHeight = '22rem'

        btn_hide.addEventListener('click', this.show_pattern)
    }

    show_pattern() {

        const btn_hide = document.querySelector('#hide')
        btn_hide.removeEventListener('click', this.show_pattern)

        const icon = document.querySelector('#img-icon')
        icon.remove()

        btn_hide.innerHTML = "<img src='./svg/caret-up-solid.svg' alt='down' height='22px' id='img-icon'>"
        btn_hide.setAttribute('title', 'Visualizar apenas tarefas')

        const container_edits = document.querySelector('#container-info')
        const container_tasks = document.querySelector('#task-made')

        container_edits.style.display = 'flex'
        container_edits.style.animation = 'showAddTask .2s ease-out'

        setTimeout(() => {
            container_edits.style.animation = 'none'
        }, 200)

        container_tasks.style.minHeight = '16rem'

        btn_hide.addEventListener('click', this.hide_pattern)
    }
}