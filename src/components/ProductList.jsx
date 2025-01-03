import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onProductClick, categories }) => {
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [sortOption, setSortOption] = useState("default"); // Sorting option state
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
    const [sliderIndex, setSliderIndex] = useState(0); // Image slider state

    const itemsPerPage = 8; // Number of items per page

    const images = [
        "/images/slider1.jpg", // Add your images here
        "/images/slider2.jpg",
        "/images/slider3.jpg",
    ];

    const headerText = {
        title: "Welcome to Our Online Shop",
        description: "Find amazing deals and top-quality products across various categories.",
    };

    // Change the slider index every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5 seconds interval for image change
        return () => clearInterval(interval); // Clean up on component unmount
    }, [images.length]);

    // Filter products based on the search query and selected category
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    // Sort products based on the selected option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "rating-desc":
                return b.rating - a.rating;
            case "name-asc":
                return a.title.localeCompare(b.title);
            default:
                return 0; // Default: no sorting
        }
    });

    // Calculate products to show for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <div className="bg-gray-100 min-h-screen pb-10">
            {/* Image Slider Header */}
            <div className="relative w-full h-96 overflow-hidden mb-10">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{ backgroundImage: `url(${images[sliderIndex]})` }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-4xl font-bold">{headerText.title}</h1>
                    <p className="mt-4 text-lg">{headerText.description}</p>
                </div>
            </div>

            {/* Search, Sorting, and Category Buttons */}
            <div className="container mx-auto px-4 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Bar */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full md:w-1/3 p-2 border rounded-lg shadow-sm focus:ring focus:ring-amber-300"
                    />

                    {/* Sorting */}
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full md:w-1/4 p-2 border rounded-lg shadow-sm focus:ring focus:ring-amber-300"
                    >
                        <option value="default">Sort by...</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Rating: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                    </select>
                </div>

                {/* Category Buttons */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`px-4 py-2 rounded-lg ${selectedCategory === "" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-amber-300"}`}
                    >
                        All Categories
                    </button>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg ${selectedCategory === category ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-amber-300"}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => onProductClick(product)}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg font-semibold text-gray-800">No products found.</p>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-amber-500 text-white hover:bg-amber-600"}`}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-amber-500 text-white hover:bg-amber-600"}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// Define prop types for ProductList
ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired, // Category field added
        })
    ).isRequired,
    onProductClick: PropTypes.func.isRequired, // onProductClick should be a function
    categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Categories should be an array of strings
};

export default ProductList;
