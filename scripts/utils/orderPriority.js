export default async function order(url, id = null) {
    try {
      let way;
  
      if (id !== null) {
        way = `${url}/?priority=${id}`;
      } else {
        way = url;
      }
  
      const response = await fetch(way, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.status}`);
      }
  
      const json = await response.json();
  
      return json;

    } catch (err) {
      throw err;
    }
  }