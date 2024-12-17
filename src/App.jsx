import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]); // State to store categories

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="p-6">
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
          onClose={() => setSelectedProduct(null)}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default App;
