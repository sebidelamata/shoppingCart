const fetchCollectionSlug = async (address) => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
        },
        timeout: 10
    }
  
    const url = `https://api.opensea.io/api/v2/chain/ethereum/contract/${address}/nfts`
  
    try{
      let response = await fetch(url, options)
         if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json()
      if (data.nfts && data.nfts.length > 0) {
        data = await data.nfts[0].collection.slice(0,999);
        return data;
      } else {
        return ''
      }
    } catch(error) {
      console.error('Error fetching data:', error.message);
    }
  
  }

  export default fetchCollectionSlug