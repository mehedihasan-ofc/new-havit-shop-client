import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const CanceledOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"canceled"} />
        </>
    );
};

export default CanceledOrders;