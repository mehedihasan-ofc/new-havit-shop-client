import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Chip,
    Avatar,
} from "@material-tailwind/react";
import UserImg from "../../../../assets/user.jpg";
import { formattedDate } from "../../../../utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TABLE_HEAD = ["Name", "Email", "Status", "Registration"];

const Customers = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: customers = [] } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/customers');
            return res.data;
        }
    });

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Customer List ({customers?.length})
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all customers
                        </Typography>
                    </div>

                    <div className="w-full md:w-72">
                        <Input
                            label="Search Customer"
                            color="teal"
                            icon={<MagnifyingGlassIcon color="teal" className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className="overflow-scroll px-0">
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
                        {customers.map(
                            ({ _id, fullName, email, createdAt, status }, index) => {
                                const isLast = index === customers.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={UserImg} alt={fullName} size="sm" />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {fullName}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={status}
                                                    color={status === "active" ? "green" : "red"}
                                                />
                                            </div>
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
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default Customers;