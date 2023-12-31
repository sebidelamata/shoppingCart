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
      console.log('click')
      setShoppingCart((prevCart) => [...prevCart, item]);
    }

    return(
        <ShoppingCartContext.Provider value={{ shoppingCart, addToCart }}>
          {children}
        </ShoppingCartContext.Provider>
      )
}

export {useShoppingCart, ShoppingCartProvider}