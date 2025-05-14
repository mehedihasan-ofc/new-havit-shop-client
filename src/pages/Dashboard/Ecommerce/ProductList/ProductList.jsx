import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { TbCategoryPlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { formattedDate } from "../../../../utils";
import { AiOutlineDelete } from "react-icons/ai";
import useProducts from "../../../../hooks/useProducts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MySpinner from "../../../../components/Shared/MySpinner/MySpinner";
import Swal from "sweetalert2";
import { PiNotePencil } from "react-icons/pi";
import { useState } from "react";

const TABLE_HEAD = [
    "#",
    "Code",
    "Name",
    "Image",
    "Category",
    "Stock",
    "Sold",
    "Created At",
    "Action",
];

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, loading, refetch] = useProducts();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    if (loading) {
        return <MySpinner />;
    }

    const filteredProducts = products.filter((product) =>
        product.skuCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Product list ({filteredProducts?.length})
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all products
                        </Typography>
                    </div>

                    <input
                        type="text"
                        placeholder="Search by SKU code"
                        className="border border-gray-300 focus:ring-primary focus:outline-none focus:ring-1 rounded w-96 px-2 py-2 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Button onClick={() => navigate("/dashboard/add-new-product")} size="sm" className="flex items-center gap-2 rounded-none bg-primary font-medium">
                        <TbCategoryPlus size={20} />
                        Add New Product
                    </Button>
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
                                        className="font-normal leading-none opacity-70 text-sm"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(
                            (
                                {
                                    _id,
                                    skuCode,
                                    name,
                                    images,
                                    category,
                                    availableStock,
                                    soldCount,
                                    createdAt,
                                },
                                index
                            ) => {
                                const isLast = index === filteredProducts.length - 1;
                                const classes = isLast
                                    ? "p-2"
                                    : "p-2 border-b border-blue-gray-50";

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
                                                className="font-normal text-xs"
                                            >
                                                {skuCode}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-xs"
                                                dangerouslySetInnerHTML={{
                                                    __html: name
                                                        .split(" ")
                                                        .reduce((acc, word, i) => {
                                                            return (
                                                                acc +
                                                                word +
                                                                ((i + 1) % 3 === 0
                                                                    ? "<br/>"
                                                                    : " ")
                                                            );
                                                        }, ""),
                                                }}
                                            />
                                        </td>
                                        <td className={classes}>
                                            <Avatar
                                                src={images[0]?.url}
                                                alt={name}
                                                size="sm"
                                            />
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {category?.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={availableStock}
                                                    color="red"
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={soldCount}
                                                    color="green"
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
                                        <td className={classes}>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/product-edit/${_id}`
                                                    )
                                                }
                                                size="sm"
                                                variant="text"
                                                className="rounded-full"
                                            >
                                                <PiNotePencil
                                                    className="text-teal-600"
                                                    size={20}
                                                />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => handleDeleteProduct(_id)}
                                                size="sm"
                                                variant="text"
                                                className="rounded-full"
                                            >
                                                <AiOutlineDelete
                                                    className="text-red-600"
                                                    size={20}
                                                />
                                            </IconButton>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default ProductList;