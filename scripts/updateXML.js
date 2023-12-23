export default function updateTaskBack(url, id, data, cb=null){
    const request = new XMLHttpRequest()

    request.open('PUT', `${url}/${id}`)
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