import React from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../Context/Context'


export default function Product({ product }) {
    const { addToCart } = AppState();
    return (
        <div className="rounded-md border bg-gray-100 text-black m-2 p-2">
            <Link to={`/Public-Api/product/${product.id}`}>
                <img
                    src={product?.thumbnail}
                    alt="Laptop"
                    className="h-[200px] w-full rounded-md object-cover"
                />
                <div className="p-4">
                    <h1 className="inline-flex items-center text-lg font-semibold ">
                        {product?.title}
                    </h1>
                    <div className="mt-4">
                        <span className="mb-2 mr-2  inline-block rounded-full bg-gray-300 px-3 py-1 text-[12px] font-semibold text-gray-900">
                            # {product?.category}
                        </span>
                        <span className="mb-2 mr-2  inline-block rounded-full bg-gray-300 px-3 py-1 text-[12px] font-semibold text-gray-900">
                            $ {product?.price}
                        </span>
                    </div>
                </div>
            </Link >
            <button
                type="button"
                className=" w-fit m-auto rounded-full bg-yellow-400 px-4 py-1.5 z-10 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => addToCart({ id: product.id, type: 'product', count: 1 })}
            >
                Add to cart
            </button>
        </div >

    )
}
