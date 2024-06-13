import React, { useEffect, useState } from 'react';
import { AppState } from '../Context/Context';
import { Link } from 'react-router-dom';

export const ViewCart = () => {
    const { cartItem, setCartItems } = AppState(); // Access cart items and the function to update them from context
    const [cartDetails, setCartDetails] = useState([]); // State to store detailed information about items in the cart

    // Function to fetch item details from an API based on item type
    const fetchItemDetails = async (item) => {
        let url = '';
        if (item.type === 'product') {
            url = `https://api.freeapi.app/api/v1/public/randomproducts/${item.id}`;
        } else if (item.type === 'book') {
            url = `https://api.freeapi.app/api/v1/public/books/${item.id}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    };

    // Effect hook to fetch detailed information for items in the cart
    useEffect(() => {
        const fetchCartDetails = async () => {
            if (cartItem.length > 0) {
                // Aggregate cart items by summing counts for items with the same id and type
                const aggregatedCartItems = cartItem.reduce((acc, item) => {
                    const key = item.id + item.type; // Unique key combining id and type
                    if (!acc[key]) {
                        acc[key] = { ...item, count: 1 }; // Initialize count if item is not already in the accumulator
                    } else {
                        acc[key].count += 1; // Increment count if item is already in the accumulator
                    }
                    return acc;
                }, {});

                const uniqueCartItems = Object.values(aggregatedCartItems); // Convert aggregated items to an array

                // Fetch detailed information for each unique item in the cart
                const fetchedDetails = await Promise.all(
                    uniqueCartItems.map((item) => fetchItemDetails(item).then(data => ({ ...data, type: item.type, count: item.count })))
                );
                setCartDetails(fetchedDetails); // Update state with fetched details
            }
        };
        fetchCartDetails();
    }, [cartItem]);

    // Function to handle removing an item completely from the cart
    const handleRemoveItem = (id, type) => {
        setCartItems(prevCartItem => prevCartItem.filter(item => !(item.id === id && item.type === type)));
    };

    // Function to handle incrementing the count of an item in the cart
    const handleIncrement = (id, type) => {
        setCartItems(prevCartItem => [...prevCartItem, { id, type }]); // Add another instance of the item to the cart
    };

    // Function to handle decrementing the count of an item in the cart
    const handleDecrement = (id, type) => {
        setCartItems(prevCartItem => {
            const index = prevCartItem.findIndex(item => item.id === id && item.type === type); // Find index of the item in the cart
            if (index !== -1) {
                const newCartItems = [...prevCartItem];
                newCartItems.splice(index, 1); // Remove one instance of the item from the cart
                return newCartItems;
            }
            return prevCartItem;
        });
    };

    return (
        <div className="w-full h-full text-black">
            <div className="p-4">
                <h2 className="text-lg text-white font-semibold mb-4">Cart</h2>
                {cartItem.length > 0 ? (
                    // Map over detailed cart items to render each item
                    cartDetails.map((item) => (
                        item.type === 'product' ? (
                            <div key={item.id} className="w-full sm:w-[75%]  flex justify-between mb-4 p-2 border rounded bg-white">
                                <Link to={`/products/${item.id}`} className='w-[70%]'>
                                    <div className="flex justify-around gap-2">
                                        <img src={item.images[0]} alt={item.title} className="h-[100px] w-[100px] object-cover rounded" />
                                        <div>
                                            <h3 className="text-md font-semibold">{item.title}</h3>
                                            <p className="text-sm">Category: {item.category}</p>
                                            <p className="text-sm">Price: ${item.price}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="w-[30%] flex flex-col justify-between items-center">
                                    <button
                                        className="mt-2 p-2 bg-red-500 text-white rounded h-fit w-fit"
                                        onClick={() => handleRemoveItem(item.id, item.type)}
                                    >
                                        Remove
                                    </button>
                                    <div>
                                        <button
                                            className="px-2 bg-gray-300 text-black rounded"
                                            onClick={() => handleDecrement(item.id, item.type)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.count}</span>
                                        <button
                                            className="px-2 bg-gray-300 text-black rounded"
                                            onClick={() => handleIncrement(item.id, item.type)}
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>

                        ) : (
                            <div key={item.id} className="w-full sm:w-[75%] flex justify-between gap-2 mb-4 p-2 border rounded bg-white">
                                <Link to={`/book/${item.id}`} className='w-[70%]'>
                                    <div className="flex justify-around gap-2 ">
                                        <img src={item?.volumeInfo?.imageLinks?.thumbnail} alt={item.title} className="h-[100px] w-[100px] object-cover rounded" />
                                        <div>
                                            <h3 className="text-md font-semibold">{item.volumeInfo.title}</h3>
                                            <p className="text-sm">Genre: {item?.volumeInfo?.categories}</p>
                                            <p className="text-sm">Price: ${item?.saleInfo?.retailPrice?.amount}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="w-[30%] flex items-center flex-col justify-between">
                                    <button
                                        className="mt-2 p-2 bg-red-500 text-white rounded h-fit w-fit"
                                        onClick={() => handleRemoveItem(item.id, item.type)}
                                    >
                                        Remove
                                    </button>
                                    <div>
                                        <button
                                            className="px-2 bg-gray-300 text-black rounded"
                                            onClick={() => handleDecrement(item.id, item.type)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.count}</span>
                                        <button
                                            className="px-2 bg-gray-300 text-black rounded"
                                            onClick={() => handleIncrement(item.id, item.type)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <p className='text-white text-center'>No items in the cart.</p>
                )}
            </div>
        </div >
    );
};
