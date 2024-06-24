import { convert_id_to_integer } from "./priority_integer.js"

class PriorityActions {

    constructor(selector) {

        const prioritys = document.querySelectorAll(`${selector}`)
        
        prioritys.forEach(element => {

            element.addEventListener('click', () => {
                this.reset_mark_element_priority_task(selector)
                
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

    reset_mark_element_priority_task(selector) {
        const elements_prioritys = document.querySelectorAll(`${selector}`)

        elements_prioritys.forEach(element => {

            element.setAttribute('marked', 'False')
            element.style.backgroundColor = '#0487d9'
        })
    }
}

class PriorityHover {

    constructor(selector) {

        const elements_prioritys = document.querySelectorAll(`${selector}`)

        elements_prioritys.forEach(element => {
     
            const id_element = element.getAttribute('id')

            const priority = convert_id_to_integer(id_element)

            element.addEventListener('mouseenter', () => {

                for (let i = 0; i < priority; i++) {

                    elements_prioritys[i].style.backgroundColor = '#05DBF2'
                }
            })

            element.addEventListener('mouseleave', () => {
                this.out_hover_priority(selector)
            })
        })
    }

    out_hover_priority(selector) {

        const elements_prioritys = document.querySelectorAll(`${selector}`)

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


function get_priority(selector) {

    const priority_element = document.querySelectorAll(`${selector}`)

    for (let i = 0; i < priority_element.length; i++) {

        const marked = priority_element[i].getAttribute('marked')

        if (marked == "True") {

            const priority_name = priority_element[i].getAttribute('id')
            const priority = convert_id_to_integer(priority_name)

            return priority
        }
    }

    return 1
}

export {
    PriorityActions,
    PriorityHover,
    get_priority,
    }