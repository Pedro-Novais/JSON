import { convert_id_to_integer } from "./utils/priority_integer.js"

export class AddPriority {

    constructor() {

        this.hover_priority()
        this.add_priority()
    }

    add_priority() {

        const prioritys = document.querySelectorAll('.choose-priority')

        prioritys.forEach(element => {

            element.addEventListener('click', () => {
                this.reset_mark_element_priority_task()

                const type_priority = element.getAttribute('id')
                this.mark_element_priority_task(type_priority, prioritys)
            })
        })
    }

    mark_element_priority_task(priority, element_priority) {

        const element = document.querySelector(`#${priority}`)

        element.setAttribute('marked', 'True')

        const priority_type = convert_id_to_integer(priority)

        for (let i = 0; i < priority_type; i++) {

            element_priority[i].style.backgroundColor = '#05DBF2'
        }
    }

    reset_mark_element_priority_task() {

        const elements_prioritys = document.querySelectorAll('.choose-priority')

        elements_prioritys.forEach(element => {

            element.setAttribute('marked', 'False')
            element.style.backgroundColor = '#0487d9'
        })
    }

    hover_priority() {

        const elements_prioritys = document.querySelectorAll('.choose-priority')

        elements_prioritys.forEach(element => {

            const id_element = element.getAttribute('id')

            const priority = convert_id_to_integer(id_element)

            element.addEventListener('mouseenter', () => {

                for (let i = 0; i < priority; i++) {

                    elements_prioritys[i].style.backgroundColor = '#05DBF2'
                }
            })

            element.addEventListener('mouseleave', this.out_hover_priority)
        })
    }

    out_hover_priority() {

        const elements_prioritys = document.querySelectorAll('.choose-priority')

        for (let i = 2; i >= 0; i--) {

            const marked_element = elements_prioritys[i].getAttribute('marked')

            if (marked_element == "False") {

                elements_prioritys[i].style.backgroundColor = '#0487d9'

            } else {

                break
            }
        }
    }
}