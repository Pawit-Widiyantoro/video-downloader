import { useState } from "react";
import Header from "../components/Header";

const YoutubePage = () => {
    const [url, setUrl] = useState('');
    const [videoFormats, setVideoFormats] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        const apiURL = `https://api.nyxs.pw/dl/yt?url=${encodeURIComponent(url)}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                const formats = data.result?.data;

                // Map the response data to an array of format objects
                if (formats) {
                    const availableFormats = Object.entries(formats).map(([key, format]) => ({
                        quality: format.quality,
                        size: format.size,
                        url: format.url
                    }));
                    setVideoFormats(availableFormats);
                } else {
                    alert("Failed to retrieve Youtube video formats!");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching Youtube video");
            });
    };

    return (
        <div className='container mx-auto p-5'>
            <Header platform="Youtube" />
            <div className='flex justify-center gap-2'>
                <input
                    type="text" 
                    className='border shadow appearance-none rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    placeholder='Enter Youtube URL'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-sans px-3 py-2 rounded-md'
                    onClick={handleDownload}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Download"}
                </button>
            </div>

       {/* Show available formats */}
{videoFormats.length > 0 && (
    <div className="mt-5 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-3">Available Formats:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {videoFormats.map((format, index) => (
                <div 
                    key={index} 
                    className="border p-4 rounded shadow-lg max-w-xs w-full bg-white text-center"
                >
                    <p className="text-md text-gray-700">
                        <strong>Quality:</strong> {format.quality}
                    </p>
                    <p className="text-md text-gray-600">
                        <strong>Size:</strong> {format.size}
                    </p>
                    <a
                        href={format.url}
                        className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-block transition duration-300 ease-in-out"
                        download
                    >
                        Download
                    </a>
                </div>
            ))}
        </div>
    </div>
)}

        </div>
    );
};

export default YoutubePage;
