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

function removePlaceholder() {
    const inputAuthor = document.querySelectorAll('.inputs-credentials');
    let placeholder = []

    for (let i = 0; i < inputAuthor.length; i++) {

        placeholder[i] = inputAuthor[i].placeholder;

    }

    inputAuthor.forEach((input) => {

        input.addEventListener('focus', () => {
            input.placeholder = ""
        })
    })

    inputAuthor.forEach((input) => {

        input.addEventListener('blur', () => {

            if (input.value == "") {

                const getForName = input.getAttribute('mark')
                inputAuthor[getForName].placeholder = placeholder[getForName]
            }
        })
    })
}

function valid_email(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function valid_only_number(input) {
    return /^[0-9]+$/.test(input);
}

function formatedDate(dateNum) {

    const date = new Date(dateNum);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    const dateFormated = `${day}/${month}/${year}`;

    return dateFormated

}

export { valid_email, boxAlerts, valid_only_number, removePlaceholder, formatedDate }