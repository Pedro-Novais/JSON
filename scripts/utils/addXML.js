export default async function addTaskBack(url, data){
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const responseData = await response.json()
        
        return responseData
    }catch(err){
        throw err
    }
    
}