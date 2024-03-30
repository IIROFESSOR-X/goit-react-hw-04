const LoadMoreBtn = ({ onLoadMore, hasMoreImages }) => {
    if (!hasMoreImages) {
        return null;
    }
   
    return (
        <button onClick={onLoadMore}>
            <p>Load more</p>
        </button>
    );
};

export default LoadMoreBtn;