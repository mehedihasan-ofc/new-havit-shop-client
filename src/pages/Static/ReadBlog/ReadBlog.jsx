import { useParams } from "react-router-dom";
import Newsletter from "../../../components/Newsletter/Newsletter";
import { TbCategoryPlus } from "react-icons/tb";
import { LuAlarmClock } from "react-icons/lu";
import { formattedDate } from "../../../utils";
import { AiOutlineCalendar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import BlogDetailsAd from "../../../components/Ads/BlogDetailsAd/BlogDetailsAd";

const ReadBlog = () => {

    const { id } = useParams();

    const { data: blog = {}, isLoading: loading } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await fetch(`https://new-havit-shop-server.vercel.app/blogs/${id}`);
            return res.json();
        }
    });

    const { headline, category, readTime, createdAt, image, content } = blog;

    if(loading) {
        return <MySpinner />
    }

    return (
        <div className="my-container my-10">
            <div className="space-y-10">

                <div className="border rounded-md p-10">

                    <div className="space-y-8">
                        
                        <div className="space-y-5">

                            <h2 className="font-ubuntu text-3xl text-center font-semibold">{headline}</h2>

                            <div className="flex justify-center items-center gap-5">
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
                            <div className="w-full h-96 mx-auto">
                                <img className="w-full h-full object-cover rounded-lg shadow-lg" src={image} alt="" />
                            </div>
                        </div>

                        {
                            content?.map(item => (
                                <div key={item?._id} className="space-y-2">
                                    <h4 className="font-medium text-xl">{item?.title}</h4>
                                    <p>{item?.description}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <BlogDetailsAd />

                <Newsletter />
            </div>
        </div>
    );
};

export default ReadBlog;