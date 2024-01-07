import { useContext, createContext, useState } from "react";

const ShoppingCartContext = createContext()

const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
      throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
}

const ShoppingCartProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);
  
    const addToCart = (item) => {
      const inputToken = item[0].protocol_data.parameters.offer[0].token
      const inputIdentifier = item[0].protocol_data.parameters.offer[0].identifierOrCriteria
      const containsToken = shoppingCart.some(obj => obj[0].protocol_data.parameters.offer[0].token === inputToken)
      const containsIdentifier = shoppingCart.some(obj => obj[0].protocol_data.parameters.offer[0].identifierOrCriteria === inputIdentifier)
      const isUnique = !(containsToken && containsIdentifier)
      if(isUnique === true){
        setShoppingCart((prevCart) => [...prevCart, item]);
      }
    }

    const removeFromCart = (item) => {
      const inputToken = item[0].protocol_data.parameters.offer[0].token
      const inputIdentifier = item[0].protocol_data.parameters.offer[0].identifierOrCriteria
      const newShoppingCart = shoppingCart.filter(obj => !(obj[0].protocol_data.parameters.offer[0].token.toUpperCase() === inputToken.toUpperCase() && obj[0].protocol_data.parameters.offer[0].identifierOrCriteria === inputIdentifier))
      setShoppingCart(newShoppingCart);
    }

    return(
        <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart, addToCart, removeFromCart }}>
          {children}
        </ShoppingCartContext.Provider>
      )
}

export {useShoppingCart, ShoppingCartProvider}