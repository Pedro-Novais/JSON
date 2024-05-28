export function mark_header(page){

    const li = document.querySelectorAll('[type = navigation]')

    li.forEach(element => {
        element.removeAttribute('class', 'li-visits')
    })

    const mark_li = document.querySelector(`#visit-${page}`)

    mark_li.setAttribute('class', 'li-visits')
    
}