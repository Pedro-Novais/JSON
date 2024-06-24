import { PopUpGlobal } from "./popup_global.js"

async function get_render(url, token) {
    try {

        const main = document.querySelector('main')

        const child = main.children[0].id
        
        const popup = new PopUpGlobal(`#${child}`, 'Carregando...', null, null, null, null, true)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        popup.close_popup_loading()
        return { response, status: response.status, ok: response.ok }

    } catch (error) {
        console.log(error)
    }
}

async function get_json(url, token) {
    
    try {
       
        const main = document.querySelector('main')

        const child = main.children[0].id
        
        const popup = new PopUpGlobal(`#${child}`, 'Carregando...', null, null, null, null, true)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const responseData = await response.json()
          
        popup.close_popup_loading()

        return { responseData, status: response.status, ok: response.ok }

    } catch (error) {
        console.log(error)
    }
}

async function post(url, data, token = null) {

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        return { responseData, status: response.status, ok: response.ok }

    } catch (error) {
        console.log(error)
    }

}

async function put(url, data, token) {
    try {

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const response_data = await response.json()

        return { response_data, status: response.status, ok: response.ok }

    } catch (err) {
        throw err
    }

}

async function patch(url, data, token) {
    try {

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        const response_data = await response.json()

        return { response_data, status: response.status, ok: response.ok }

    } catch (err) {
        throw err
    }

}

async function delete_req(url, token) {
    try {

        const response = await fetch(url, {
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

export {
    delete_req,
    post,
    get_render,
    put,
    get_json,
    patch
}