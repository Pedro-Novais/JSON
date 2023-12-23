export default function createXMLHttprequest(url, cb, data = null) {
    const request = new XMLHttpRequest()

    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(data);
    request.onreadystatechange = verficaAjax

    function verficaAjax() {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 304) {
                const json = JSON.parse(request.responseText)
                console.log(json)
                if (typeof cb === "function") {
                    cb(json)
                }
            } else if (typeof cb != "function") {
                console.log('erro')
            }
        }
    }
}