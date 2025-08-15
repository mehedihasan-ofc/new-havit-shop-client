import { AiOutlineCalendar } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import { formattedDate } from "../../../utils";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {

    const { _id, headline, category, image, readTime, createdAt } = data;

    return (
        <Link to={`/read-blog/${_id}`}>
            <div className="border shadow rounded-md h-full">
                <div className="w-full h-[250px] relative">
                    <p className="absolute top-5 left-0 bg-primary text-white px-3 py-2 text-sm rounded-r-full">{category}</p>
                    <img className="w-full h-full object-contain rounded-t-md" src={image} alt="blog image" />
                </div>

                <div className="space-y-4 px-5 pb-5">

                    <div className="text-center">
                        <h4 className="text-lg hover:underline font-semibold font-ubuntu line-clamp-1">{headline}</h4>
                    </div>

                    <div className="flex items-center justify-center gap-10">
                        <div className="flex items-center gap-1">
                            <LuAlarmClock className="text-primary" size={18} />
                            <p>{readTime} Read</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <AiOutlineCalendar className="text-primary" size={18} />
                            <p>{formattedDate(createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
