import OrderProductCard from "../../../components/Card/OrderProductCard/OrderProductCard";
import MySpinner from "../../../components/Shared/MySpinner/MySpinner";
import useOrders from "../../../hooks/useOrders";

const ProfileCancellations = () => {

    const [orders, isLoading] = useOrders("canceled");

    if (isLoading) return <MySpinner />

    return (
        <div className="max-w-4xl mx-auto p-6 shadow rounded border">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                My Cancellations
            </h2>

            {orders.length === 0 ? (
                <p className="text-red-600 text-center">
                    You have no canceled orders.
                </p>
            ) : (
                <div className="space-y-4">

                    {orders.map((order) => <OrderProductCard key={order?._id} order={order} />)}
                </div>
            )}
        </div>
    );
};

export default ProfileCancellations;