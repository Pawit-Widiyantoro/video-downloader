const Header = ({ platform }) => {
    return (
        <div className='flex justify-center text-center my-3 mb-5'>
            <h1 className='font-bold text-4xl'>{platform} Video Downloader</h1>
        </div>
    );
}

export default Header;