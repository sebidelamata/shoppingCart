import { useState, useEffect } from 'react'
import CollectionCard from './CollectionCard'
import SearchCollections from './SearchCollections'

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
    if(loading) return <p>Loading...</p>

    const numPages = Math.ceil(allCollectionsURL.length / 25)

    const handlePaginationPageClick = (e) => {
        let value = e.target.textContent - 1
        setCurrentPage(value)
        
    }
    const handlePaginationLeftArrowClick = () => {
        let value = currentpage - 1
        if(value < 0){
            value = 0
        }
        setCurrentPage(value)
    }
    const handlePaginationRightArrowClick = () => {
        let value = currentpage + 1
        if(value > numPages - 1){
            value = numPages -1
        }
        setCurrentPage(value)
    }
    const handlePaginationStartClick = () => {
        setCurrentPage(0)
    }
    const handlePaginationEndClick = () => {
        setCurrentPage(numPages - 1)
    }
    const highlightCurrentPage = (page) => {
        if(page == currentpage + 1){
            return 'bold'
        }
    }

    let paginationArray = Array.from({ length: 5}, (_, index) => {
        let out = currentpage + index + 1
        if(out > (numPages - 4)){
            out = (numPages - 4) + index
        }
        return out
    })
    let startCollectionIndex = (25 * currentpage)
    let endCollectionIndex = (25 * currentpage) + 24
    if(endCollectionIndex > allCollectionsURL.length){
        endCollectionIndex = allCollectionsURL.length
    }
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
        <div className='pagination-row'>
            <div className='pagination-row-start' onClick={() => handlePaginationStartClick()}>
                Start
            </div>
            <div className='pagination-row-left-arrow' onClick={() => handlePaginationLeftArrowClick()}>
                <strong>
                    &#10594;
                </strong>
            </div>
            <div className='pagination-div'>
                <ul className='pagination-numbers-list'>
                    {
                        paginationArray.map((page) => {
                            return (
                                <li key={page} className='pagination-list-page' onClick={(e) => handlePaginationPageClick(e)} style={{fontWeight: highlightCurrentPage(page)}}>
                                    {page}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='pagination-row-right-arrow' onClick={() => handlePaginationRightArrowClick()}>
                <strong>
                    &#10596;
                </strong>
            </div>
            <div className='pagination-row-end' onClick={() => handlePaginationEndClick()}>
                End
            </div>
        </div>
        </>
    )
}

export default AllCollections