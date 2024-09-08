import { useState } from "react";
import Header from "../components/Header";

const InstagramPage = () => {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        const apiUrl = `https://api.nyxs.pw/dl/ig?url=${encodeURIComponent(url)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                const videoURL = data.result?.url;
                if (videoURL) {
                    setDownloadLink(videoURL);
                } else {
                    alert("Failed to retrieve Instagram video!");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching Instagram video!");
            });
    }

    return (
        <div className='container mx-auto p-5'>
            <Header platform="Instagram" />
            <div className='flex justify-center gap-2'>
                <input
                    type="text" 
                    className='border shadow appearance-none rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineer' 
                    placeholder='Enter Instagram URL'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                    className='bg-blue-600 text-white font-sans px-3 py-2 rounded-md'
                    onClick={handleDownload}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Download"}
                </button>
            </div>
                {downloadLink && (
                    <div className='flex justify-center mt-4'>
                        <a href={downloadLink} className='bg-green-500 text-white p-2 rounded' download>
                            Download Video
                        </a>
                    </div>
                )}
        </div>
    )
}

export default InstagramPage;