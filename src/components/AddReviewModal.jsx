/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";

const AddReviewModal = ({ onClose, onSave }) => {
    const [newReview, setNewReview] = useState({
        reviewerName: "",
        comment: "",
        rating: 0,
        date: new Date().toISOString(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(newReview);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Add Review</h2>
                <InputField
                    label="Reviewer Name"
                    name="reviewerName"
                    value={newReview.reviewerName}
                    onChange={handleChange}
                />
                <TextArea
                    label="Comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleChange}
                />
                <InputField
                    label="Rating"
                    name="rating"
                    type="number"
                    value={newReview.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                />
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                        transition-colors duration-300 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                        transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
                    >
                        Add Review
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", value, onChange, ...props }) => (
    <label className="block">
        <span className="text-gray-700 font-medium">{label}</span>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 transition-shadow duration-200"
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
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 transition-shadow duration-200 min-h-[100px]"
        ></textarea>
    </label>
);

AddReviewModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default AddReviewModal;
