import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const AllOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"all"} />
        </>
    );
};

export default AllOrders;