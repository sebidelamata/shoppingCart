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
        const [nftLlammaCollectionFloorPriceData, setNftLlammaCollectionFloorPriceData] = useState(null)
        const [openSeaCollectionData, setOpenSeaCollectionData] = useState(null)
        const [openSeaCollectionNFTs, setOpenSeaCollectionNFTs] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)
        const [currentpage, setCurrentPage] = useState(0)
        const [showVolumeData, setShowVolumeData] = useState(false)
        const [showFloorPriceData, setShowFloorPriceData] = useState(false)

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

        const fetchLlammaNFTCollectionFloorPriceData = async (collectionId) => {

            const url = `https://nft.llama.fi/floorHistory/${collectionId}`;
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
                setNftLlammaCollectionFloorPriceData(data);
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

        const fetchOpenSeaCollectionNFTs = async (collection) => {

            let slug = await fetchCollectionSlug(collection.collectionId)

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

            const url = `https://api.opensea.io/api/v2/collection/${slug}/nfts`;
            try{
                const response = await fetch(url, options);
                  
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  
                const data = await response.json();
                setOpenSeaCollectionNFTs(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            const handleFetches = async () => {
                try{
                    await fetchLlammaNFTCollectionData(collection.collectionId)
                    await fetchOpenSeaCollectionData(collection)
                    await fetchOpenSeaCollectionNFTs(collection)
                } catch(error){
                    setError(error.message)
                }  finally{
                    setLoading(false)
                }
            }

            handleFetches()
        }, [])
        useEffect(() => {
            if(showVolumeData){
                fetchLlammaNFTCollectionVolumeData(collection.collectionId)
            }
        }, [showVolumeData])
        useEffect(() => {
            if(showFloorPriceData){
                fetchLlammaNFTCollectionFloorPriceData(collection.collectionId)
            }
        }, [showFloorPriceData])
        return { 
            nftLlamaCollectionData, 
            nftLlamaCollectionVolumeData,
            nftLlammaCollectionFloorPriceData,
            openSeaCollectionData,
            openSeaCollectionNFTs, 
            error, 
            loading, 
            currentpage, 
            setCurrentPage,
            showVolumeData, 
            setShowVolumeData,
            showFloorPriceData, 
            setShowFloorPriceData
        }
    }

    const {
        nftLlamaCollectionData, 
        nftLlamaCollectionVolumeData,
        nftLlammaCollectionFloorPriceData,
        openSeaCollectionData,
        openSeaCollectionNFTs, 
        error, 
        loading, 
        currentpage, 
        setCurrentPage,
        showVolumeData, 
        setShowVolumeData,
        showFloorPriceData, 
        setShowFloorPriceData
    } = SingleCollectionURL(collection)

    // wait for error/load screens
    if(error) return <p>A network error was encountered</p>
    if(loading) return <p>Loading...</p>

    
    console.log(openSeaCollectionData)
    console.log(openSeaCollectionNFTs)

    let startCollectionIndex = (25 * currentpage)
    let endCollectionIndex = (25 * currentpage) + 24

    const handleVolumeClick = () => {
        setShowVolumeData(!showVolumeData)
    }

    const handleFloorPriceClick = () => {
        setShowFloorPriceData(!showFloorPriceData)
    }

    return(
        <div>
            <div className='collection-banner-container'>
                {
                    openSeaCollectionData &&
                    (
                        <img className='collection-banner' src={openSeaCollectionData.banner_image_url} alt={`${collection.name} banner image`} />
                    )
                }
            </div>
            <div>{collection.name}</div>
            <ul className='collection-stats-list'>
                <li className='collection-stats-volume' onClick={() => handleVolumeClick()}>Volume</li>
                <li className='collection-stats-floor-price' onClick={() => handleFloorPriceClick()}>Floor Price</li>
            </ul>
        </div>
    )

}

export default SingleCollection