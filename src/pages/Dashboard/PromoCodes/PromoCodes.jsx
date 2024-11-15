import { useState } from "react";
import NewPromoModal from "../../../components/Dashboard/NewPromoModal/NewPromoModal";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { formattedDate } from "../../../utils";

const TABLE_HEAD = ["#", "Name", "Image", "Created At", "Action"];

const PromoCodes = () => {

    const categories = [];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleDeletePromo = promoCodeId => {
        console.log(promoCodeId);
    }

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Promo Code list ({categories?.length})
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all promo codes
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={handleOpen} size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                                <TbCategoryPlus size={20} />
                                Add Modal
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll p-0 mt-5">
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
                            {categories.map(
                                ({ _id, name, image, createdAt }, index) => {
                                    const isLast = index === categories.length - 1;
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
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Avatar src={image} alt={name} size="sm" />
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
                                                <IconButton onClick={() => handleDeletePromo(_id)} size="sm" variant="text" className="rounded-full">
                                                    <AiOutlineDelete className="text-red-600" size={20} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <NewPromoModal open={open} handleOpen={handleOpen} />
        </>
    );
};

export default PromoCodes;