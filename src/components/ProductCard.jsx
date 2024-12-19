import PropTypes from "prop-types";

const ProductCard = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 px-2 border border-gray-100"
        >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg"
                />
                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-300 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                    ${product.price}
                </div>
            </div>

            {/* Product Details */}
            <div className="px-1">
                <h3 className="font-semibold text-2xl text-gray-900 mb-2 truncate">{product.title}</h3>

                <div className="flex items-center justify-between text-gray-600 mb-4">
                    <div className="text-lg font-medium text-yellow-500 flex items-center">
                        <span className="mr-2">⭐</span>
                        <span>{product.rating}</span>
                    </div>

                    <div className="text-md font-medium text-gray-500">
                        {product.brand ? product.brand : "Not Available"}
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        brand: PropTypes.string, // Brand is optional
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ProductCard;
