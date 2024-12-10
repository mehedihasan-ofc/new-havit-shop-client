import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const OutForDeliveryOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"out-of-delivery"} />
        </>
    );
};

export default OutForDeliveryOrders;