import React, { useEffect, useState } from 'react'
import Product from '../Components/Product';
import { useLocation } from 'react-router-dom';
import Book from '../Components/Book';
import Loading from '../Components/Loading';

export default function CategoryPage() {
    const location = useLocation();
    const type = new URLSearchParams(location.search).get('type');
    const category = new URLSearchParams(location.search).get('category');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryRes, setCategoryRes] = useState([])

    const fetchCategoryResults = async () => {
        let url;
        if (type === 'products') {
            url = `https://dummyjson.com/products/category/${category}`;
        } else if (type === 'books') {
            url = `https://api.freeapi.app/api/v1/public/books?query=${category}`;
        }
        try {
            const results = await fetch(url);
            const data = await results.json();
            setCategoryRes(data.products || data.data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategoryResults();
    }, [type, category])

    if (loading) return <Loading />
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4'>
            <h1 className='text-3xl font-semibold text-center mb-4'>{category}</h1>
            {categoryRes.length > 0 ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {type === 'products' ? (
                        categoryRes.map((product) => (
                            <Product product={product} key={product.id} />
                        ))
                    ) : (
                        categoryRes.map((book) => (
                            <Book book={book} key={book.id} />
                        ))
                    )
                    }
                </div>
                : (<div>
                    <h1 className='text-3xl font-normal text-center m-8'>No Resuls found!</h1>
                    <h2 className='text-2x font-normal text-center'>Please try to Search another category</h2>
                </div>

                )
            }
        </div>

    )
}
