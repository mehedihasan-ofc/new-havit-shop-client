import BlogAd from "../../../components/Ads/BlogAd/BlogAd";
import BlogCard from "../../../components/Card/BlogCard/BlogCard";
import Newsletter from "../../../components/Newsletter/Newsletter";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useBlogs from "../../../hooks/useBlogs";
import NoDataFound from "../NoDataFound/NoDataFound";

const OurBlog = () => {
    const [blogs, loading] = useBlogs();

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container my-10">
            <div className="space-y-10">
                {blogs?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {blogs?.map((blog) => (
                            <BlogCard key={blog?._id} data={blog} />
                        ))}
                    </div>
                ) : (
                    <NoDataFound />
                )}

                <Newsletter />

                <BlogAd />
            </div>
        </div>
    );
};

export default OurBlog;