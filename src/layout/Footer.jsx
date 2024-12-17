const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold">Online Shop</p>
                <div className="mt-4">
                    <a href="/about" className="text-gray-400 hover:text-white mx-3">
                        About
                    </a>
                    <a href="/contact" className="text-gray-400 hover:text-white mx-3">
                        Contact
                    </a>
                    <a href="/privacy" className="text-gray-400 hover:text-white mx-3">
                        Privacy Policy
                    </a>
                </div>
                <p className="mt-4 text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Online Shop. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
