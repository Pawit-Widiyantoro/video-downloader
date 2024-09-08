const Header = ({ platform }) => {
    return (
        <div className='flex justify-center my-3'>
            <h1 className='font-bold text-3xl'>{platform} Video Downloader</h1>
        </div>
    );
}

export default Header;