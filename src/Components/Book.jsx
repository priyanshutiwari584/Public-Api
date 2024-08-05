import React from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../Context/Context';

export default function Book({ book }) {
    const { addToCart } = AppState();
    return (
        <div className="relative h-[400px] rounded-md m-2">
            <Link to={`/Public-APi/book/${book.id}`}>
                <div className="relative h-full w-full">
                    <img
                        src={book?.volumeInfo?.imageLinks?.thumbnail}
                        alt="Thumbnail image"
                        className="z-0 h-full w-full rounded-md object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-left">
                        <h1 className="text-lg font-semibold text-white">{book?.volumeInfo?.title}</h1>
                        <h3 className="text-lg font-semibold text-white">{book?.volumeInfo?.authors}</h3>
                        <p className="mt-2 text-sm text-white">
                            {book?.saleInfo?.retailPrice?.amount}
                        </p>
                        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                            Read &rarr;
                        </button>
                    </div>
                </div>
            </Link>
            <button
                type="button"
                className="absolute bottom-4 right-4 w-fit rounded-full bg-yellow-400 px-4 py-1.5 z-10 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => addToCart({ id: book.id, type: 'book', count: 1 })}
            >
                Add to cart
            </button>
        </div>

    )
}
