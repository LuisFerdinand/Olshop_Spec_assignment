import Logo from "../components/Logo"; // Assuming you already have a Logo component

const Footer = () => {
    return (
        <footer className="bg-amber-800 text-white py-12">
            <div className="container mx-auto px-6">
                {/* Footer Top Section - Logo and Links */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    {/* Logo and Shop Info */}
                    <div className="flex items-center mb-6 md:mb-0">
                        <Logo className="w-12 h-12 text-white" />
                        <p className="ml-3 text-2xl font-semibold text-white">Online Shop</p>
                    </div>
                    {/* Links */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-6">
                        <a href="/about" className="text-gray-100 hover:text-amber-200 transition duration-300">
                            About
                        </a>
                        <a href="/contact" className="text-gray-100 hover:text-amber-200 transition duration-300">
                            Contact
                        </a>
                        <a href="/privacy" className="text-gray-100 hover:text-amber-200 transition duration-300">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                {/* Footer Middle Section - Social Media */}
                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="https://facebook.com"
                        className="text-gray-100 hover:text-amber-200 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook-f text-2xl"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        className="text-gray-100 hover:text-amber-200 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-twitter text-2xl"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        className="text-gray-100 hover:text-amber-200 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-instagram text-2xl"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        className="text-gray-100 hover:text-amber-200 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin-in text-2xl"></i>
                    </a>
                </div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />


                {/* Footer Bottom Section - Copyright */}
                <div className="text-center text-gray-100 text-sm">
                    <p>&copy; {new Date().getFullYear()} Online Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
