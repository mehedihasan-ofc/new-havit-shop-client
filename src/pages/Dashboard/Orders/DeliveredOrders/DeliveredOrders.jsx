import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const DeliveredOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"delivered"} />
        </>
    );
};

export default DeliveredOrders;