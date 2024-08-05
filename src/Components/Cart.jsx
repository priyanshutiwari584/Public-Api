import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { AppState } from '../Context/Context';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItem } = AppState();
    return (
        <Link to={"/Public-Api/cart-view"}>
            <span className="inline-flex relative">
                <button
                    type="button"
                    className="text-white hover:bg-gray-700 rounded-full p-2"
                >
                    <ShoppingCart />
                </button>
                {cartItem.length > 0 && (
                    <span className="absolute top-0 right-0 flex items-center px-[.3rem] rounded-full bg-red-500 text-xs font-bold text-white">
                        {cartItem.length}
                    </span>
                )}
            </span>

        </Link>
    );
}

export default Cart;
