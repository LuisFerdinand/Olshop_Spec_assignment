import PropTypes from "prop-types";

const ProductCard = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer border border-gray-200 bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        >
            {/* Image */}
            <div className="relative">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                    New
                </span>
            </div>

            {/* Details */}
            <div className="p-4 space-y-2">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 truncate">
                    {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm truncate">
                    {product.description}
                </p>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-amber-600 font-semibold text-lg">
                        ${product.price}
                    </span>
                    <span className="flex items-center text-yellow-500 text-sm">
                        ⭐ {product.rating}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Define prop types for ProductCard
ProductCard.propTypes = {
    product: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired, // onClick should be a function
};

export default ProductCard;
