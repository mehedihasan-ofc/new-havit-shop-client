import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const PendingOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"pending"} />
        </>
    );
};

export default PendingOrders;