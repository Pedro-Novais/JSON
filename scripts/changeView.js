import { profile } from "./utils/modals.js"
import { pageStatistic } from "./utils/modals.js"

const linkProfile = document.querySelector('#visit-profile')

const body = document.querySelector('body')
const main = document.querySelector('main')



linkProfile.addEventListener('click', () => {
    let div = document.createElement('div')
    div.setAttribute('id', 'container-profile')
    
    div.innerHTML = profile
    main.remove()
    body.appendChild(div)

    const profileStatistic = document.querySelector('#section-profile')
    profileStatistic.addEventListener('click', viewProfile)
})

function viewProfile() {
    //div.remove()

    console.log('profile foi')
    div.setAttribute('class', 'container-statistic')

    div.innerHTML = pageStatistic;

    viewPage.appendChild(div)

    profile.removeEventListener('click', viewProfile)
    statistic.addEventListener('click', viewStatistic)
    pageConfig.addEventListener('click', viewConfig)
}