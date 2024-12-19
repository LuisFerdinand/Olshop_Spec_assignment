import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../components/Logo"; // Import Logo component

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-amber-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        {/* Logo component with dynamic className and hover transition */}
                        <Logo className="w-8 h-8 text-white hover:text-amber-300 transition-all duration-300 ease-in-out" />
                        <span className="text-2xl font-bold text-white ml-2 hover:text-amber-300 transition-all duration-300 ease-in-out">
                            Olshop
                        </span>
                    </Link>
                </div>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex space-x-8">
                    <Link
                        to="/"
                        className="relative group hover:text-amber-100 transition-all duration-300 ease-in-out"
                    >
                        Home
                        {/* Underline on hover */}
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-100 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        to="/shop"
                        className="relative group hover:text-amber-100 transition-all duration-300 ease-in-out"
                    >
                        Shop
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-100 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        to="/about"
                        className="relative group hover:text-amber-100 transition-all duration-300 ease-in-out"
                    >
                        About
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-100 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        to="/contact"
                        className="relative group hover:text-amber-100 transition-all duration-300 ease-in-out"
                    >
                        Contact
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-100 transition-all duration-300 group-hover:w-full"></span>
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
                            <Link
                                to="/"
                                className="py-2 group hover:text-amber-100 transition-all duration-300 ease-in-out"
                            >
                                Home
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                to="/shop"
                                className="py-2 group hover:text-amber-100 transition-all duration-300 ease-in-out"
                            >
                                Shop
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                to="/about"
                                className="py-2 group hover:text-amber-100 transition-all duration-300 ease-in-out"
                            >
                                About
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                to="/contact"
                                className="py-2 group hover:text-amber-100 transition-all duration-300 ease-in-out"
                            >
                                Contact
                                <span className="absolute left-0 bottom-0 w-0 h-1 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
