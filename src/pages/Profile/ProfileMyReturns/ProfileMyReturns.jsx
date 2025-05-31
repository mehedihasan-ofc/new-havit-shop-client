import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useOrders from "../../../hooks/useOrders";
import OrderProductCard from "../../../components/Card/OrderProductCard/OrderProductCard";

const ProfileMyReturns = () => {

    const [orders, isLoading] = useOrders("returned");

    if (isLoading) return <MySpinner />

    return (
        <div className="max-w-4xl mx-auto p-6 shadow rounded border">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-4 font-serif">
                My Returns
            </h2>

            {orders.length === 0 ? (
                <p className="text-red-600 text-center">
                    You have no returned orders.
                </p>
            ) : (
                <div className="space-y-4">

                    {orders.map((order) => <OrderProductCard key={order?._id} order={order} />)}
                </div>
            )}
        </div>
    );
};

export default ProfileMyReturns;