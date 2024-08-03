'use client'
import React, { useEffect, useState } from 'react';
import Product from './components/Product';
import Spinner from '../components/Spinner';

function Index() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minNumber, setMinNumber] = useState(0);
    const [maxNumber, setMaxNumber] = useState(10000);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err));
    }, []);

    const handleMinNumberChange = (e) => {
        const value = Math.min(Number(e.target.value), maxNumber);
        setMinNumber(value);
    };

    const handleMaxNumberChange = (e) => {
        const value = Math.max(Number(e.target.value), minNumber);
        setMaxNumber(value);
    };

    useEffect(() => {
        setFilteredProducts(products.filter(product => {
            if (selectedCategory === '') {
                return product.price >= minNumber && product.price <= maxNumber;
            }
            return product.price >= minNumber && product.price <= maxNumber && product.category === selectedCategory;
        }));
    }, [minNumber, maxNumber, selectedCategory, products]);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setMinNumber(0);
            setMaxNumber(10000);
            setSelectedCategory('');
        }
    }, [selectedCategory]);

    return (
        <section className='py-3'>
            <div className="container">
                <h1 className='text-3xl font-bold text-center text-indigo-600'>Products</h1>
                <div className='categories mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-5'>
                    {categories.map(category => (
                        <button onClick={() => setSelectedCategory(category)} key={category} className='bg-indigo-600 text-white px-4 py-2 block mt-auto rounded-md'>
                            {category}
                        </button>
                    ))}
                    <button onClick={() => setSelectedCategory('all')} key={'all'} className='bg-indigo-600 text-white px-4 py-2 block mt-auto rounded-md'>
                        All
                    </button>
                </div>

                <div className='py-3 space-y-3'>
                    <h5 className='text-xl font-semibold text-center'>Price Between</h5>
                    <div className='flex justify-center space-x-5'>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="min-number">min number: {minNumber}</label>
                            <input
                                onChange={handleMinNumberChange}
                                min={0}
                                max={10000}
                                id='min-number'
                                type='range'
                                value={minNumber}
                                className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-indigo-600'
                            />
                            <input
                                onChange={(e) => {
                                    const value = Math.min(Number(e.target.value), maxNumber);
                                    setMinNumber(value);
                                }}
                                type='number'
                                min={0}
                                max={10000}
                                value={minNumber}
                                className='border-2 border-indigo-600 p-1 rounded-lg'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="max-number">max number: {maxNumber}</label>
                            <input
                                onChange={handleMaxNumberChange}
                                min={0}
                                max={10000}
                                id='max-number'
                                type='range'
                                value={maxNumber}
                                className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-indigo-600'
                            />
                            <input
                                onChange={(e) => {
                                    const value = Math.max(Number(e.target.value), minNumber);
                                    setMaxNumber(value);
                                }}
                                type='number'
                                min={0}
                                max={10000}
                                value={maxNumber}
                                className='border-2 border-indigo-600 p-1 rounded-lg'
                            />
                        </div>
                    </div>
                </div>
                {
                    filteredProducts.length === 0 ? <Spinner /> : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {filteredProducts.map(product => (
                                <Product key={product.id} product={product} />
                            ))}
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default Index;
