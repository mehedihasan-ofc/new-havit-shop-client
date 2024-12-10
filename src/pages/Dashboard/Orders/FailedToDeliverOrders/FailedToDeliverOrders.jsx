import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const FailedToDeliverOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"failed-to-deliver"} />
        </>
    );
};

export default FailedToDeliverOrders;