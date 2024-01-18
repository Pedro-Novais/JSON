export default async function getConfig(url){
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const json  = await response.json()

        return json

    }catch(err){
        throw err
    }
}