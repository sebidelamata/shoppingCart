import { useState, useEffect } from 'react'
import blank_nft from '../../public/blank_nft.svg'

const CollectionCard = ({collection}) => {

    return(
        <div className='collection-card'>
            {
                (collection && collection.image) && (
                    <div>
                        <img src={collection.image} className='collection-image' alt={`${collection.name} Image`} />
                    </div>

                )
            }
            {
                (!collection || !collection.image) && (
                    <div>
                        <img src={blank_nft} className='collection-image' alt={`${collection.name} Image`} />
                    </div>

                )
            }
            <div className='collection-card-name'><strong>{collection.name}</strong></div>
            <div className='collection-card-address'>{collection.collectionId}</div>
            <div className='collection-card-bottom-row'>
                <div className='colllection-card-chain'></div>
                {
                    collection && (
                        <div className='collection-card-floor-price'>
                            {`Floor Price: ${collection.floorPrice} ETH`}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CollectionCard