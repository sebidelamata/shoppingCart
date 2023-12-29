import { useState, useEffect } from "react"
import Loading from "./Loading"

const NFTPageListings = ({openSeaSingleNFTData}) => {

    const [showListings, setShowListings] = useState(false)

    const handleListingsClick = () => {
        setShowListings(!showListings)
    }

    const handlePageLoad = (openSeaSingleNFTData) => {
        const [listingInfo, setListingInfo] = useState(null)
        const [listingInfoError, setListingInfoError] = useState(null)
        const [listingInfoLoading, setListingInfoLoading] = useState(true)

        const fetchListingInfo = async (openSeaSingleNFTData) => {

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
                const url = nextPage 
                    ? `https://api.opensea.io//api/v2/orders/ethereum/seaport/listings?asset_contract_address=${openSeaSingleNFTData.nft.contract}&cursor=${nextPage}&limit=50&order_by=eth_price&token_ids=${openSeaSingleNFTData.nft.identifier}` 
                    : `https://api.opensea.io//api/v2/orders/ethereum/seaport/listings?asset_contract_address=${openSeaSingleNFTData.nft.contract}&limit=50&order_by=eth_price&token_ids=${openSeaSingleNFTData.nft.identifier}`
                try{
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    allNFTs = allNFTs.concat(await data.orders);
                    nextPage = await data.cursor;
                } catch(error){
                    setListingInfoError(error.message)
                } finally {
                    setListingInfo(allNFTs)
                    setListingInfoLoading(false)
                }
            } while (nextPage)

        }

        //separate useEffect for the looped fetch
        useEffect(() => {
            const handleFetches = async () => {
                try {
                    await fetchListingInfo(openSeaSingleNFTData);
                } catch (error) {
                    setListingInfoError(error);
                } finally {
                    setListingInfoLoading(false);
                }
            };
        
            handleFetches();
        }, []);

        return {
            listingInfo,
            listingInfoError,
            listingInfoLoading
        }
    }

    const {
        listingInfo,
        listingInfoError,
        listingInfoLoading,
    } = handlePageLoad(openSeaSingleNFTData)

    if(listingInfoError) return <p>A network error was encountered</p>
    if(listingInfoLoading) return <Loading/>
    console.log(listingInfo)
    return(
        <div className="listings-container" onClick={() => handleListingsClick()}>
            <div className="listings-title">Listings</div>
            {
                showListings === true &&
                <ul className="listings-list">
                    {
                        listingInfo.map((listing) => {
                            return(
                                <li key={`listing-${listing.order_hash}`} className="listing">
                                    {`${listing.current_price / (10 ** listing.taker_asset_bundle.assets[0].decimals).toFixed(4)} ETH`}
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default NFTPageListings