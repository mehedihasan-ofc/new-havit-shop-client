import { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import ViewCartCard from "../../components/Card/ViewCartCard/ViewCartCard";
import { toast } from "react-toastify";

const ViewCart = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [cart, isLoading, refetch] = useCart();
    const [quantities, setQuantities] = useState([]);
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const navigate = useNavigate();
    const [allClear, setAllClear] = useState(false);

    useEffect(() => {
        if (cart) {
            const initialQuantities = cart.map((item) => item?.quantity || 1);
            setQuantities(initialQuantities);
        }
    }, [cart]);

    const handleFlavorChange = (index, flavor) => {
        const updatedFlavors = [...selectedFlavors];
        updatedFlavors[index] = flavor;
        setSelectedFlavors(updatedFlavors);
    };

    const handleQuantityChange = (index, delta) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] += delta;

        // Ensure the quantity doesn't go below 1
        if (updatedQuantities[index] < 1) {
            updatedQuantities[index] = 1;
        }
        setQuantities(updatedQuantities);
    };

    const calculateTotalAmount = () =>
        cart?.reduce((total, item, index) => total + item?.productDetails?.price * quantities[index], 0);

    const handleProceedToCheckout = () => {
        const checkoutData = {
            total: calculateTotalAmount(),
            products: cart?.map((item, index) => ({
                ...item.productDetails,
                productId: item?.productId,
                quantity: quantities[index],
                selectFlavor: selectedFlavors[index],
            }))
        };

        const unselectedItem = checkoutData.products.find(
            (item, index) =>
                item.flavor?.length > 0 &&
                !selectedFlavors[index]
        );

        if (unselectedItem) {
            toast.error(
                `Please select a flavor for "${unselectedItem.name}" before proceeding!`,
                {
                    autoClose: 1600,
                    pauseOnHover: false,
                }
            );
            return;
        }

        navigate("/checkout", { state: { checkoutData } });
    };

    const handleClearCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Set loading state
                setAllClear(true);
                try {
                    const { data } = await axiosSecure.delete('/carts', {
                        data: { userEmail: user?.email },
                    });

                    if (data.deletedCount > 0) {
                        refetch(); // Refresh the cart data
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your cart has been cleared.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "No Items Found",
                            text: "Your cart was already empty.",
                            icon: "info"
                        });
                    }
                } catch (error) {
                    console.error("Error clearing cart:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to clear the cart. Please try again.",
                        icon: "error"
                    });
                } finally {
                    // Reset loading state
                    setAllClear(false);
                }
            }
        });
    };

    if (isLoading) return <MySpinner />;

    if (cart?.length === 0) {
        return (
            <div className="max-w-5xl w-full mx-auto px-6 my-5 py-10 rounded shadow border text-center ">
                <h2 className="text-4xl font-extrabold tracking-wide font-sans mb-4 sm:text-3xl">Your Cart is Empty</h2>
                <p className="text-lg text-gray-600 mb-6 sm:text-base">It looks like you haven't added any items yet. Start shopping and add some great products to your cart!</p>
                <Button onClick={() => navigate("/")} className="bg-primary rounded-none flex items-center gap-2 mx-auto sm:px-4 sm:py-2">
                    <FaArrowLeftLong size={16} />
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl w-full mx-auto px-6 my-5">

            <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                    <h2 className="text-4xl font-extrabold tracking-wide font-sans">Your Cart</h2>
                    <p>There are <span className="text-primary">{cart?.length}</span> products in your cart!</p>
                </div>
                <Button onClick={handleClearCart} variant="text" className="flex items-center rounded-none p-2 gap-2 text-red-600">
                    {allClear ? "Clearing..." : <><RiDeleteBin6Line size={16} /> Clear Cart</>}
                </Button>
            </div>

            <div>
                <div className="space-y-4">
                    {
                        cart?.map((item, index) => (
                            <ViewCartCard
                                key={item._id}
                                item={item}
                                quantity={quantities[index]}
                                onQuantityChange={(change) => handleQuantityChange(index, change)}
                                onFlavorChange={(flavor) => handleFlavorChange(index, flavor)}
                                refetch={refetch}
                            />
                        ))
                    }
                </div>

                <div className="flex justify-end mr-5 py-5">
                    <div className="text-xl font-semibold">
                        Total: <span className="text-primary">৳{calculateTotalAmount().toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-5 mt-5">
                <Button onClick={() => navigate("/")} className="rounded-none bg-primary flex items-center gap-2">
                    <FaArrowLeftLong size={16} />
                    Continue Shopping
                </Button>

                <Button onClick={handleProceedToCheckout} className="rounded-none bg-primary flex items-center gap-2">
                    Proceed To Checkout
                    <TbLogout size={18} />
                </Button>
            </div>
        </div>
    );
};

export default ViewCart;