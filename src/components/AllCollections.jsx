import { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'
import SearchCollections from './SearchCollections'

const AllCollections = () => {

    const AllCollectionsURL = () => {
        const [allCollectionsURL, setAllCollectionsURL] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        const fetchAllCollections = async () => {
            const url = 'https://nft.llama.fi/collections';
            try{
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                      'Accept': '*/*',
                    },
                  });
              
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
              
                  const data = await response.json();
                  setAllCollectionsURL(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
    
        useEffect(() => {
            fetchAllCollections()
        }, [])
    
        return { allCollectionsURL, error, loading }
    }

    const {allCollectionsURL, error, loading} = AllCollectionsURL()


    if(error) return <p>A network error was encountered</p>
    if(loading) return <p>Loading...</p>
    console.log(allCollectionsURL)

    return(
        <>
        <div className='shop-header-and-search'>
        <h2>Collections</h2>
        <SearchCollections allCollectionsURL={allCollectionsURL}/>
        </div>
        <ul className='all-collections-list'>
            {
                allCollectionsURL.slice(0,20).map((collection) => {
                        return (
                            <li key={collection.collectionId} className='all-collections-list-item'>
                                <CollectionCard collection={collection}/>
                            </li>
                        )
                })
            }
        </ul>
        </>
    )
}

export default AllCollections