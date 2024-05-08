import { pageStatistic } from "../utils/modals";

class ViewStatistic {

    constructor(
        div,
        view_page,
        page_profile,
        page_statistic,
        page_config
    ) {

        div.remove()

        div.setAttribute('class', 'container-statistic')

        div.innerHTML = pageStatistic;

        view_page.appendChild(div)

        activeHover = null

        insertStatistic(3)
        getPriorityStatistic()
        clickPriorityStatistic(3)
        hoverPriority()

        page_statistic.removeEventListener('click', viewStatistic)
        page_profile.addEventListener('click', viewProfile)
        page_config.addEventListener('click', viewConfig)

    }

}