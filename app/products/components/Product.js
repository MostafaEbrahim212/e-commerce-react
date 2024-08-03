import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
function Product({ product }) {
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = existingCart.find(item => item.id === product.id);

        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            existingCart.push({ ...product, quantity });
        }

        setCart(existingCart);
        localStorage.setItem('cart', JSON.stringify(existingCart));
        setQuantity(1);
        toast.success('Product added to cart successfully');
    };

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);

    const updateQuantity = (delta) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + delta;
            return newQuantity < 1 ? 1 : newQuantity; // Ensure quantity doesn't go below 1
        });
    };

    return (
        <div className='bg-white shadow-md p-4 rounded-md'>
            <Image src={product.image} alt={product.title} width={160} height={160} className='w-full h-40 object-contain' />
            <h2 className='text-lg font-bold mt-2'>{product.title}</h2>
            <p className='text-sm text-gray-500'>{product.description}</p>
            <p className='text-lg font-bold mt-2'>${product.price}</p>
            <p className='text-sm text-gray-500'>Category: {product.category}</p>
            <div className='flex flex-col justify-center items-center mt-3 space-y-3'>
                <div className='flex flex-row items-center justify-between w-full space-x-3'>
                    <div className='flex flex-row items-center space-x-2'>
                        <span
                            className='hover:cursor-pointer bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg'
                            onClick={() => updateQuantity(-1)}
                        >-</span>
                        <span className='text-indigo-600 text-lg'>{quantity}</span>
                        <span
                            className='hover:cursor-pointer bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg'
                            onClick={() => updateQuantity(1)}
                        >+</span>
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className='bg-indigo-600 text-white px-4 py-2 rounded-md'>
                            Add to cart
                        </button>
                        <Link className='bg-indigo-600 text-white px-4 py-2 rounded-md' href={`/products/${product.id}`}>
                            View Details
                        </Link>
                    </div>
                </div>
                <div>
                    {cart.find(item => item.id === product.id) ? (
                        <span className='text-green-500'>Added to cart</span>
                    ) : (
                        <span className='text-red-500'>Not added</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;
