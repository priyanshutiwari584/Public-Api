import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/Search'
import useFetch from '../CustomHook/UseFetch'
import { AppState } from '../Context/Context'
import Book from '../Components/Book';
import Category from '../Components/Category';
import Loading from '../Components/Loading';

export default function BooksPage() {
    const { books, setBooks } = AppState();
    const categories = ["Science", "Mathematics", "Sport", "Game", "Java", "Python", "Life", "History"]

    const { data, loading, error } = useFetch("https://api.freeapi.app/api/v1/public/books?page=1&limit=100")

    useEffect(() => {
        setBooks(data);
    }, [data])

    if (loading) return <Loading />
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4'>
            <SearchBar type={"books"} />
            <h2 className='my-3'>Categories</h2>
            <div>
                <Category categories={categories} type={"books"} />
            </div>
            <h1 className='text-2xl font-semibold text-center m-2'>Books Page</h1>
            <div className='mt-4'>
                {books && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {books.map((book) => (
                            <Book key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
