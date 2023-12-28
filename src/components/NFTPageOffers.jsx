import { useState, useEffect } from "react"
import Loading from "./Loading"

const NFTPageOffers = ({openSeaSingleNFTData}) => {

    const handleLoad = (openSeaSingleNFTData) => {
        const [offerInfo, setOfferInfo] = useState(null)
        const [offerInfoError, setOfferInfoError] = useState(null)
        const [offerInfoLoading, setOfferInfoLoading] = useState(true)

        const fetchOfferInfo = async (openSeaSingleNFTData) => {

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
                    ? `https://api.opensea.io//api/v2/orders/ethereum/seaport/offers?asset_contract_address=${openSeaSingleNFTData.nft.contract}&cursor=${nextPage}&limit=50&order_by=eth_price&token_ids=${openSeaSingleNFTData.nft.identifier}` 
                    : `https://api.opensea.io//api/v2/orders/ethereum/seaport/offers?asset_contract_address=${openSeaSingleNFTData.nft.contract}&limit=50&order_by=eth_price&token_ids=${openSeaSingleNFTData.nft.identifier}`
                try{
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    allNFTs = allNFTs.concat(await data.orders);
                    nextPage = await data.cursor;
                } catch(error){
                    setOfferInfoError(error.message)
                } finally {
                    setOfferInfo(allNFTs)
                    setOfferInfoLoading(false)
                }
            } while (nextPage)

        }

        //separate useEffect for the looped fetch
        useEffect(() => {
            const handleFetches = async () => {
                try {
                    await fetchOfferInfo(openSeaSingleNFTData);
                } catch (error) {
                    setOfferInfoError(error);
                } finally {
                    setOfferInfoLoading(false);
                }
            };
        
            handleFetches();
        }, []);

        return {
            offerInfo,
            offerInfoError,
            offerInfoLoading
        }
    }

    const {
        offerInfo,
        offerInfoError,
        offerInfoLoading
    } = handleLoad(openSeaSingleNFTData)

    if(offerInfoError) return <p>A network error was encountered</p>
    if(offerInfoLoading) return <Loading/>
    console.log(offerInfo)

    return(
        <div className="offers-container">
            Offers
        </div>
    )

}

export default NFTPageOffers