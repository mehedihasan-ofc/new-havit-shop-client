import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const ReturnedOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"returned"} />
        </>
    );
};

export default ReturnedOrders;