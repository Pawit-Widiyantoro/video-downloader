import { useState } from "react";

const FacebookPage = () => {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoType, setVideoType] = useState(''); // Initially no selection
    const [availableQualities, setAvailableQualities] = useState({ hd: false, sd: false });

    const handleDownload = () => {
        if (!url) {
            alert("Please enter a valid URL!");
            return;
        }

        setLoading(true);
        const apiURL = `https://api.nyxs.pw/dl/fb?url=${encodeURIComponent(url)}`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                setLoading(false);

                // Check which video qualities are available
                const hdAvailable = data.result?.hd ? true : false;
                const sdAvailable = data.result?.sd ? true : false;

                if (hdAvailable || sdAvailable) {
                    setAvailableQualities({ hd: hdAvailable, sd: sdAvailable });

                    // Automatically select a quality if only one is available
                    if (hdAvailable && !sdAvailable) {
                        setVideoType('hd');
                    } else if (sdAvailable && !hdAvailable) {
                        setVideoType('sd');
                    }
                } else {
                    alert("No downloadable video found!");
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Error fetching Facebook video");
            });
    };

    const handleDownloadClick = () => {
        const videoUrl = videoType === 'hd' ? availableQualities.hd : availableQualities.sd;
        setDownloadLink(videoUrl);
    };

    return (
        <div className='container mx-auto p-5'>
            <div className='flex justify-center my-3'>
                <h1 className='font-bold text-3xl'>Facebook Video Downloader</h1>
            </div>
            <div className='flex justify-center gap-2'>
                <input
                    type="text"
                    className='border shadow appearance-none rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    placeholder='Enter Facebook URL'
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

            {/* Radio Buttons for Selecting Video Type */}
            {availableQualities.hd || availableQualities.sd ? (
                <div className='flex justify-center gap-4 mt-4'>
                    {availableQualities.hd && (
                        <label className='flex items-center'>
                            <input
                                type="radio"
                                value="hd"
                                checked={videoType === 'hd'}
                                onChange={() => setVideoType('hd')}
                                className="mr-2"
                            />
                            HD Video
                        </label>
                    )}
                    {availableQualities.sd && (
                        <label className='flex items-center'>
                            <input
                                type="radio"
                                value="sd"
                                checked={videoType === 'sd'}
                                onChange={() => setVideoType('sd')}
                                className="mr-2"
                            />
                            SD Video
                        </label>
                    )}
                </div>
            ) : null}

            {/* Display the download link once the video is selected */}
            {videoType && (
                <div className='flex justify-center mt-4'>
                    <a href={downloadLink} className='bg-green-500 hover:bg-green-700 text-white p-2 rounded' onClick={handleDownloadClick} download>
                        Download {videoType === 'hd' ? "HD" : "SD"} Video
                    </a>
                </div>
            )}
        </div>
    );
};

export default FacebookPage;
