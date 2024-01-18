/*export default function updateTaskBack(url, id, data, determinate, cb = null) {
    const request = new XMLHttpRequest()

    if (determinate == 1) {
        request.open('PUT', `${url}/${id}`)
    } else if (determinate == 0) {
        request.open('PATCH', `${url}/${id}`)
    } else if (determinate == 2) {
        request.open('PATCH', `${url}`)
    }
    request.setRequestHeader('Content-Type', 'application/json');

    let newDados = JSON.stringify(data);
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 304) {
                console.log("Recurso excluído com sucesso!");
            } else {
                console.error("Falha ao excluir o recurso. Status: " + request.status)
            }
        }
    }
    request.send(newDados)
}*/

export default async function updateTaskBack(url, id, data, determinate) {
    try {
        let methodUpdate;
        let way;

        if (determinate == 0) {
            methodUpdate = 'PATCH'
            way = `${url}/${id}`

        }
        else if (determinate == 1) {
            methodUpdate = 'PUT'
            way = `${url}/${id}`

        } else if (determinate == 2) {
            methodUpdate = 'PATCH'
            way = url
        }

        const response = await fetch(way, {
            method: methodUpdate,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const responseData = await response.json()

        return responseData

    } catch (err) {
        throw err
    }
}