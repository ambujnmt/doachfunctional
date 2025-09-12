import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from '../../HomePage/HamburgerMenu';
import HomeFooter from '../../HomePage/HomeFooter';
import Container from "@mui/material/Container";
import { getProductsList, getCategoriesList } from '../../../utils/fetchApi';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const prodData = await getProductsList();
                const catData = await getCategoriesList();

                if(prodData?.status) {
                    const availableProducts = prodData.data.filter(p => p.stock > 0);
                    setProducts(availableProducts);
                    setFilteredProducts(availableProducts);
                }

                if(catData?.status) setCategories(catData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Stop loader
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let temp = [...products];
        if (selectedCategory) temp = temp.filter(p => p.category_id === Number(selectedCategory));
        temp = temp.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        setFilteredProducts(temp);
    }, [selectedCategory, priceRange, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
            <section className="py-24">
                <Container maxWidth="lg">
                    <h3 className="text-4xl text-center font-extrabold text-yellow-400 mb-10">Our Products</h3>

                    {/* Hamburger Menu */}
                    <HamburgerMenu />

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filter */}
                        <aside className="w-full lg:w-1/4">
                            <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400 shadow-lg sticky top-28">
                                <h4 className="text-yellow-400 font-bold text-xl mb-6">Filters</h4>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h5 className="text-white font-semibold mb-2">Category</h5>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory === '' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-yellow-500'}`}
                                            onClick={() => setSelectedCategory('')}
                                        >
                                            All
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory == cat.id ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-yellow-500'}`}
                                                onClick={() => setSelectedCategory(cat.id)}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="mb-6">
                                    <h5 className="text-white font-semibold mb-2">Price Range</h5>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            className="w-1/2 p-2 rounded bg-gray-700 text-white border border-yellow-400"
                                            placeholder="Min"
                                        />
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-1/2 p-2 rounded bg-gray-700 text-white border border-yellow-400"
                                            placeholder="Max"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setSelectedCategory(''); setPriceRange([0, 10000]); }}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition-all"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="w-full lg:w-3/4 grid grid-cols-12 gap-6">
                            {filteredProducts.length > 0 ? filteredProducts.map(product => (
                                <div key={product.id} className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <Link href={`/product/${product.slug}`}>
                                        <div className="bg-yellow-400 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                                            <img
                                                src={product.images?.find(img => img.type === "thumbnail")?.image_url || 'https://via.placeholder.com/400x250'}
                                                alt={product.product_name}
                                                className="w-full h-64 object-cover"
                                            />
                                            <div className="p-4">
                                                <h5 className="text-gray-900 text-lg font-bold mb-2">{product.product_name}</h5>
                                                <p className="text-gray-800 mb-2 font-semibold">Price: ${product.price}</p>
                                                <p className="text-gray-700 text-sm line-clamp-2">
                                                    {product.short_description ? product.short_description.replace(/<[^>]+>/g, "").substring(0, 60) + "..." : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) : (
                                <p className="col-span-12 text-center text-yellow-400 text-xl">No products found 😢</p>
                            )}
                        </div>
                    </div>

                    <HomeFooter />
                </Container>
            </section>
        </div>
    )
}
