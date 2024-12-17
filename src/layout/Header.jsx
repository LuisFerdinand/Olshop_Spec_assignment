// src/layout/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../components/Logo"; // Import Logo component

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        {/* Logo component with dynamic className and hover transition */}
                        <Logo className="w-8 h-8 text-white hover:text-amber-500 transition-all duration-300 ease-in-out" />
                        <span className="text-2xl font-bold text-white ml-2 hover:text-amber-500 transition-all duration-300 ease-in-out">
                            Olshop
                        </span>
                    </Link>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/shop" className="hover:text-gray-300">
                        Shop
                    </Link>
                    <Link to="/about" className="hover:text-gray-300">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-gray-300">
                        Contact
                    </Link>
                </nav>

                {/* Hamburger Menu (Mobile) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-2xl"
                >
                    <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-blue-600 text-white md:hidden">
                        <nav className="flex flex-col items-center py-4">
                            <Link to="/" className="py-2">
                                Home
                            </Link>
                            <Link to="/shop" className="py-2">
                                Shop
                            </Link>
                            <Link to="/about" className="py-2">
                                About
                            </Link>
                            <Link to="/contact" className="py-2">
                                Contact
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
