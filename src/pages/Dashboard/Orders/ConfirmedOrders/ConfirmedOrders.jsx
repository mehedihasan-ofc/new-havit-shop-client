import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const ConfirmedOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"confirmed"} />
        </>
    );
};

export default ConfirmedOrders;