export class AddPriority{

    constructor(){

        this.add_priority()
    }

    add_priority() {

        const prioritys = document.querySelectorAll('.choose-priority')

        prioritys.forEach(element => {

            element.addEventListener('click', () => {
                this.reset_mark_element_priority_task()

                const type_priority = element.getAttribute('id')
                this.mark_element_priority_task(type_priority)

                console.log(type_priority)
            })
        })
    }

    mark_element_priority_task(priority) {

        const element = document.querySelector(`#${priority}`)

        element.setAttribute('marked', 'true')
    }

    reset_mark_element_priority_task(){

        const elements_prioritys = document.querySelectorAll('.choose-priority')

        elements_prioritys.forEach(element => {

            element.setAttribute('marked', 'false')
        })
    }

    convert_id_to_integer(priority) {

        if (priority == "priority-one") {
            
            return 1

        }
        else if (priority == "priority-two") {
            
            return 2

        }
        else if (priority == "priority-three") {
            
            return 3

        }
    }

    hover_priority() {

    }
}