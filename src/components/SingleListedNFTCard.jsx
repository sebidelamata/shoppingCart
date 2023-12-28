import { useState, useEffect } from "react";
import Loading from "./Loading";

const SingleListedNFTCard = ({listing}) => {

    const OpenSeaSingleNFT = (listing) => {
        const [openSeaSingleNFTData, setOpenSeaSingleNFTData] = useState(null)
        const [error, setError] = useState(null)
        const [loading, setLoading] = useState(true)

        const fetchSingleNFTOpenSea = async (nft) => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
                }
            }

            const url = `https://api.opensea.io/api/v2/chain/ethereum/contract/${listing.protocol_data.parameters.offer[0].token}/nfts/${listing.protocol_data.parameters.offer[0].identifierOrCriteria}`;
            try{
                const response = await fetch(url, options);
              console.log(response)
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
              
                  const data = await response.json();
                  setOpenSeaSingleNFTData(data);
            } catch(error){
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
    
        useEffect(() => {
            fetchSingleNFTOpenSea(listing)
        }, [])
    
        return { openSeaSingleNFTData, error, loading}
    }

    const {
        openSeaSingleNFTData, 
        error, 
        loading
    } = OpenSeaSingleNFT(listing)

    console.log(openSeaSingleNFTData)

    if(error) return <p>A network error was encountered</p>
    if(loading) return <Loading/>

    return(
        <div className="single-listed-nft-card">
            {listing.protocol_data.parameters.offer[0].identifierOrCriteria}
        </div>
    )
}

export default SingleListedNFTCard