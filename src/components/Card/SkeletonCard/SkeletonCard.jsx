const SkeletonCard = () => {
    return (
        <div className="animate-pulse border rounded-lg p-3">
            <div className="bg-gray-300 h-40 w-full rounded mb-3"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        </div>
    );
};

export default SkeletonCard;