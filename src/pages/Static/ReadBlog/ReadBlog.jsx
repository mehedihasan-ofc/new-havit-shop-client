import { Link, useParams } from "react-router-dom";
import Newsletter from "../../../components/Newsletter/Newsletter";
import { TbCategoryPlus } from "react-icons/tb";
import { LuAlarmClock } from "react-icons/lu";
import { formattedDate } from "../../../utils";
import { AiOutlineCalendar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import { FaExternalLinkAlt } from "react-icons/fa";
import ShowAd from "../../../components/Ads/ShowAd/ShowAd";

const ReadBlog = () => {
    const { id } = useParams();

    const { data: blog = {}, isLoading: loading } = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs/${id}`);
            return res.json();
        },
    });

    const { headline, category, readTime, createdAt, image, content, link } = blog;

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="my-container my-5">
            <div className="space-y-6">
                <div className="border rounded-md p-4 md:p-10">
                    <div className="space-y-8">
                        <div className="space-y-3 md:space-y-5">
                            <h2 className="text-lg md:text-3xl text-center font-semibold">{headline}</h2>

                            <div className="flex flex-wrap justify-center items-center gap-5 text-center">
                                <div className="flex items-center gap-2">
                                    <TbCategoryPlus className="text-primary" size={18} />
                                    <p className="text-sm">Category: {category}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <LuAlarmClock className="text-primary" size={18} />
                                    <p className="text-sm">Reading time: {readTime}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <AiOutlineCalendar className="text-primary" size={18} />
                                    <p className="text-sm">Published: {formattedDate(createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="w-full h-full md:h-96 mx-auto">
                                <img className="w-full h-full object-cover rounded-lg shadow" src={image} alt="" />
                            </div>
                        </div>

                        {content?.map((item) => (
                            <div key={item?._id} className="space-y-2">
                                <h4 className="font-medium">{item?.title}</h4>
                                <p>{item?.description}</p>
                            </div>
                        ))}

                        {/* Link Section */}
                        {link && (
                            <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow">
                                <h4 className="font-medium text-lg text-primary">For More Information, Please Visit:</h4>
                                <Link
                                    to={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline flex items-center gap-2 mt-2"
                                >
                                    <FaExternalLinkAlt size={16} />
                                    Click Here
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <Newsletter />

                <ShowAd name="Blog Details Page Ad" />
            </div>
        </div>
    );
};

export default ReadBlog;
