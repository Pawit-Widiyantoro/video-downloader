import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white font-bold">
                    <div className="flex space-x-4">
                        <Link to="/">TikTok</Link>
                        <Link to="/youtube">Youtube</Link>
                        <Link to="/facebook">Facebook</Link>
                        <Link to="/instagram">Instagram</Link>
                        <Link to="/twitter">Twitter</Link>
                    </div>
                </h1>
            </div>
        </nav>
    )
}

export default Navbar;