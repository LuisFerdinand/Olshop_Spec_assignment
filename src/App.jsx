import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]); // State to store categories
  const [reviews, setReviews] = useState({}); // State to store reviews for each product

  useEffect(() => {
    // Fetch products from API
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Function to handle editing and updating a product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(null); // Close modal after saving changes
  };

  // Function to handle adding a review
  const handleAddReview = (productId, review) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), review],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main>
        <ProductList
          products={products}
          categories={categories} // Pass categories here
          onProductClick={setSelectedProduct}
        />
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Show modal if a product is selected */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          reviews={reviews[selectedProduct.id] || []} // Pass reviews for the selected product
          onClose={() => setSelectedProduct(null)}
          onSave={handleUpdateProduct}
          onAddReview={(review) => handleAddReview(selectedProduct.id, review)} // Pass onAddReview callback
        />
      )}
    </div>
  );
};

export default App;
