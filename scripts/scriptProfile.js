import { pageStatistic } from "./utils/modals.js"

const viewPage = document.querySelector('#view-infos-unique')
const profile = document.querySelector('#section-profile')
const statistic = document.querySelector('#section-statistic')
const pageConfig = document.querySelector('#section-config')

profile.addEventListener('click', viewProfile)
statistic.addEventListener('click', viewStatistic)
pageConfig.addEventListener('click', viewConfig)

let div = document.createElement('div')

function viewProfile() {
    div.remove()

    console.log('profile foi')
    div.setAttribute('class', 'container-statistic')

    div.innerHTML = pageStatistic;

    viewPage.appendChild(div)

    profile.removeEventListener('click', viewProfile)
    statistic.addEventListener('click', viewStatistic)
    pageConfig.addEventListener('click', viewConfig)
}

function viewStatistic() {
    div.remove()

    console.log('statistic foi')
    div.setAttribute('class', 'container-statistic')

    div.innerHTML = pageStatistic;

    viewPage.appendChild(div)

    statistic.removeEventListener('click', viewStatistic)
    profile.addEventListener('click', viewProfile)
    pageConfig.addEventListener('click', viewConfig)
}

function viewConfig() {
    div.remove()
    console.log('config foi')
    div.setAttribute('class', 'container-statistic')

    div.innerHTML = pageStatistic;

    viewPage.appendChild(div)

    pageConfig.removeEventListener('click', viewConfig)
    profile.addEventListener('click', viewProfile)
    statistic.addEventListener('click', viewStatistic)
}