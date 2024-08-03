'use client';

import Spinner from '@/app/components/Spinner';
import { useEffect, useState } from 'react';

const ProductDetails = ({ params }) => {
    const [product, setProduct] = useState(null);
    const { id } = params;

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <section className='py-3 min-h-[calc(100vh-60px)]'>
            <div className="container mx-auto px-4 grid grid-cols-1  md:grid-cols-3 gap-3">

                <div className='md:col-span-2'>
                    {product ? (
                        <div className='bg-white shadow-lg rounded-lg overflow-hidden h-full'>
                            <div className='relative'>
                                <img src={product.image} alt={product.title} className='w-full h-60 object-contain' />
                                <div className='absolute top-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full'>
                                    <div className='flex items-center justify-center h-full'>
                                        <h1 className='text-white text-3xl font-bold bg-black bg-opacity-50 p-4 rounded'>{product.title}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <p className='text-gray-700 mb-4'>{product.description}</p>
                                <p className='text-xl font-semibold mb-2'>${product.price}</p>
                                <p className='text-sm text-gray-500 mb-4'>Category: {product.category}</p>
                            </div>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>

                <div className='md:col-span-1'>
                    <div className='bg-white shadow-lg rounded-lg overflow-hidden h-full'>
                        <div className='p-6'>
                            <h2 className='text-xl font-semibold mb-4'>Additional Details</h2>
                            <p className='text-gray-700 mb-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut metus eget sapien ultrices tincidunt. Donec id nisl in libero ultrices aliquet. Vivamus nec nisl in libero ultrices aliquet.
                            </p>
                        </div>

                        <div className='p-6 border-t border-gray-200'>
                            <h2 className='text-xl font-semibold mb-4'>Product Specifications</h2>
                            <ul>
                                <li className='flex items-center justify-between py-2 border-b border-gray-200'>
                                    <span className='text-gray-700'>Category</span>
                                    <span className='text-gray-700'>{product?.category || 'N/A'}</span>
                                </li>
                                <li className='flex items-center justify-between py-2 border-b border-gray-200'>
                                    <span className='text-gray-700'>Brand</span>
                                    <span className='text-gray-700'>{product?.brand || 'N/A'}</span>
                                </li>
                                <li className='flex items-center justify-between py-2 border-b border-gray-200'>
                                    <span className='text-gray-700'>Color</span>
                                    <span className='text-gray-700'>{product?.color || 'N/A'}</span>
                                </li>
                                <li className='flex items-center justify-between py-2 border-b border-gray-200'>
                                    <span className='text-gray-700'>Size</span>
                                    <span className='text-gray-700'>{product?.size || 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ProductDetails;
