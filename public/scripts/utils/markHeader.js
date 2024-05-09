export function mark_header(page){

    const mark_li = document.querySelector(`#visit-${page}`)

    mark_li.setAttribute('class', 'li-visits')
    
}