import { Button } from "@material-tailwind/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCart from "../../hooks/useCart";
import MySpinner from "../../components/Shared/MySpinner/MySpinner";

const ViewCart = () => {
    const [cart, isLoading] = useCart();

    console.log(cart, isLoading);

    if(isLoading) return <MySpinner />

    return (
        <div className="max-w-4xl w-full mx-auto px-6 my-5">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-4xl font-extrabold tracking-wide font-sans">Your Cart</h2>
                    <p>There are <span className="text-primary">{cart?.length}</span> products in your cart!</p>
                </div>

                <div>
                    <Button variant="text" className="flex items-center rounded-none p-2 gap-2">
                        <RiDeleteBin6Line size={16} />
                        Clear Cart
                    </Button>
                </div>
            </div>

            {/* Show Product Table */}
        </div>
    );
};

export default ViewCart;