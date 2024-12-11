import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Button,
} from "@material-tailwind/react";
import { formattedDate } from "../../../../utils";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from "react";
import { CgSoftwareDownload } from "react-icons/cg";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";

const TABLE_HEAD = ["#", "Name", "Email", "Mobile", "Address", "Registered"];

const Customers = () => {

    const [axiosSecure] = useAxiosSecure();
    const tableRef = useRef(null);

    const { data: customers = [], isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/customers');
            return res.data;
        }
    });

    if (isLoading) return <MySpinner />

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Customer List ({customers?.length})
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all customers
                        </Typography>
                    </div>

                    <div>
                        <DownloadTableExcel
                            filename="users table"
                            sheet="users"
                            currentTableRef={tableRef.current}
                        >
                            <Button className="flex items-center gap-1 rounded-none bg-primary font-medium">
                                <CgSoftwareDownload size={20} />
                                Download .Xls File
                            </Button>
                        </DownloadTableExcel>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="overflow-scroll px-0">
                <table ref={tableRef} className="w-full min-w-max table-auto text-left">
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
                            ({ _id, fullName, email, billingDetails, createdAt }, index) => {
                                const isLast = index === customers.length - 1;
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
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {fullName || "N/A"}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email || "N/A"}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {billingDetails?.phoneNumber || "No phone number provided"}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {billingDetails?.address && billingDetails?.area && billingDetails?.city
                                                    ? `${billingDetails?.address}, ${billingDetails?.area}, ${billingDetails?.city}`
                                                    : "No address details available"}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formattedDate(createdAt) || "N/A"}
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