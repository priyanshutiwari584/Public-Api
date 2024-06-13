import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react'
import { AppState } from '../Context/Context';
export default function ProductDetails() {
    const { addToCart } = AppState();
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);

    const fetchProductDetails = async () => {
        const productDetails = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts/${id}`);
        const data = await productDetails.json();
        // console.log(data.data);
        setProduct(data.data);
        setImages(data.data.images);
    }
    useEffect(() => {
        fetchProductDetails();
    }, [])


    return (
        <div className='w-full p-4 flex'>

            <div className="flex w-full min-h-[400px] flex-col items-center rounded-md border md:flex-row p-4">
                <div className="h-full w-full md:w-[30%]">
                    <Swiper pagination={true}
                        spaceBetween={5}
                        modules={[Pagination]} className="mySwiper text-red-500 select-none h-full">
                        {
                            images.length > 0 && (
                                images.map((image) => (
                                    <SwiperSlide key={image}>
                                        <img src={image} />
                                    </SwiperSlide>
                                )
                                )
                            )
                        }
                    </Swiper>
                </div>
                <div>
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {product?.title}<ArrowUpRight className="ml-2 h-4 w-4" />
                        </h1>
                        <p className="mt-3 text-md">
                            {product?.description}
                        </p>
                        <div className="mt-4">
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                # {product?.category}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Brand: {product?.brand}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Rating: {product?.rating}/5
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className="mb-2 mr-2 inline-block rounded-full bg-red-200 px-3 py-1 text-[16px] font-semibold text-gray-900">
                                Price: ${product?.price}
                            </span>
                            <br />
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Stock: {product?.stock}
                            </span>
                            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-900">
                                Discount: {product?.discountPercentage}%
                            </span>
                            <br />
                            <button
                                type="button"
                                className=" mt-4 w-fit m-auto rounded-full bg-yellow-400 px-2 py-1.5 z-10 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                onClick={() => addToCart({ id: product.id, type: 'product', count: 1 })}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>





    )
}
