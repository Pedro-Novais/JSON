async function order(url, token) {
    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            return { 
                status: response.status, 
                ok: response.ok
            }
        }

        const json = await response.json();
       
        return json;

    } catch (err) {
        throw err;
    }
}

async function addTaskBack(url, data, token) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
       
        if (!response.ok) {
            return {
                status: response.status, 
                ok: response.ok
            }
        }

        const responseData = await response.json()
        
        return { responseData, status: response.status, ok: response.ok }
    } catch (err) {
        throw err
    }

}

async function get(url, token){
    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response

    } catch (error) {
        console.log(error)
    }
}

async function getUser(url, token){

    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            return { 
                status: response.status, 
                ok: response.ok
            }
        }

        const responseData = await response.json()
       
        return { responseData, status: response.status, ok: response.ok }

    } catch (error) {
        console.log(error) 
    }
}

async function post(url, data){

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        /*if (!response.ok) {
            return { 
                status: response.status, 
                ok: response.ok
            }
        }*/

        const responseData = await response.json()
    
        return { responseData, status: response.status, ok: response.ok }
        
    } catch (error) {
        console.log(error)
    }

}

async function updateTaskBack(url, id, data, determinate, token) {
    try {
        let methodUpdate;
        let way;

        if (determinate == 0) {
            methodUpdate = 'PUT'
            way = url

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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            return {
                status: response.status, 
                ok: response.ok
            }
        }

        const responseData = await response.json()
    
        return { responseData, status: response.status, ok: response.ok}

    } catch (err) {
        throw err
    }
}

async function deleteTaskBack(url, id, token) {
    try {
        let way = `${url}/${id}`
        const response = await fetch(way, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const responseData = await response.json()
        
        return { responseData, status: response.status, ok: response.ok } 

    } catch (err) {
        throw err
    }
}

export { deleteTaskBack, updateTaskBack, addTaskBack, order, getUser, post, get }