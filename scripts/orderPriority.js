export default function order(url, cb, id = null){
    const request = new XMLHttpRequest()
    let way;

    if(id !== null){
        way = `${url}/?priority=${id}`
    }
    else{
        way = url
    }
    
    request.open('GET', way);
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