import { useState } from "react";
import Header from "../components/Header";

const TiktokPage = () => {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoType, setVideoType] = useState('video');
    const [availableTypes, setAvailableTypes] = useState({
        video: false,
        videoHD: false,
        videoWatermark: false,
    });

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        // https://api.ryzendesu.vip/api/downloader/ttdl?url=https%3A%2F%2Fvt.tiktok.com%2FZS236CxD1%2F
        const apiURL = `https://api.ryzendesu.vip/api/downloader/ttdl?url=${encodeURIComponent(url)}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setLoading(false);

                // Check which video types are available
                const available = {
                    video: !!data.data?.play,
                    videoHD: !!data.data?.hdplay,
                    videoWatermark: !!data.data?.wmplay,
                };

                setAvailableTypes(available);

                // Set default link for selected video type
                let video = null;
                if (videoType === "videoHD" && available.videoHD) {
                    video = data.data?.hdplay;
                } else if (videoType === "videoWatermark" && available.videoWatermark) {
                    video = data.data?.wmplay;
                } else {
                    video = data.data?.play; // fallback to standard video
                }

                if (video) {
                    setDownloadLink(video);
                } else {
                    alert("Failed to retrieve TikTok video");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching TikTok video");
            });
    };

    return (
        <div className='container mx-auto p-5'>
            <Header platform="TikTok" />
            <div className='flex flex-col md:flex-row justify-center gap-2'>
                <input
                    type="text" 
                    className='border shadow appearance-none rounded w-full md:w-1/2 lg:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    placeholder='Enter TikTok URL'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-sans px-3 py-2 rounded-md w-full md:w-auto'
                    onClick={handleDownload}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Download"}
                </button>
            </div>

            {/* Radio Buttons for Selecting Video Type */}
            <div className='flex flex-col md:flex-row justify-center gap-4 mt-4 mx-5 md:mx-0'>
                {availableTypes.video && (
                    <label className='flex items-center'>
                        <input
                            type="radio"
                            value="video"
                            checked={videoType === 'video'}
                            onChange={() => setVideoType('video')}
                            className="mr-2"
                        />
                        Standard Video
                    </label>
                )}

                {availableTypes.videoHD && (
                    <label className='flex items-center'>
                        <input
                            type="radio"
                            value="videoHD"
                            checked={videoType === 'videoHD'}
                            onChange={() => setVideoType('videoHD')}
                            className="mr-2"
                        />
                        HD Video
                    </label>
                )}

                {availableTypes.videoWatermark && (
                    <label className='flex items-center'>
                        <input
                            type="radio"
                            value="videoWatermark"
                            checked={videoType === 'videoWatermark'}
                            onChange={() => setVideoType('videoWatermark')}
                            className="mr-2"
                        />
                        Video with Watermark
                    </label>
                )}
            </div>

            {downloadLink && (
                <div className='flex justify-center mt-4'>
                    <a href={downloadLink} className='bg-green-500 hover:bg-green-700 text-white p-2 rounded' download>
                        Download Video
                    </a>
                </div>
            )}
        </div>
    );
}

export default TiktokPage;
