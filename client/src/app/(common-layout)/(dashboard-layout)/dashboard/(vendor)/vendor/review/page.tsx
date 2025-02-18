"use client"
import React, { useState } from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, Trash2, Copy, Edit, Plus } from 'lucide-react';

const ProductManagementTable = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: '🎧' },
        { id: 2, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '💻' },
        { id: 3, name: 'Ergonomic Office Chair', category: 'Chair', price: 323, shop: 'Moinul\'s Tech', discount: 23, image: '🪑' },
        { id: 4, name: 'Mesh Office Chair', category: 'Chair', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🪑' },
        { id: 5, name: 'Professional Studio Microphone', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎙️' },
        { id: 6, name: 'Wireless Lavalier Microphone for Smartphones', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎤' },
        { id: 1, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: '🎧' },
        { id: 2, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '💻' },
        { id: 3, name: 'Ergonomic Office Chair', category: 'Chair', price: 323, shop: 'Moinul\'s Tech', discount: 23, image: '🪑' },
        { id: 4, name: 'Mesh Office Chair', category: 'Chair', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🪑' },
        { id: 5, name: 'Professional Studio Microphone', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎙️' },
        { id: 6, name: 'Wireless Lavalier Microphone for Smartphones', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎤' },
        { id: 1, name: 'Wireless Bluetooth', category: 'Table', price: 122, shop: 'Moinul\'s Tech', discount: 10, image: '🎧' },
        { id: 2, name: 'Gaming Laptop', category: 'Cabinet', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '💻' },
        { id: 3, name: 'Ergonomic Office Chair', category: 'Chair', price: 323, shop: 'Moinul\'s Tech', discount: 23, image: '🪑' },
        { id: 4, name: 'Mesh Office Chair', category: 'Chair', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🪑' },
        { id: 5, name: 'Professional Studio Microphone', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎙️' },
        { id: 6, name: 'Wireless Lavalier Microphone for Smartphones', category: 'Microphone', price: 123, shop: 'Moinul\'s Tech', discount: 10, image: '🎤' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const productsPerPage = 6;

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const toggleMenu = (id) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setActiveMenuId(null);
    };

    const handleDuplicate = (id) => {
        const productToDuplicate = products.find(product => product.id === id);
        const newProduct = {
            ...productToDuplicate,
            id: Math.max(...products.map(p => p.id)) + 1
        };
        setProducts([...products, newProduct]);
        setActiveMenuId(null);
    };

    const handleEdit = (id) => {
        // In a real app, this would open an edit form or modal
        console.log(`Editing product with id ${id}`);
        setActiveMenuId(null);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium text-gray-800">Products</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded flex items-center">
                    Create new
                    <Plus className="mr-2" size={16} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white ">
                    <thead>
                        <tr className="bg-[#EAEBED] hover:bg-[#F0F0F1] transition duration-150 border-b text-sm">
                            <th className="py-3 px-2 text-left font-medium text-gray-700">Product</th>
                            <th className="py-3 px-2 text-left font-medium text-gray-700">Price</th>
                            <th className="py-3 px-2 text-left font-medium text-gray-700">Shop Name</th>
                            <th className="py-3 px-2 text-left font-medium text-gray-700">Discount</th>
                            <th className="py-3 px-2 text-left font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50 text-sm">
                                <td className="py-3 px-2">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{product.image}</span>
                                        <div>
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-2">{product.price}</td>
                                <td className="py-3 px-2">{product.shop}</td>
                                <td className="py-3 px-2">{product.discount}</td>
                                <td className="py-3 px-2 relative">
                                    <button
                                        onClick={() => toggleMenu(product.id)}
                                        className={`text-gray-500 hover:text-gray-700 focus:outline-none border p-2 rounded ${activeMenuId === product.id ? "bg-[#F0F0F1]" : ""}`}
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeMenuId === product.id && (
                                        <div className="absolute right-[52px] mt-1 w-fit bg-white rounded shadow-lg z-10 border">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <Trash2 size={16} className="mr-2" />
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleDuplicate(product.id)}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <Copy size={16} className="mr-2" />
                                                Duplicate
                                            </button>
                                            <button
                                                onClick={() => handleEdit(product.id)}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <Edit size={16} className="mr-2" />
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center font-medium '>
                <div className="flex items-center justify-between w-fit gap-1 mt-6 text-sm">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center px-4 py-[6px] border rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-[6px] rounded ${currentPage === i + 1
                                    ? 'bg-[#F6F7F8] text-gray-700 border '
                                    : 'text-gray-700 hover:bg-gray-50 border'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-4 py-[6px] border rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductManagementTable;