import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useShoppingCart } from '../scripts/ShoppingCartContext.jsx'

const CheckoutListItem = ({item}) => {

    const { shoppingCart, addToCart, removeFromCart } = useShoppingCart()

    return(
        <div className="checkout-list-item">
            <div className="item-name">
                <strong>
                    {`${item[0].maker_asset_bundle.assets[0].collection.name} #${item[0].maker_asset_bundle.assets[0].token_id}`}
                </strong>
            </div>
            <div className="item-image-container">
                <img className="item-image" src={item[0].maker_asset_bundle.assets[0].image_url} alt="nft item image" />
            </div>
            <div className="item-price">
            {`${(item[0].current_price / (10 ** item[0].taker_asset_bundle.assets[0].decimals)).toFixed(5)} ${item[0].taker_asset_bundle.assets[0].name}`}
            </div>
            <div className="item-buttons-row">
                <button className="remove-item-button" onClick={() => removeFromCart(item)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CheckoutListItem