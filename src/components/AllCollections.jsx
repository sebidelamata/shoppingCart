import { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'
import SearchCollections from './SearchCollections'
import PaginationRow from './PaginationRow'
import Loading from './Loading'

const AllCollections = () => {

    const AllCollectionsURL = () => {
        const [allCollectionsURL, setAllCollectionsURL] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)
        const [currentpage, setCurrentPage] = useState(0)

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
    
        return { allCollectionsURL, error, loading, currentpage, setCurrentPage}
    }

    const {allCollectionsURL, error, loading, currentpage, setCurrentPage} = AllCollectionsURL()

    // wait for error/load screens
    if(error) return <p>A network error was encountered</p>
    if(loading) return <Loading/>

    let startCollectionIndex = (10 * currentpage)
    let endCollectionIndex = (10 * currentpage) + 9
    return(
        <>
            <div className='shop-header-and-search'>
                <h2>Collections</h2>
                <SearchCollections allCollectionsURL={allCollectionsURL}/>
            </div>
            <ul className='all-collections-list'>
                {
                    allCollectionsURL.slice(startCollectionIndex,endCollectionIndex).map((collection) => {
                            return (
                                <li key={collection.collectionId} className='all-collections-list-item'>
                                    <CollectionCard collection={collection}/>
                                </li>
                            )
                    })
                }
            </ul>
            <PaginationRow allCollectionsURL={allCollectionsURL} currentpage={currentpage} setCurrentPage={setCurrentPage}/>
        </>
    )
}

export default AllCollections