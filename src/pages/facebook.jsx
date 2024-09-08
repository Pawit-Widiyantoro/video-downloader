import { useState } from "react";
import Header from "../components/Header";

const FacebookPage = () => {
    const [url, setUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoType, setVideoType] = useState('');
    const [availableQualities, setAvailableQualities] = useState({ hd: '', sd: '' });

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

                const hdAvailable = data.result?.hd ? data.result.hd : '';
                const sdAvailable = data.result?.sd ? data.result.sd : '';

                if (hdAvailable || sdAvailable) {
                    setAvailableQualities({ hd: hdAvailable, sd: sdAvailable });

                    // Automatically select a quality if only one is available
                    if (hdAvailable && !sdAvailable) {
                        setVideoType('hd');
                        setDownloadLink(hdAvailable);
                    } else if (sdAvailable && !hdAvailable) {
                        setVideoType('sd');
                        setDownloadLink(sdAvailable);
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
        if (videoType === 'hd') {
            setDownloadLink(availableQualities.hd);
        } else if (videoType === 'sd') {
            setDownloadLink(availableQualities.sd);
        }
    };

    return (
        <div className='container mx-auto p-5'>
            <Header platform="Facebook" />
            <div className='flex flex-col md:flex-row justify-center gap-2'>
                <input
                    type="text"
                    className='border shadow appearance-none rounded w-full md:w-1/2 lg:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
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
                                onChange={() => {
                                    setVideoType('hd');
                                    setDownloadLink(availableQualities.hd);
                                }}
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
                                onChange={() => {
                                    setVideoType('sd');
                                    setDownloadLink(availableQualities.sd);
                                }}
                                className="mr-2"
                            />
                            SD Video
                        </label>
                    )}
                </div>
            ) : null}

            {/* Display the download link once the video is selected */}
            {downloadLink && (
                <div className='flex justify-center mt-4'>
                    <a 
                        href={downloadLink} 
                        className='bg-green-500 hover:bg-green-700 text-white p-2 rounded cursor-pointer'
                        onClick={handleDownloadClick}
                        download
                    >
                        Download {videoType === 'hd' ? "HD" : "SD"} Video
                    </a>
                </div>
            )}
        </div>
    );
};

export default FacebookPage;
