import { useState, useEffect } from 'react'
import blank_nft from '../../public/blank_nft.svg'
import polygonLogo from '../../public/polygon-logo.png'
import baseLogo from '../../public/base-logo.png'
import optimismLogo from '../../public/optimism-logo.png'
import ethereumLogo from '../../public/ethereum_icon.png'
import zoraLogo from '../../public/zora_icon.png'
import arbitrumLogo from '../../public/arbitrum-logo.png'
import avalancheLogo from '../../public/avalanche-logo.png'
import binanceLogo from '../../public/bnb-icon.png'
import klaytnLogo from '../../public/klaytn-logo.png'
import solanaLogo from '../../public/solana-logo.png'
import arbitrumNovaLogo from '../../public/arbitrum-nova-icon.png'

const CollectionCard = ({collection}) => {
    const [collectionURL, setCollectionURL] = useState(null)
    const [collectionStats, setCollectionStats] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const blockchainIcons = {
        'matic': polygonLogo,
        'base': baseLogo,
        'optimism': optimismLogo,
        'ethereum': ethereumLogo,
        'zora': zoraLogo,
        'arbitrum': arbitrumLogo,
        'avalanche': avalancheLogo,
        'bsc': binanceLogo,
        'klaytn': klaytnLogo,
        'solana': solanaLogo,
        'arbitrum_nova': arbitrumNovaLogo
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY
        }
    }
    
    // fetch name and picture
    useEffect(() => {
        fetch(`https://api.opensea.io/api/v2/collections/${collection.collection}`, options)
        .then((response) => {
            if(response.status >= 400){
                throw new Error('server error');
                }
            return response.json()
        })
        .then((response) => setCollectionURL(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }, [])

    // fetch collection stats
    useEffect(() => {
        fetch(`https://api.opensea.io/api/v2/collections/${collection.collection}/stats`, options)
        .then((response) => {
            if(response.status >= 400){
                throw new Error('server error');
                }
            return response.json()
        })
        .then((response) => setCollectionStats(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }, [])

    console.log(collectionStats)

    return(
        <div className='collection-card'>
            {
                (collectionURL && collectionURL.image_url) && (
                    <div>
                        <img src={collectionURL.image_url} className='collection-image' alt={`${collection.name} Image`} />
                    </div>

                )
            }
            {
                (!collectionURL || !collectionURL.image_url) && (
                    <div>
                        <img src={blank_nft} className='collection-image' alt={`${collection.name} Image`} />
                    </div>

                )
            }
            <div className='collection-card-name'><strong>{collection.name}</strong></div>
            <div className='collection-card-address'>{collection.contracts[0].address}</div>
            <div className='collection-card-bottom-row'>
                <div className='colllection-card-chain'>
                    <img className='blockchain-icon' src={blockchainIcons[collection.contracts[0].chain]} alt={`${collection.contracts[0].chain}`} />
                </div>
                {
                    collectionStats && (
                        <div className='collection-card-floor-price'>
                            {`Floor Price: ${collectionStats.total.floor_price} ${collectionStats.total.floor_price_symbol === '' ? 'ETH' : collectionStats.total.floor_price_symbol}`}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CollectionCard