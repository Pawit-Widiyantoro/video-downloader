import { useState } from "react";
import Header from "../components/Header";

const TwitterPage = () => {
    const [url, setUrl] = useState('');
    const [videos, setVideos] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid url!");
            return;
        }

        setLoading(true);
        const apiURL = `https://api.nyxs.pw/dl/twitter?url=${encodeURIComponent(url)}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setLoading(false);

                const media = data.result?.media;
                if (media && media.length > 0) {
                    const videoMedia = media.find(item => item.type === 'video');
                    if (videoMedia && videoMedia.videos && videoMedia.videos.length > 0) {
                        const sortedVideos = videoMedia.videos.sort((a,b) => b.bitrate - a.bitrate);
                        setVideos(sortedVideos);
                        setSelectedVideoUrl(sortedVideos[0].url);
                    } else {
                        alert("No video found in the tweet");
                    }
                } else {
                    alert("No media found in the tweet!")
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching Twitter video");
            });
    }

    return (
        <div className="container mx-auto p-5">
            <Header platform="Twitter" />
            <div className="flex flex-col md:flex-row justify-center gap-2">
                <input 
                    type="text" 
                    className='border shadow appearance-none rounded w-full md:w-1/2 lg:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Enter Twitter URL'
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

            {/* Video Quality Options */}
            {videos.length > 0 && (
                <div className='flex flex-col items-center mt-4'>
                <h2 className='font-bold text-xl mb-2'>Select Video Quality:</h2>
                <div className='flex flex-col'>
                    {videos.map((video, index) => (
                    <label key={index} className='flex items-center mb-1'>
                        <input
                        type="radio"
                        name="videoQuality"
                        value={video.url}
                        checked={selectedVideoUrl === video.url}
                        onChange={() => setSelectedVideoUrl(video.url)}
                        className="mr-2"
                        />
                        {`${video.quality} (${(video.bitrate / 1000).toFixed(0)} kbps)`}
                    </label>
                    ))}
                </div>

                {/* Download Link */}
                <div className='flex justify-center mt-4'>
                    <a
                    href={selectedVideoUrl}
                    className='bg-green-500 hover:bg-green-600 text-white p-2 rounded'
                    download
                    >
                    Download Video
                    </a>
                </div>
                </div>
            )}
        </div>
    );
}

export default TwitterPage;