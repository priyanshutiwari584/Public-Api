import React, { useEffect, } from 'react'
import { AppState } from '../Context/Context'
import Product from '../Components/Product';
import SearchBar from '../Components/Search';
import Category from '../Components/Category';
import useFetch from '../CustomHook/UseFetch';

export default function ProductsPage() {
    const { products, setProducts } = AppState();
    const categories = ["Laptops", "Smartphone", "Watch", "Fragrances", "Shoes", "Motorcycle", "SkinCare", "Groceries"]

    const { data, loading, error } = useFetch("https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=100");


    useEffect(() => {
        setProducts(data)
    }, [data]);

    if (loading) return <p className='text-2xl text-center'>Loading...</p>
    if (error) return <p className='text-2xl text-center'>Error: {error.message}</p>

    return (
        <div className='w-full p-4'>
            <div>
                <SearchBar type={"products"} />
            </div>
            <div>
                <Category categories={categories} type={"products"} />
            </div>
            <h1 className='text-2xl font-semibold text-center m-4'>Product Page</h1>
            {products && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {products.map((product) => (
                        <Product product={product} key={product.id} />
                    ))}
                </div>
            )}
        </div>
    )
}
