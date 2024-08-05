import React, { useEffect } from 'react'
import { AppState } from '../Context/Context'
import Product from '../Components/Product';
import SearchBar from '../Components/Search';
import Category from '../Components/Category';
import useFetch from '../CustomHook/UseFetch';
import Loading from '../Components/Loading';

export default function ProductsPage() {
    const { products, setProducts } = AppState();
    const categories = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ]

    const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100&select=title,price,stock,brand,thumbnail,category");

    useEffect(() => {
        setProducts(data);
    }, [data])

    if (loading) return <Loading />
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4'>
            <div>
                <SearchBar type={"products"} />
            </div>
            <h2 className='my-3'>Categories</h2>
            <div className='w-full h-[10rem] md:h-fit overflow-auto custom-scrollbar'>
                <Category categories={categories} type={"products"} />
            </div>
            <h1 className='text-2xl font-semibold text-center m-4'>Product Page</h1>
            {products && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}