import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppState } from '../Context/Context';
import Loading from '../Components/Loading'

export default function BookDetails() {
    const { addToCart } = AppState();
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`https://api.freeapi.app/api/v1/public/books/${id}`);
            const data = await response.json();
            setBook(data.data);
            setLoading(false);
        } catch (error) {
            setError(error)
            console.log("Error Fetching Book Details:", error);
        }
    }

    useEffect(() => {
        fetchBookDetails();
    }, [])

    if (loading) return <Loading />
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4 flex'>
            <div className="flex w-full min-h-[400px] flex-col items-center rounded-md border md:flex-row p-4">
                <div className="h-full w-full md:w-[30%] md:h-[450px]">
                    <img
                        src={book?.volumeInfo?.imageLinks?.thumbnail}
                        alt="Laptop"
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className='md:w-[70%]'>
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {book?.volumeInfo?.title}
                        </h1>
                        <p className="mt-3 text-md">
                            {book?.volumeInfo?.authors}
                        </p>
                        <div className="mt-4">
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                # {book?.volumeInfo?.categories}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Rating: {book?.volumeInfo?.averageRating}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Page: {book?.volumeInfo?.pageCount}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="mb-2 mr-2 inline-block rounded-full bg-red-200 px-3 py-1 text-[16px] font-semibold text-gray-900">
                                Price: {book?.saleInfo?.retailPrice?.amount}
                            </span>
                            <br />
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Publisher: {book?.volumeInfo?.publisher}
                            </span>
                            <br />
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Published Date: {book?.volumeInfo?.publishedDate}
                            </span>
                        </div>
                        <div className='mt-2'>
                            <h3 className='text-red-300 mb-2'>Description : </h3>
                            <p>{book?.volumeInfo?.description}</p>
                        </div>
                        <button
                            type="button"
                            className=" mt-4 w-fit m-auto rounded-full bg-yellow-400 px-2 py-1.5 z-10 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => addToCart({ id: book.id, type: 'book', count: 1 })}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
