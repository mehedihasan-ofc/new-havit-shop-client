import { Card, IconButton, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMessages from "../../../hooks/useMessages";
import NoDataFound from "../../Static/NoDataFound/NoDataFound";
import { formattedDate } from "../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import { SlEye } from "react-icons/sl";

const TABLE_HEAD = ["#", "Name", "Email", "Date", "Action"];

const Messages = () => {

    const [messages, loading, refetch] = useMessages();
    const [axiosSecure] = useAxiosSecure();

    const handleDeleteMessage = (id) => {
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

                axiosSecure.delete(`/messages/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
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
    }

    if (loading) {
        return <MySpinner />
    }

    return (
        <>
            {messages?.length > 0 ? <Card className="h-full w-full rounded-none overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                        {messages?.map(({ _id, name, email, createdAt }, index) => (
                            <tr key={_id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {email}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {formattedDate(createdAt)}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <IconButton size="sm" variant="text" className="rounded-full">
                                        <SlEye className="text-teal-600" size={18} />
                                    </IconButton>

                                    <IconButton onClick={() => handleDeleteMessage(_id)} size="sm" variant="text" className="rounded-full">
                                        <AiOutlineDelete className="text-red-600" size={18} />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card> : <NoDataFound />}
        </>
    );
};

export default Messages;