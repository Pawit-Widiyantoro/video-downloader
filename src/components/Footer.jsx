import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-100 text-black py-4 w-full absolute bottom-0">
            <div className="container mx-auto text-center">
                <p>
                    Created by{" "}
                    <a
                        href="https://github.com/yourusername/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-600"
                    >
                        pawitwidiyantoro
                    </a>{" "}
                    &copy; {currentYear}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
