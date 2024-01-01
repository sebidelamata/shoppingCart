import { useState, useEffect } from "react"
import Loading from "./Loading"
import ListingStopwatch from "./ListingStopwatch"
import { Link } from "react-router-dom"
import { useShoppingCart } from '../scripts/ShoppingCartContext.jsx'

const NFTPageListings = ({openSeaSingleNFTData, collection}) => {

    const [showListings, setShowListings] = useState(false)
    const [countdownZero, setCountdownZero] = useState(false)
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)

    const { shoppingCart, addToCart } = useShoppingCart()

    const [isInCart, setIsInCart] = useState(false)
    const checkIsInCart = () => {
        const inputToken = openSeaSingleNFTData.nft.contract.toUpperCase()
        const inputIdentifier = openSeaSingleNFTData.nft.identifier.toUpperCase()
        const containsToken = shoppingCart.some(obj => obj[0].protocol_data.parameters.offer[0].token.toUpperCase() == inputToken)
        const containsIdentifier = shoppingCart.some(obj => obj[0].protocol_data.parameters.offer[0].identifierOrCriteria.toUpperCase() == inputIdentifier)
        const isUnique = !(containsToken && containsIdentifier)
        if(isUnique === false){
            setIsInCart(true)
        }
    }
    useEffect(() => {
        checkIsInCart()
    }, [shoppingCart])

    const handleListingsClick = () => {
        setShowListings(!showListings)
    }

    const handleCountdownZero = () => {
        setCountdownZero(true)
      }
    
    const handleShowCheckoutModalClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        setShowCheckoutModal(!showCheckoutModal)
    }

    const handleAddToCartClick = (listingInfo) => {
        handleShowCheckoutModalClick()
        addToCart(listingInfo)
    }

    const handlePageLoad = (openSeaSingleNFTData) => {
        const [listingInfo, setListingInfo] = useState(null)
        const [listingInfoError, setListingInfoError] = useState(null)
        const [listingInfoLoading, setListingInfoLoading] = useState(true)
        console.log(isInCart)

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
            if (countdownZero) {
                handleFetches();
                setCountdownZero(false); // Reset the state after triggering the fetch
              }
        
            handleFetches();
        }, [countdownZero]);

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
        <>
            {
                 Object.keys(listingInfo).length !== 0 &&
                 <>
                     <div className="current-price-and-expiration-container">
                         <div className="current-price-container">
                             <div className="current-price-label">
                                 Ask Price:
                             </div>
                             <div className="current-price">
                                 {
                                    (listingInfo.slice().reverse()[0].current_price / (10 ** listingInfo.slice().reverse()[0].taker_asset_bundle.assets[0].decimals)).toFixed(4).length > 15
                                    ? `${(listingInfo.slice().reverse()[0].current_price / (10 ** listingInfo.slice().reverse()[0].taker_asset_bundle.assets[0].decimals)).toFixed(0)} ${listingInfo.slice().reverse()[0].taker_asset_bundle.assets[0].name}`
                                    : `${(listingInfo.slice().reverse()[0].current_price / (10 ** listingInfo.slice().reverse()[0].taker_asset_bundle.assets[0].decimals)).toFixed(4)} ${listingInfo.slice().reverse()[0].taker_asset_bundle.assets[0].name}`
                                 }
                             </div>
                         </div>
                         <div className="expiration-container">
                             <div className="expiration-title">Expires In:</div>
                             <ListingStopwatch listingInfo={listingInfo} handleCountdownZero={handleCountdownZero} />
                         </div>
                         <div className="add-to-cart-button-container">
                             <button className={isInCart === false ? `add-to-cart-button` : `add-to-cart-button inactive`} onClick={() => handleAddToCartClick(listingInfo)}><i className="fas fa-shopping-cart"></i></button>
                         </div>
                     </div>
                     <div className="listings-container" onClick={() => handleListingsClick()}>
                         <div className="listings-title"><strong>Listings</strong></div>
                         {
                             showListings === true &&
                             <>
                                 <div className="listing-headers">
                                     <div className="listing-price-label">
                                         Price
                                     </div>
                                     <div className="listing-expiration-label">
                                         Expiration
                                     </div>
                                     <div className="listing-creation-label">
                                         Created
                                     </div>
                                 </div>
                                 <ul className="listings-list">
                                     {
                                         listingInfo.slice().reverse().map((listing) => {
                                             const expiration = new Date(listing.expiration_time * 1000).toLocaleString()
                                             const creation = new Date(listing.listing_time * 1000).toLocaleString()
                                             return(
                                                 <li key={`listing-${listing.order_hash}`} className="listing">
                                                     <div className="listing-values">
                                                         <div className="listing-price">
                                                             {`${(listing.current_price / (10 ** listing.taker_asset_bundle.assets[0].decimals)).toFixed(4)} ${listing.taker_asset_bundle.assets[0].name}`}
                                                         </div>
                                                         <div className="listing-expiration">
                                                             {expiration}
                                                         </div>
                                                         <div className="listing-creation">
                                                             {creation}
                                                         </div>
                                                     </div>
                                                 </li>
                                             )
                                         })
                                     }
                                 </ul>
                             </>
                         }
                     </div>
                 </>
            }
            {
                Object.keys(listingInfo).length === 0 &&
                <div className="no-listings-container">
                    <strong>No Current Listings</strong>
                </div>
            }
            {
                showCheckoutModal === true &&
                <div className="checkout-modal-backdrop">
                    <div className="checkout-modal-container">
                        <div className="checkout-modal-title">
                            {`${collection.collection.name} #${openSeaSingleNFTData.nft.identifier} Added to Cart!`}
                        </div>
                        <div className="checkout-modal-image-container">
                            <img src={openSeaSingleNFTData.nft.image_url} alt="NFT Image" loading="lazy" className="checkout-modal-image"/>
                        </div>
                        <div className="buttons-container">
                            <Link to={'/checkout'} onClick={() => handleShowCheckoutModalClick()}>
                                <button>Proceed to Checkout</button>
                            </Link>
                            <Link to={'/shop'} onClick={() => handleShowCheckoutModalClick()}>
                                <button>Keep Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default NFTPageListings