import axios from "axios";
import { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Create the StoreContext
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(""); // User authentication token
    const [food_list, setFoodList] = useState([]);
    const url = "https://restaurant-be-uo5b.onrender.com"; // API base URL
    const navigate = useNavigate(); // Initialize useNavigate

    const redirectToHome = () => {
        localStorage.removeItem("token"); // Clear token from localStorage
        navigate("/"); // Redirect to home
    };
    const loadCartData = async (savedToken) => {
        if (!savedToken) {
            console.error("No token found. Please log in.");
            return;
        }
    
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: {
                    Authorization: `Bearer ${savedToken}`, // Ensure the token from localStorage is used
                },
            });
    
            console.log("Cart data loaded:", response.data);
            setCartItems(response.data); // Set the cart items fetched from the API
        } catch (error) {
            console.error("Error loading cart data:", error.response ? error.response.data.message : error.message);
        }
    };
    
    
    
    

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedToken = localStorage.getItem("token");
                if (savedToken) {
                    setToken(savedToken);
                    await loadCartData(savedToken); // Load cart data after token is set
                } else {
                    console.error("No token found. Please log in."); // Inform user to log in
                }
                await fetchFoodList();
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        loadData();
    }, []); // Runs only on initial mount

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const quantity = cartItems[itemId];
            const itemInfo = food_list.find((product) => product._id === itemId); // Find product by ID
            if (itemInfo) {
                return total + itemInfo.price * quantity; // Calculate total price
            }
            return total;
        }, 0); // Initial total is 0
    };

    const addToCart = async (itemId) => {
        const savedToken = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!savedToken) {
            console.error("No token found. Please log in.");
            return;
        }
    
        // Update cart items in state
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    
        try {
            const response = await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { Authorization: `Bearer ${savedToken}` } } // Use the retrieved token
            );
            console.log("Item added to cart successfully:", response.data);
        } catch (error) {
            console.error(
                "Error adding item to cart:",
                error.response ? error.response.data.message : error.message
            );
        }
    };
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 }; // Decrease quantity
            } else {
                const { [itemId]: _, ...rest } = prev; // Remove item if quantity is 1 or less
                return rest;
            }
        });

        const savedToken = localStorage.getItem("token"); // Retrieve token again
        if (savedToken) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    { headers: { Authorization: `Bearer ${savedToken}` } }
                );
            } catch (error) {
                console.error("Error removing item from cart", error.response ? error.response.data.message : error.message);
            }
        } else {
            console.error("No token found. Please log in.");
        }
    };

    const contextValue = useMemo(() => ({
        food_list, // List of food items (products)
        cartItems, // Current cart state
        addToCart, // Function to add items to the cart
        removeFromCart, // Function to remove items from the cart
        getTotalCartAmount, // Function to calculate total cart amount
        url, // API base URL
        token, // User token for authentication
        setToken, // Function to set token
    }), [cartItems, token, food_list]);

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
