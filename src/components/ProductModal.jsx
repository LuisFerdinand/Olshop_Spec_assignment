/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import AddReviewModal from "./AddReviewModal"; // Ensure AddReviewModal is correctly imported

const ProductModal = ({ product, onClose, onSave }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

    // Handle changes in edit mode
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save product updates
    const handleSave = () => {
        onSave(editedProduct);
        setIsEditMode(false);
    };

    // Cancel edit mode and reset changes
    const handleCancel = () => {
        setEditedProduct({ ...product });
        setIsEditMode(false);
    };

    // Add a new review
    const handleAddReview = (newReview) => {
        setEditedProduct((prev) => ({
            ...prev,
            reviews: [...prev.reviews, newReview],
        }));
    };

    return (
        <>
            <div
                className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
                onClick={onClose}
            >
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-4 flex flex-col lg:flex-row animate-in fade-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Section */}
                    <div className="lg:w-1/2 p-6">
                        <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/2 p-6 flex flex-col max-h-[80vh] overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                            {isEditMode ? "Edit Product" : product.title}
                        </h2>

                        {/* Read-Only Mode */}
                        {!isEditMode && (
                            <div className="space-y-4 text-gray-700 flex-grow">
                                {/* Product Description */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-lg font-semibold mb-2">Description</p>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>

                                {/* Price and Rating */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-amber-50 p-4 rounded-lg">
                                        <p className="font-semibold text-amber-900">Price</p>
                                        <p className="text-2xl font-bold text-amber-600">${product.price}</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="font-semibold text-blue-900">Rating</p>
                                        <p className="text-2xl font-bold text-blue-600">⭐ {product.rating}</p>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoCard title="Category" value={product.category} />
                                    <InfoCard title="Brand" value={product.brand} />
                                </div>

                                {/* Tags */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-semibold mb-2">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Reviews */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-semibold mb-2">Reviews</p>
                                    <div className="space-y-3">
                                        {product.reviews.map((review, index) => (
                                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-gray-800">{review.reviewerName}</p>
                                                    <p className="text-amber-500">{"⭐".repeat(review.rating)}</p>
                                                </div>
                                                <p className="text-gray-600 mt-1">{review.comment}</p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setIsAddReviewModalOpen(true)}
                                        className="w-full mt-4 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Add Review
                                    </button>
                                </div>

                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="w-full mt-4 bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
                                >
                                    Edit Product
                                </button>
                            </div>
                        )}

                        {/* Edit Mode */}
                        {isEditMode && (
                            <div className="space-y-4 flex-grow">
                                <InputField label="Title" name="title" value={editedProduct.title} onChange={handleChange} />
                                <TextArea label="Description" name="description" value={editedProduct.description} onChange={handleChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label="Price ($)"
                                        name="price"
                                        type="number"
                                        value={editedProduct.price}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                    <InputField
                                        label="Rating"
                                        name="rating"
                                        type="number"
                                        value={editedProduct.rating}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Category" name="category" value={editedProduct.category} onChange={handleChange} />
                                    <InputField label="Brand" name="brand" value={editedProduct.brand} onChange={handleChange} />
                                </div>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={handleCancel}
                                        className="py-2 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="py-2 px-6 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Review Modal */}
            {isAddReviewModalOpen && (
                <AddReviewModal
                    onClose={() => setIsAddReviewModalOpen(false)}
                    onSave={(newReview) => {
                        handleAddReview(newReview);
                        setIsAddReviewModalOpen(false);
                    }}
                />
            )}
        </>
    );
};

// Reusable components
const InfoCard = ({ title, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold text-gray-700">{title}</p>
        <p className="text-gray-600 mt-1">{value}</p>
    </div>
);

const InputField = ({ label, name, type = "text", value, onChange, ...props }) => (
    <label className="block">
        <span className="text-gray-700 font-medium">{label}</span>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200"
            {...props}
        />
    </label>
);

const TextArea = ({ label, name, value, onChange }) => (
    <label className="block">
        <span className="text-gray-700 font-medium">{label}</span>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-200 min-h-[100px]"
        ></textarea>
    </label>
);

ProductModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                rating: PropTypes.number.isRequired,
                comment: PropTypes.string.isRequired,
                reviewerName: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ProductModal;
