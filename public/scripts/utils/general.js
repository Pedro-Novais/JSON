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

export { valid_email, valid_only_number, formatedDate }