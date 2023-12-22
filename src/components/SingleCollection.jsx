import { useState, useEffect } from 'react'
import PaginationRow from './PaginationRow'
import { useLocation } from 'react-router-dom'
import fetchCollectionSlug from '../scripts/fetchCollectionSlug.js'

const SingleCollection = () => {

    const location = useLocation()
    const collection = location.state || {}

    const SingleCollectionURL = (collection) => {
        const [nftLlamaCollectionData, setNftLlamaCollectionData] = useState(null)
        const [nftLlamaCollectionVolumeData, setNftLlamaCollectionVolumeData] = useState(null)
        const [openSeaCollectionData, setOpenSeaCollectionData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)
        const [currentpage, setCurrentPage] = useState(0)

        const fetchLlammaNFTCollectionData = async (collectionId) => {

            const url = `https://nft.llama.fi/collection/${collectionId}`;
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
                setNftLlamaCollectionData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        const fetchLlammaNFTCollectionVolumeData = async (collectionId) => {

            const url = `https://nft.llama.fi/stats/${collectionId}`;
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
                setNftLlamaCollectionVolumeData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        const fetchOpenSeaCollectionData = async (collection) => {

            let slug = await fetchCollectionSlug(collection.collectionId)

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

            const url = `https://api.opensea.io/api/v2/collections/${slug}`;
            try{
                const response = await fetch(url, options);
                  
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  
                const data = await response.json();
                setOpenSeaCollectionData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            fetchLlammaNFTCollectionData(collection.collectionId)
            fetchLlammaNFTCollectionVolumeData(collection.collectionId)
            fetchOpenSeaCollectionData(collection)
        }, [])
        return { 
            nftLlamaCollectionData, 
            nftLlamaCollectionVolumeData,
            openSeaCollectionData, 
            error, 
            loading, 
            currentpage, 
            setCurrentPage
        }
    }

    const {
        nftLlamaCollectionData, 
        nftLlamaCollectionVolumeData,
        openSeaCollectionData, 
        error, 
        loading, 
        currentpage, 
        setCurrentPage
    } = SingleCollectionURL(collection)

    // wait for error/load screens
    if(error) return <p>A network error was encountered</p>
    if(loading) return <p>Loading...</p>

    console.log(nftLlamaCollectionData)
    console.log(nftLlamaCollectionVolumeData)
    console.log(openSeaCollectionData)

    let startCollectionIndex = (25 * currentpage)
    let endCollectionIndex = (25 * currentpage) + 24

    return(
        <div>
            {collection.name}
        </div>
    )

}

export default SingleCollection