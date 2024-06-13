import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [books, setBooks] = useState([]);
    const [cartItem, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItem, item]);
    };

    return (
        <AppContext.Provider
            value={{ products, setProducts, books, setBooks, cartItem, addToCart, setCartItems }}
        >
            {children}
        </AppContext.Provider>
    );

}

export const AppState = () => {
    return useContext(AppContext);
}

export default AppProvider;