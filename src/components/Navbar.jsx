import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="bg-gray-800 py-4 px-7">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white font-bold">
                    <Link to="/">Downloader</Link>
                </h1>
                <button 
                    className="text-white block md:hidden" 
                    onClick={toggleMenu}
                >
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Navbar Links (Hidden on Mobile) */}
                <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block hidden`}>
                    <Link to="/" className="text-white">TikTok</Link>
                    <Link to="/youtube" className="text-white">Youtube</Link>
                    <Link to="/facebook" className="text-white">Facebook</Link>
                    <Link to="/instagram" className="text-white">Instagram</Link>
                    <Link to="/twitter" className="text-white">Twitter</Link>
                </div>
            </div>
             {/* Dropdown Menu for Mobile (Visible when Hamburger Icon is Clicked) */}
             <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col space-y-2 p-4 text-center">
                    <Link to="/" className="text-white">TikTok</Link>
                    <Link to="/youtube" className="text-white">Youtube</Link>
                    <Link to="/facebook" className="text-white">Facebook</Link>
                    <Link to="/instagram" className="text-white">Instagram</Link>
                    <Link to="/twitter" className="text-white">Twitter</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;