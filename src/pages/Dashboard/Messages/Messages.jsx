import { useState } from "react";
import { Card, IconButton, Typography, Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
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
    const [selectedMessage, setSelectedMessage] = useState(null); // State to store the selected message

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
                axiosSecure.delete(`/messages/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
    };

    const closeModal = () => {
        setSelectedMessage(null);
    };

    if (loading) {
        return <MySpinner />;
    }

    return (
        <>
            {messages?.length > 0 ? (
                <Card className="h-full w-full rounded-none overflow-scroll">
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
                            {messages?.map(({ _id, name, email, createdAt, message }, index) => (
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
                                    <td className="p-4 flex gap-2">
                                        <IconButton
                                            size="sm"
                                            variant="text"
                                            className="rounded-full"
                                            onClick={() => handleViewMessage({ name, email, createdAt, message })}
                                        >
                                            <SlEye className="text-teal-600" size={18} />
                                        </IconButton>

                                        <IconButton
                                            onClick={() => handleDeleteMessage(_id)}
                                            size="sm"
                                            variant="text"
                                            className="rounded-full"
                                        >
                                            <AiOutlineDelete className="text-red-600" size={18} />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            ) : (
                <NoDataFound />
            )}

            {/* Modern Modal for Viewing Message */}
            <Dialog open={!!selectedMessage} handler={closeModal} size="lg" className="rounded-none shadow-none">
                <DialogHeader className="flex justify-between items-center">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        Message Details
                    </Typography>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-900 transition duration-200"
                    >
                        ✕
                    </button>
                </DialogHeader>
                <DialogBody divider className="bg-gray-50">
                    {selectedMessage && (
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-600">Name:</span>
                                <span className="text-gray-800">{selectedMessage.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-600">Email:</span>
                                <span className="text-gray-800">{selectedMessage.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-600">Date:</span>
                                <span className="text-gray-800">{formattedDate(selectedMessage.createdAt)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-600">Message:</span>
                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.message}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogBody>
                <DialogFooter className="justify-end bg-gray-50">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 text-white bg-teal-600 hover:bg-teal-700 shadow transition duration-300"
                    >
                        Close
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Messages;