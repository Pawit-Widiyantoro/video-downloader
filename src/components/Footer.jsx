import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-100 text-black py-4 w-full">
            <div className="container mx-auto text-center">
                <p>
                    Created by{" "}
                    <a
                        href="https://github.com/Pawit-Widiyantoro/video-downloader"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                    >
                        pawitwidiyantoro
                    </a>{" "}
                    &copy; {currentYear}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
