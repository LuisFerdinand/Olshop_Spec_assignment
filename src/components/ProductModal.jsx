import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const ProductModal = ({ product, onClose, onSave }) => {
    const [isEditMode, setIsEditMode] = useState(false); // Toggle Edit Mode
    const [editedProduct, setEditedProduct] = useState({ ...product }); // Local state for edits

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save changes and exit edit mode
    const handleSave = () => {
        onSave(editedProduct);
        setIsEditMode(false);
    };

    // Discard changes and exit edit mode
    const handleCancel = () => {
        setEditedProduct({ ...product });
        setIsEditMode(false);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-4 flex"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="w-1/2 p-4">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Details Section */}
                <div className="w-1/2 p-6 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {isEditMode ? "Edit Product" : product.title}
                    </h2>

                    {/* Read-Only Mode */}
                    {!isEditMode && (
                        <div className="space-y-3 text-gray-700 flex-grow">
                            <p>
                                <strong>Description:</strong> {product.description}
                            </p>
                            <p>
                                <strong>Price:</strong> ${product.price}
                            </p>
                            <p>
                                <strong>Rating:</strong> ⭐ {product.rating}
                            </p>
                            <button
                                onClick={() => setIsEditMode(true)} // Switch to Edit Mode
                                className="mt-4 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition"
                            >
                                Edit
                            </button>
                        </div>
                    )}

                    {/* Editable Mode */}
                    {isEditMode && (
                        <div className="space-y-4 flex-grow">
                            <label className="block">
                                <span className="text-gray-700">Title:</span>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedProduct.title}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Description:</span>
                                <textarea
                                    name="description"
                                    value={editedProduct.description}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                ></textarea>
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Price ($):</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Rating:</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    max="5"
                                    min="0"
                                    name="rating"
                                    value={editedProduct.rating}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                                />
                            </label>

                            {/* Save and Cancel Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={handleCancel}
                                    className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Define PropTypes for ProductModal
ProductModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired, // Function to handle modal close
    onSave: PropTypes.func.isRequired, // Function to handle save
};

export default ProductModal;
