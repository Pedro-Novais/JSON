import { viewBarsCode } from "./utils/modals.js"
import { callPageList, callPageProfile } from "./changeView.js";

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
        console.log(width)
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
        //img.setAttribute('alt', "Bars options")
        img.setAttribute('class', 'symbol-nav')
        img.setAttribute('id', id)

        element.appendChild(img)
    }

    let div = document.createElement('div')

    function barView() {
        div.setAttribute('id', 'bar-options')
        div.setAttribute('class', 'style-bar-options')

        header.style.display = "none";
        main.style.display = "none";
        footer.style.display = "none";

        div.innerHTML = viewBarsCode;

        body.appendChild(div)

        const linkToDoResponsive = document.querySelector('#visit-list-responsive')
        const linkProfileResponsive = document.querySelector('#visit-profile-responsive')
        const linkAbout = document.querySelector('#visit-about-responsive')

        linkToDoResponsive.addEventListener('click', callPageList)
        linkProfileResponsive.addEventListener('click', callPageProfile)

        const cancelBar = document.querySelector('#cancel-bar')
        if (cancelBar != null) {
            cancelBar.addEventListener('click', outBar)
        }
    }

    function outBar() {
        header.style.display = "flex";
        main.style.display = "flex";
        footer.style.display = "flex";

        div.remove()
    }
}