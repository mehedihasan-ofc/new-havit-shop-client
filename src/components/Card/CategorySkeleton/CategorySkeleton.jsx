const CategorySkeleton = () => (
  <div
    className="flex flex-col items-center justify-center rounded px-4 py-6"
    style={{ height: '160px', width: '120px' }}
  >
    <div className="w-14 h-14 mb-4 bg-gray-300 animate-pulse rounded"></div>
    <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
  </div>
);

export default CategorySkeleton;
