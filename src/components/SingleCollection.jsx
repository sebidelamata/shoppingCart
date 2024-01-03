import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import fetchCollectionSlug from '../scripts/fetchCollectionSlug.js'
import Loading from './Loading.jsx'
import VolumePlot from './VolumePlot.jsx'
import FloorPricePlot from './FloorPricePlot.jsx'
import SalesHistoryPlot from './SalesHistoryPlot.jsx'
import OrderBookPlot from './OrderBookPlot.jsx'
import blankNFT from '/blank_nft.svg'
import NFTsListSwitcher from './NFTsListSwitcher.jsx'

const SingleCollection = () => {

    const location = useLocation()
    const collection = location.state || {}

    const SingleCollectionURL = (collection) => {

        // fetched data 
        const [nftLlamaCollectionData, setNftLlamaCollectionData] = useState(null)
        const [nftLlamaCollectionVolumeData, setNftLlamaCollectionVolumeData] = useState(null)
        const [nftLlammaCollectionFloorPriceData, setNftLlammaCollectionFloorPriceData] = useState(null)
        const [openSeaCollectionData, setOpenSeaCollectionData] = useState(null)
        const [llammaNFTSalesHistoryData, setLlammaNFTSalesHistoryData] = useState(null)
        const [llammaOrderBookData, setllammaOrderBookData] = useState(null)

        //loading and error states for each fetch (TODO)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        const [OpenSeaCollectionDataError, setOpenSeaCollectionDataError] = useState(null)
        const [OpenSeaCollectionDataLoading, setOpenSeaCollectionDataLoading] = useState(true)

        const [volumeError, setVolumeError] = useState(null)
        const [volumeLoading, setVolumeLoading] = useState(true)

        const [floorPriceError, setfloorPriceError] = useState(null)
        const [floorPriceLoading, setfloorPriceLoading] = useState(true)

        const [salesError, setSalesError] = useState(null)
        const [salesLoading, setSalesLoading] = useState(true)

        const [orderBookError, setOrderBookError] = useState(null)
        const [orderBookLoading, setOrderBookLoading] = useState(true)

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
                setVolumeError(error.message)
            } finally {
                setVolumeLoading(false)
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
                setfloorPriceError(error.message)
            } finally {
                setfloorPriceLoading(false)
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
                setSalesError(error.message)
            } finally {
                setSalesLoading(false)
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
                setOrderBookError(error.message)
            } finally {
                setOrderBookLoading(false)
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
            const handleFetch = async () => {
                try{
                    await fetchLlammaNFTCollectionData(collection.collectionId)
                }
                catch{
                    setError(error.message)
                }
                finally{
                    setLoading(false)
                }
            }
            handleFetch()
        },[])

        useEffect(() => {
            const handleFetch = async () => {
                try{
                    await fetchOpenSeaCollectionData(collection)
                }
                catch{
                    setOpenSeaCollectionDataError(error.message)
                }
                finally{
                    setOpenSeaCollectionDataLoading(false)
                }
            }
            handleFetch()
        },[])

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
            error, 
            loading,
            OpenSeaCollectionDataError,
            OpenSeaCollectionDataLoading,
            volumeError,
            volumeLoading, 
            floorPriceError,
            floorPriceLoading,
            salesError,
            salesLoading,
            orderBookError,
            orderBookLoading,
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
        error, 
        loading,
        OpenSeaCollectionDataError,
        OpenSeaCollectionDataLoading,
        volumeError,
        volumeLoading,
        floorPriceError,
        floorPriceLoading,
        salesError,
        salesLoading,
        orderBookError,
        orderBookLoading,
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
    if(loading) return <Loading/>

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
        <div className='single-collection'>
            <div className='collection-header'>
                { OpenSeaCollectionDataError &&
                    <div>
                        A network error was encountered
                    </div>
                }
                {
                    OpenSeaCollectionDataLoading === true &&
                    <Loading/>
                }
                {
                    openSeaCollectionData &&
                    <div className='collection-banner-container'>
                        {
                            openSeaCollectionData &&
                            openSeaCollectionData.banner_image_url !== "" &&
                            (
                                <img className='collection-banner' src={openSeaCollectionData.banner_image_url} alt={`${collection.name} banner image`} />
                            )
                        }
                        {
                            openSeaCollectionData &&
                            openSeaCollectionData.banner_image_url === "" &&
                            (
                                <img className='collection-banner' src={blankNFT} alt={`blank banner image`} />
                            )
                        }
                    </div>
                }
                {
                    nftLlamaCollectionData &&
                    nftLlamaCollectionData[0].image &&
                    (
                        <div className='collection-image-container'>
                            <img className='collection-page-collection-image' src={nftLlamaCollectionData[0].image} alt="collection image" />
                        </div>
                    )
                }
            </div>
            <div className='single-collection-body'>
                <div className='collection-body-text'>
                    <div className='collection-name'><strong>{collection.name}</strong></div>
                    {
                        openSeaCollectionData &&
                        openSeaCollectionData.description &&
                            <div className='collection-description'>{openSeaCollectionData.description}</div>
                    }
                    {
                        openSeaCollectionData &&
                        collection &&
                        (
                            <ul className='collection-links-list'>
                                {
                                    openSeaCollectionData.project_url !== undefined &&
                                    openSeaCollectionData.project_url !== "" &&
                                    <li className='collection-project-url'>
                                        <Link to={openSeaCollectionData.project_url} target='_blank'>
                                            <i className='fas fa-globe fa-lg'></i>
                                        </Link>
                                    </li>
                                }
                                {
                                    openSeaCollectionData.discord_url !== undefined &&
                                    openSeaCollectionData.discord_url !== "" &&
                                    <li className='collection-discord-url'>
                                        <Link to={openSeaCollectionData.discord_url} target='_blank'>
                                            <img className='collection-link-icon' src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="discord icon" />
                                        </Link>
                                    </li>
                                }
                                {
                                    openSeaCollectionData.contracts !== undefined &&
                                    openSeaCollectionData.contracts[0].address !== undefined &&
                                    <li className='collection-etherscan'>
                                        <Link to={`https://etherscan.io/address/${openSeaCollectionData.contracts[0].address}`} target='_blank'>
                                            <img src="https://etherscan.io/images/brandassets/etherscan-logo-circle-light.svg" alt="etherscan icon" className='collection-link-icon' />
                                        </Link>
                                    </li>
                                }
                                {
                                    openSeaCollectionData.instagram_username !== undefined &&
                                    openSeaCollectionData.instagram_username !== "" &&
                                    <li className='collection-instagram-username'>
                                        <Link to={`https://www.instagram.com/${openSeaCollectionData.instagram_username}`} target='_blank'>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/1200px-Instagram.svg.png" alt="instagram icon" className='collection-link-icon' />
                                        </Link>
                                    </li>
                                }
                                {
                                    openSeaCollectionData.telegram_url !== undefined &&
                                    openSeaCollectionData.telegram_url !== "" &&
                                    <li className='collection-telegram-url'>
                                        <Link to={`https://t.me/${openSeaCollectionData.telegram_url}`} target='_blank'>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="telegram icon" className='collection-link-icon'/>
                                        </Link>
                                    </li>
                                }
                                {
                                    openSeaCollectionData.twitter_username !== undefined &&
                                    openSeaCollectionData.twitter_username !== "" &&
                                    <li className='collection-twitter-username'>
                                        <Link to={`https://twitter.com/${openSeaCollectionData.twitter_username}`} target='_blank'>
                                            <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.png" alt="x icon" className='collection-link-icon'/>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        )
                        
                    }
                </div>
                <ul className='collection-stats-list'>
                    <li className='collection-stats-volume collection-stat'>
                        {
                            showVolumeData === false &&
                            <div className='collection-stats-title' onClick={() => handleVolumeClick()}>Volume</div>
                        }
                        {
                            showVolumeData === true &&
                            volumeError &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleVolumeClick()}>Volume</div>
                                <div>A network error was encountered</div>
                            </>
                        }
                        {
                            showVolumeData === true &&
                            volumeLoading &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleVolumeClick()}>Volume</div>
                                <Loading/>
                            </>
                        }
                        {
                            showVolumeData === true &&
                            nftLlamaCollectionVolumeData &&
                            volumeLoading === false &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleVolumeClick()}>Volume</div>
                                <VolumePlot className='volume-plot' volumeData={nftLlamaCollectionVolumeData}/>
                            </>
                        }
                    </li>
                    <li className='collection-stats-floor-price collection-stat'>
                        {
                            showFloorPriceData === false &&
                            <div className='collection-stats-title' onClick={() => handleFloorPriceClick()}>Floor Price</div>
                        }
                        {
                            showFloorPriceData === true &&
                            floorPriceError &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleFloorPriceClick()}>Floor Price</div>
                                <div>A network error was encountered</div>
                            </>
                        }
                        {
                            showFloorPriceData === true &&
                            floorPriceLoading === true &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleFloorPriceClick()}>Floor Price</div>
                                <Loading/>
                            </>
                        }
                        {
                            showFloorPriceData === true &&
                            nftLlammaCollectionFloorPriceData &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleFloorPriceClick()}>Floor Price</div>
                                <FloorPricePlot className='volume-plot' floorPriceData={nftLlammaCollectionFloorPriceData}/>
                            </>
                        }
                    </li>
                    <li className='collection-stats-sales-history collection-stat'>
                        {
                            showSaleHistoryData === false &&
                            <div className='collection-stats-title' onClick={() => handleSalesHistoryClick()}>Sales Historic</div>
                        }
                        {
                            showSaleHistoryData === true &&
                            salesError &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleSalesHistoryClick()}>Sales Historic</div>
                                <div>A network error was encountered</div>
                            </>
                        }
                        {
                            showSaleHistoryData === true &&
                            salesLoading === true &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleSalesHistoryClick()}>Sales Historic</div>
                                <Loading/>
                            </>
                        }
                        {
                            showSaleHistoryData === true &&
                            llammaNFTSalesHistoryData &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleSalesHistoryClick()}>Sales Historic</div>
                                <SalesHistoryPlot salesHistoryData={llammaNFTSalesHistoryData}/>
                            </>
                        }
                    </li>
                    <li className='collection-stats-order-book collection-stat'>
                        {
                            showOrderBookData === false &&
                            <div className='collection-stats-title' onClick={() => handleOrderBookClick()}>Order Book</div>
                        }
                        {
                            showOrderBookData === true &&
                            orderBookError &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleOrderBookClick()}>Order Book</div>
                                <div>A network error was encountered</div>
                            </>
                        }
                        {
                            showOrderBookData === true &&
                            orderBookLoading === true &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleOrderBookClick()}>Order Book</div>
                                <Loading/>
                            </>
                        }
                        {
                            showOrderBookData === true &&
                            llammaOrderBookData &&
                            <>
                                <div className='collection-stats-title' onClick={() => handleOrderBookClick()}>Order Book</div>
                                <OrderBookPlot orderBookData={llammaOrderBookData}/>
                            </>
                        }
                    </li>
                </ul>
                <NFTsListSwitcher collection={collection}/>
            </div>
        </div>
    )

}

export default SingleCollection