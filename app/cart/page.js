'use client'
import React, { useEffect, useState } from 'react';

function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }, [cart]);

    const decreaseQuantity = (product) => {
        const newCart = cart.map(item => {
            if (item.id === product.id && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const increaseQuantity = (product) => {
        const newCart = cart.map(item => {
            if (item.id === product.id) {
                item.quantity += 1;
            }
            return item;
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeFromCart = (product) => {
        const newCart = cart.filter(item => item.id !== product.id);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Format total to two decimal places
    const formattedTotal = total.toFixed(2);

    return (
        <section className='py-3'>
            <div className="container mx-auto px-4">
                <h1 className='text-3xl font-bold text-center text-indigo-600 mb-4'>Cart</h1>
                <table className='w-full bg-white shadow-md rounded-md overflow-hidden'>
                    <thead className='bg-indigo-600 text-white'>
                        <tr>
                            <th className='py-2 px-4'>Image</th>
                            <th className='py-2 px-4'>Title</th>
                            <th className='py-2 px-4'>Price</th>
                            <th className='py-2 px-4'>Quantity</th>
                            <th className='py-2 px-4'>Total</th>
                            <th className='py-2 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length ? cart.map(product => (
                            product.quantity > 0 && (
                                <tr key={product.id}>
                                    <td className='py-2 px-4'>
                                        <img src={product.image} alt={product.title} className='w-16 h-16 object-cover' />
                                    </td>
                                    <td className='py-2 px-4'>{product.title}</td>
                                    <td className='py-2 px-4'>${product.price.toFixed(2)}</td>
                                    <td className='py-2 px-4'>
                                        <button
                                            onClick={() => decreaseQuantity(product)}
                                            className='px-2 py-1 bg-indigo-600 text-white rounded-md'>
                                            -
                                        </button>
                                        <span className='px-2 py-1'>{product.quantity}</span>
                                        <button onClick={() => increaseQuantity(product)}
                                            className='px-2 py-1 bg-indigo-600 text-white rounded-md'>
                                            +
                                        </button>
                                    </td>
                                    <td className='py-2 px-4'>${(product.price * product.quantity).toFixed(2)}</td>
                                    <td className='py-2 px-4'>
                                        <button
                                            onClick={() => removeFromCart(product)}
                                            className='px-2 py-1 bg-red-600 text-white rounded-md'>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        )) : (
                            <tr>
                                <td colSpan='6' className='text-center py-4'>No items in the cart</td>
                            </tr>
                        )}
                        {cart.length > 0 && (
                            <tr className=''>
                                <td colSpan={4}></td>
                                <td className='py-2 px-4 font-bold'>${formattedTotal}</td>
                                <td className='py-2 px-4'>
                                    <div className='flex space-x-3'>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('cart');
                                                setCart([]);
                                            }}
                                            className='bg-red-600 text-white px-4 py-2 rounded-md'>
                                            Clear Cart
                                        </button>
                                        <button className='bg-indigo-600 text-white px-4 py-2 rounded-md'>
                                            Checkout
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Cart;
