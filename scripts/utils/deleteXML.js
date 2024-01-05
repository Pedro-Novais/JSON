export default function deleteTaskBack(url, id, cb = null){
    const request = new XMLHttpRequest()

    request.open('DELETE', `${url}/${id}`)
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange =  ()=>{
        if(request.readyState === 4){
            if (request.status === 200 || request.status === 304) {
                console.log("Recurso excluído com sucesso!");
            }else{
                console.error("Falha ao excluir o recurso. Status: " + xhr.status)
            }
        }
    }
    request.send()
}