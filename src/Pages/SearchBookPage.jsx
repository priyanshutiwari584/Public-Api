import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useFetch from '../CustomHook/UseFetch';
import SearchBar from '../Components/Search';
import Book from '../Components/Book';

export default function SearchBookPage() {
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    const { data, loading, error } = useFetch(`https://api.freeapi.app/api/v1/public/books?query=${query}`);

    useEffect(() => {
        setBooks(data);
    }, [data])

    if (loading) return <p className='text-2xl text-center'>Loading...</p>
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4'>
            <SearchBar type={"books"} />
            <h1 className='text-2xl font-semibold text-center m-2'>Books Page</h1>
            <div className='mt-4'>
                {books.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {books.map((book) => (
                            <Book key={book.id} book={book} />
                        ))}
                    </div>
                )
                    : <div>
                        <h1 className='text-3xl font-normal text-center m-8'>No Resuls found!</h1>
                        <h2 className='text-2x font-normal text-center'>Please try to find another product</h2>
                    </div>
                }
            </div>
        </div>
    )
}
