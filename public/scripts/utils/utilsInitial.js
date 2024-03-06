let time = null;

function boxAlerts(alert, containerId, interval) {
    const container = document.querySelector(containerId)
    const divAlert = document.querySelector('.box-watch-out')
   
    if (time !== null) {

        clearInterval(time)
    }

    if (divAlert) {
        divAlert.remove()

    }
   
    const div = document.createElement('div')
    const p = document.createElement('p')

    div.setAttribute('class', 'box-watch-out')

    p.setAttribute('id', 'msg-watch-out')

    p.innerHTML = alert

    div.appendChild(p)
    container.appendChild(div)

    time = setInterval(clearBoxAlerts, interval)
}

function clearBoxAlerts() {
    const divAlert = document.querySelector('.box-watch-out')

    if (divAlert) {
        divAlert.remove()
    }

}

function validEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function validOnlyNumber(input) {
    return /^[0-9]+$/.test(input);
  }

export { validEmail, boxAlerts, validOnlyNumber}