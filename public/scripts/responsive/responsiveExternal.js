import { initialViewBarsCode } from "../utils/modals.js"
import { callPageWelcome, callPageLogin, callPageRegister } from "../changeViewOut.js"

export function interactorResponsive() {

    window.addEventListener('resize', getWidth);
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    let img = document.createElement('img')
    let determinate = 0;

    getWidth()

    function getWidth() {
        let width = window.innerWidth;
        if (width <= 800) {
            createSvg("bars", "bar-view-options", header)
            const btnBarView = document.querySelector('#bar-view-options')

            btnBarView.addEventListener('click', barView)

            determinate = 1
        }
        else if (width > 800) {
            if (determinate == 1) {
                img.remove()
                determinate = 0
            }
        }
    }

    function createSvg(type, id, element) {
        img.setAttribute('src', `./svg/${type}-solid.svg`)
        img.setAttribute('class', 'symbol-nav')
        img.setAttribute('id', id)

        element.appendChild(img)
    }

    let div = document.createElement('div')

    function barView() {
        div.setAttribute('id', 'bar-options')
        div.setAttribute('class', 'style-bar-options')

        div.style.animation = "slideBar .3s ease-out"
        div.innerHTML = initialViewBarsCode;

        body.appendChild(div)

        const linkWelcomeResponsive = document.querySelector('#visit-welcome-responsive')
        const linkLoginResponsive = document.querySelector('#visit-login-responsive')
        const linkRegisterResponsive = document.querySelector('#visit-register-reponsive')

        linkWelcomeResponsive.addEventListener('click', () => {
            div.style.animation = "closeBar .3s ease-out"

            setTimeout(callPageWelcome, 250)
        })
        linkLoginResponsive.addEventListener('click', () => {

            div.style.animation = "closeBar .3s ease-out"

            setTimeout(callPageLogin, 250)
        })

        linkRegisterResponsive.addEventListener('click', () =>{

            div.style.animation = "closeBar .3s ease-out"

            setTimeout(callPageRegister, 250)
        })

    const cancelBar = document.querySelector('#cancel-bar')
    if (cancelBar != null) {
        cancelBar.addEventListener('click', outBar)
    }
}

function outBar() {
    main.style.display = "flex";
    div.style.animation = "closeBar .3s ease-out"

    setTimeout(() => {
        div.remove()
    }, 250)
}
}