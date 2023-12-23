export default function addTaskBack(url, data){
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onreadystatechange = function (){
        console.log('chegou')
        if(request.readyState === 4){
            if (request.status === 200 && request.status === 304) {
                const json = JSON.parse(request.responseText);
                console.log(json);
            }
        }
    }
    request.send(JSON.stringify(data));
}