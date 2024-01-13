export default function updateTaskBack(url, id, data, determinate, cb=null){
    const request = new XMLHttpRequest()

    if(determinate == 1){
        request.open('PUT', `${url}/${id}`)
    }else if(determinate == 0){
        request.open('PATCH', `${url}/${id}`)
    }else if(determinate == 2){
        request.open('PATCH', `${url}`)
    }
    request.setRequestHeader('Content-Type', 'application/json');

    let newDados = JSON.stringify(data);
    request.onreadystatechange =  ()=>{
        if(request.readyState === 4){
            if (request.status === 200 || request.status === 304) {
                console.log("Recurso excluído com sucesso!");
            }else{
                console.error("Falha ao excluir o recurso. Status: " + request.status)
            }
        }
    }
    request.send(newDados)
}