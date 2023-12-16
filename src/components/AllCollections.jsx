import { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'

const AllCollections = () => {

    const AllCollectionsURL = () => {
        const [allCollectionsURL, setAllCollectionsURL] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)
    
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
            }
        }
    
        useEffect(() => {
            fetch('https://api.opensea.io/api/v2/collections?limit=20', options)
                .then((response) => {
                    if(response.status >= 400){
                        throw new Error('server error');
                    }
                    return response.json()
                })
                .then((response) => setAllCollectionsURL(response.collections))
                .catch((error) => setError(error))
                .finally(() => setLoading(false))
        }, [])
    
        return { allCollectionsURL, error, loading }
    }

    const {allCollectionsURL, error, loading} = AllCollectionsURL()

    if(error) return <p>A network error was encountered</p>
    if(loading) return <p>Loading...</p>

    return(
        <>
        <h2>Collections</h2>
        <ul className='all-collections-list'>
            {
                allCollectionsURL.map((collection) => {
                    if(collection.contracts[0]){
                        return (
                            <li key={`${collection.contracts[0].address}-${collection.collection}`} className='all-collections-list-item'>
                                <CollectionCard collection={collection}/>
                            </li>
                        )
                    }
                })
            }
        </ul>
        </>
    )
}

export default AllCollections