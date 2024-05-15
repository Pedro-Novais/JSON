export function reset_priority(){

    const elements_prioritys = document.querySelectorAll('.choose-priority')

    elements_prioritys.forEach(element => {

        const mark = element.getAttribute('marked')

        if(mark == "True"){

            element.setAttribute('marked', 'False')

        }

        element.removeAttribute('style')
    })
}