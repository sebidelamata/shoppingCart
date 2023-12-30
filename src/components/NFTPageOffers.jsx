import { useState, useEffect } from "react"
import Loading from "./Loading"
import OfferStopwatch from "./OfferStopwatch"

const NFTPageOffers = ({openSeaSingleNFTData}) => {

    const [showOffers, setShowOffers] = useState(false)
    const [countdownOfferZero, setCountdownOfferZero] = useState(false)

    console.log(openSeaSingleNFTData)
    const handleCountdownZero = () => {
        setCountdownOfferZero(true);
      };

    const handleOffersClick = () => {
        setShowOffers(!showOffers)
    }

    const handleLoad = (openSeaSingleNFTData) => {

        const [offerInfo, setOfferInfo] = useState(null)
        const [offerInfoError, setOfferInfoError] = useState(null)
        const [offerInfoLoading, setOfferInfoLoading] = useState(true)

        const fetchOfferInfo = async (openSeaSingleNFTData) => {

            let bestOffer

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

                const url = `https://api.opensea.io/api/v2/offers/collection/${openSeaSingleNFTData.nft.collection}/nfts/${openSeaSingleNFTData.nft.identifier}/best`
                try{
                    const response = await fetch(url, options);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log(data)
                    bestOffer = data
            } catch(error){
                setOfferInfoError(error.message)
            } finally {
                setOfferInfo(bestOffer)
                setOfferInfoLoading(false)
            }

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
    const expiration = new Date(offerInfo.protocol_data.parameters.endTime * 1000).toLocaleString()
    const creation = new Date(offerInfo.protocol_data.parameters.startTime * 1000).toLocaleString()

    return(
            <div className="offers-container" onClick={() => handleOffersClick()}>
                <div className="offer-container-title"><strong>Best Offer</strong></div>
                {
                    showOffers === true &&
                    <>
                        <OfferStopwatch offerInfo={offerInfo} handleCountdownZero={handleCountdownZero}/>
                        <div className="offer-headers">
                            <div className="offer-price-label">
                                Price
                            </div>
                            <div className="offer-expiration-label">
                                Expiration
                            </div>
                            <div className="offer-creation-label">
                                Created
                            </div>
                        </div>
                        <div className="offer-values">
                            <div className="best-offer">
                                {`${offerInfo.price.value / (10 ** offerInfo.price.decimals)} ${offerInfo.price.currency}`}
                            </div>
                            <div className="best-offer">
                                {expiration}
                            </div>
                            <div className="best-offer">
                                {creation}
                            </div>
                        </div>
                    </>
                }
        </div>
    )

}

export default NFTPageOffers