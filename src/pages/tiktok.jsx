import { useState } from "react";

const TiktokPage = () => {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        const apiURL = `https://api.nyxs.pw/dl/tiktok?url=${encodeURIComponent(url)}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                const video = data.result?.video;
                if (video) {
                    setDownloadLink(video);
                } else {
                    alert("Failed to retrive TikTok video");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching TikTok video");
            });
    }

    return (
        <div className='container mx-auto p-5'>
            <div className='flex justify-center my-3'>
                <h1 className='font-bold text-3xl'>Video Downloader</h1>
            </div>
            <div className='flex justify-center gap-2'>
                <input
                    type="text" 
                    className='border shadow appearance-none rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineer' 
                    placeholder='Enter video URL'
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

export default TiktokPage;