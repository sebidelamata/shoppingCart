import { useState, useEffect } from 'react'
import blank_nft from '../../public/blank_nft.svg'
import eth_icon from '../../public/ethereum_icon.png'
import { Link } from 'react-router-dom'

const CollectionCard = ({collection}) => {

    const bullBearFontColor = (pctChange) => {
        if(pctChange > 0){
            return 'rgb(0,255,0)'
        } else if(pctChange < 0){
            return 'rgb(255,0,255)'
        } else { return 'white'}
    }

    return(
        <Link className='collection-card' to={`/shop/collections/${collection.collectionId}`} state={collection}>
            {
                (collection && collection.image) && (
                    <div className='collection-card-image'>
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
            <div className='collection-card-top-row'>
                <div className='collection-card-name'><strong>{collection.name}</strong></div>
                {
                    collection && (
                        <div className='collection-card-floor-price'>
                            <div className='floor-price'>
                                <div>
                                    Floor Price:
                                </div>
                                <strong>
                                    {` ${collection.floorPrice}`}
                                </strong>
                            </div>
                            <div className='unit-of-payment'>
                                <img className='unit-icon' src={eth_icon} alt="ETH" />
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='collection-card-address'>{collection.collectionId}</div>
            <div className='collection-card-bottom-row'>
                <div className='colllection-card-chain'></div>
            </div>
            <div className='stats-rows'>
                <div className='1-day-row'>
                    {
                        collection && (
                            <div className='one-day-pct-change'>
                                <div className='one-day-pct-change-label'>
                                    1-Day Pct Change
                                </div>
                                <div className='one-day-pct-change-value-and-symbol'>
                                    <div className='one-day-pct-change-value' style={{color: bullBearFontColor(collection.floorPricePctChange1Day)}}>
                                        <strong>
                                            {collection.floorPricePctChange1Day}
                                        </strong>
                                    </div>
                                    <div className='one-day-pct-change-symbol' style={{ color: bullBearFontColor(collection.floorPricePctChange1Day)}}>
                                        <strong>
                                            %
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='seven-day-row'>
                    {
                        collection && (
                            <div className='seven-day-pct-change'>
                                <div className='seven-day-pct-change-label'>
                                    7-Day Pct Change
                                </div>
                                <div className='seven-day-pct-change-value-and-symbol'>
                                    <div className='seven-day-pct-change-value' style={{color: bullBearFontColor(collection.floorPricePctChange7Day)}}>
                                        <strong>
                                            {collection.floorPricePctChange7Day}
                                        </strong>
                                    </div>
                                    <div className='seven-day-pct-change-symbol' style={{ color: bullBearFontColor(collection.floorPricePctChange7Day)}}>
                                        <strong>
                                            %
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='supply-and-for-sale-row'>
                    <div className='supply'>
                        <div className='supply-label'>
                            Supply: 
                        </div>
                        <div>
                            <strong>
                                {collection.totalSupply}
                            </strong>
                        </div>
                    </div>
                    <div className='num-for-sale'>
                        <div className='num-for-sale-label'>
                            For Sale: 
                        </div>
                        <div>
                            <strong>
                                {collection.onSaleCount}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionCard