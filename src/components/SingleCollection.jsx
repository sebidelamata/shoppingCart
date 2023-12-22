import { useState, useEffect } from 'react'
import PaginationRow from './PaginationRow'
import { useLocation } from 'react-router-dom'
import fetchCollectionSlug from '../scripts/fetchCollectionSlug.js'

const SingleCollection = () => {

    const location = useLocation()
    const collection = location.state || {}

    const SingleCollectionURL = (collection) => {

        // fetched data 
        const [nftLlamaCollectionData, setNftLlamaCollectionData] = useState(null)
        const [nftLlamaCollectionVolumeData, setNftLlamaCollectionVolumeData] = useState(null)
        const [nftLlammaCollectionFloorPriceData, setNftLlammaCollectionFloorPriceData] = useState(null)
        const [openSeaCollectionData, setOpenSeaCollectionData] = useState(null)
        const [openSeaCollectionNFTs, setOpenSeaCollectionNFTs] = useState(null)
        const [llammaNFTSalesHistoryData, setLlammaNFTSalesHistoryData] = useState(null)
        const [llammaOrderBookData, setllammaOrderBookData] = useState(null)

        //loading and error states for each fetch (TODO)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        //handle pagination
        const [currentpage, setCurrentPage] = useState(0)

        // show stats collapsible
        const [showVolumeData, setShowVolumeData] = useState(false)
        const [showFloorPriceData, setShowFloorPriceData] = useState(false)
        const [showSaleHistoryData, setShowSaleHistoryData] = useState(false)
        const [showOrderBookData, setShowOrderBookData] = useState(false)

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

        const fetchLlammaNFTSalesHistoryData = async (collectionId) => {

            const url = `https://nft.llama.fi/sales?collectionId=${collectionId}`;
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
                setLlammaNFTSalesHistoryData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        const fetchLlammaNFTOrderBookData = async (collectionId) => {

            const url = `https://nft.llama.fi/orderbook/${collectionId}`;
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
                setllammaOrderBookData(data);
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

            let allNFTs = []; // To store all NFTs
            let nextPage = null; // To store the next page URL

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }


            do{
                const url = nextPage ? `https://api.opensea.io/api/v2/collection/${slug}/nfts?limit=200&next=${nextPage}` : `https://api.opensea.io/api/v2/collection/${slug}/nfts?limit=200`
                try{
                    const response = await fetch(url, options);
                    await new Promise(r => setTimeout(r, 500));
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    allNFTs = allNFTs.concat(data.nfts);
                    console.log(allNFTs)
                    nextPage = data.next;
                } catch(error){
                    setError(error.message)
                } finally {
                    setOpenSeaCollectionNFTs(allNFTs)
                    setLoading(false)
                }
            } while (nextPage)

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

        useEffect(() => {
            if(showSaleHistoryData){
                fetchLlammaNFTSalesHistoryData(collection.collectionId)
            }
        }, [showSaleHistoryData])

        useEffect(() => {
            if(showOrderBookData){
                fetchLlammaNFTOrderBookData(collection.collectionId)
            }
        }, [showOrderBookData])

        return { 
            nftLlamaCollectionData, 
            nftLlamaCollectionVolumeData,
            nftLlammaCollectionFloorPriceData,
            llammaNFTSalesHistoryData,
            llammaOrderBookData,
            openSeaCollectionData,
            openSeaCollectionNFTs, 
            error, 
            loading, 
            currentpage, 
            setCurrentPage,
            showVolumeData, 
            setShowVolumeData,
            showFloorPriceData, 
            setShowFloorPriceData,
            showSaleHistoryData, 
            setShowSaleHistoryData,
            showOrderBookData, 
            setShowOrderBookData
        }
    }

    const {
        nftLlamaCollectionData, 
        nftLlamaCollectionVolumeData,
        nftLlammaCollectionFloorPriceData,
        llammaNFTSalesHistoryData,
        llammaOrderBookData,
        openSeaCollectionData,
        openSeaCollectionNFTs, 
        error, 
        loading, 
        currentpage, 
        setCurrentPage,
        showVolumeData, 
        setShowVolumeData,
        showFloorPriceData, 
        setShowFloorPriceData,
        showSaleHistoryData, 
        setShowSaleHistoryData,
        showOrderBookData, 
        setShowOrderBookData
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

    const handleSalesHistoryClick = () => {
        setShowSaleHistoryData(!showSaleHistoryData)
    }

    const handleOrderBookClick = () => {
        setShowOrderBookData(!showOrderBookData)
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
                <li className='collection-stats-volume' onClick={() => handleVolumeClick()}>
                    {
                        showVolumeData === false &&
                        <div className='collection-stats-title'>Volume</div>
                    }
                    {
                        showVolumeData === true &&
                        nftLlamaCollectionVolumeData &&
                        <>
                            <div className='collection-stats-title'>Volume</div>
                            <div>{nftLlamaCollectionVolumeData[1].sum}</div>
                        </>
                    }
                </li>
                <li className='collection-stats-floor-price' onClick={() => handleFloorPriceClick()}>
                    {
                        showFloorPriceData === false &&
                        <div className='collection-stats-title'>Floor Price</div>
                    }
                    {
                        showFloorPriceData === true &&
                        nftLlammaCollectionFloorPriceData &&
                        <>
                            <div className='collection-stats-title'>Floor Price</div>
                            <div>{nftLlammaCollectionFloorPriceData[0].floorPrice}</div>
                        </>
                    }
                </li>
                <li className='collection-stats-sales-history' onClick={() => handleSalesHistoryClick()}>
                    {
                        showSaleHistoryData === false &&
                        <div className='collection-stats-title'>Sales Historic</div>
                    }
                    {
                        showSaleHistoryData === true &&
                        llammaNFTSalesHistoryData &&
                        <>
                            <div className='collection-stats-title'>Sales Historic</div>
                            <div>{llammaNFTSalesHistoryData[0][1]}</div>
                        </>
                    }
                </li>
                <li className='collection-stats-order-book' onClick={() => handleOrderBookClick()}>
                    {
                        showOrderBookData === false &&
                        <div className='collection-stats-title'>Order Book</div>
                    }
                    {
                        showOrderBookData === true &&
                        llammaOrderBookData &&
                        <>
                            <div className='collection-stats-title'>Order Book</div>
                            <div>{llammaOrderBookData[0].amount}</div>
                        </>
                    }
                </li>
            </ul>
            <ul className='nfts-list'>
                    {
                        !openSeaCollectionNFTs &&
                        <div>Loading...</div>
                    }
                    {
                        openSeaCollectionNFTs &&
                        openSeaCollectionNFTs.slice(startCollectionIndex, endCollectionIndex).map((nft) => {
                            return (
                                <li key={nft.identifier}>
                                    {nft.identifier}
                                </li>
                            )
                        })
                    }
            </ul>
        </div>
    )

}

export default SingleCollection