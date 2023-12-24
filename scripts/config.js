export default function getConfig(url, cb){
    const request = new XMLHttpRequest()
    
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 304) {
                const json = JSON.parse(request.responseText)
                if (typeof cb === "function") {
                    cb(json)
                }
            } else if (typeof cb != "function") {
                console.log('erro')
            }
        }
    }
    request.send();
}