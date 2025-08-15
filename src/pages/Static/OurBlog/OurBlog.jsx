import ShowAd from "../../../components/Ads/ShowAd/ShowAd";
import BlogCard from "../../../components/Card/BlogCard/BlogCard";
import Newsletter from "../../../components/Newsletter/Newsletter";
import useBlogs from "../../../hooks/useBlogs";
import NoDataFound from "../NoDataFound/NoDataFound";

const BlogSkeleton = () => {
    return (
        <div className="animate-pulse space-y-3 border rounded-lg p-4 shadow-sm">
            <div className="h-40 bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
    );
};

const OurBlog = () => {
    const [blogs, loading] = useBlogs();

    return (
        <div className="mb-5">
            <div className="my-container my-10">
                <div className="space-y-10">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <BlogSkeleton key={i} />
                            ))}
                        </div>
                    ) : blogs?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {blogs.map((blog) => (
                                <BlogCard key={blog?._id} data={blog} />
                            ))}
                        </div>
                    ) : (
                        <NoDataFound />
                    )}

                    {!loading && <Newsletter />}
                </div>
            </div>

            <ShowAd name="Blog Page Ad" />
        </div>
    );
};

export default OurBlog;
