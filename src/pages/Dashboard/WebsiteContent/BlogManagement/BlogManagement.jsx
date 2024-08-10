import { RiBloggerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// -----------------------------------------------
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import useBlogs from "../../../../hooks/useBlogs";
import { formattedDate } from "../../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import NoDataFound from "../../../Static/NoDataFound/NoDataFound";
// -----------------------------------------------

const TABLE_HEAD = [ "#", "Image", "Category", "Read Time", "Created At", "Action"];

const BlogManagement = () => {

    const [blogs, loading, refetch] = useBlogs();
    const [axiosSecure] = useAxiosSecure();

    const handleDeleteBlog = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              
                axiosSecure.delete(`/blogs/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
    };

    if(loading) {
        return <MySpinner />;
    }

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Blog list ({blogs.length})
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all blogs
                        </Typography>
                    </div>
                    <div>
                        <Link to="/dashboard/create-blog">
                            <Button size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <RiBloggerLine size={20} />
                                Create a Blog
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            
            {blogs?.length > 0 ? <CardBody className="overflow-scroll p-0 mt-5">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(
                            ({ _id, image, category, readTime, createdAt, }, index) => {
                                const isLast = index === blogs.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Avatar src={image} alt={category} size="sm" variant="rounded" />
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {category}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {readTime}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formattedDate(createdAt)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <IconButton onClick={() => handleDeleteBlog(_id)} size="sm" variant="text" className="rounded-full">
                                                <AiOutlineDelete className="text-red-600" size={18} />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody> : <div className="mt-5"><NoDataFound /></div>}
        </Card>
    );
};

export default BlogManagement;