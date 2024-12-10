import OrdersByStatus from "../../../../components/OrdersByStatus/OrdersByStatus";

const PackagingOrders = () => {
    return (
        <>
            <OrdersByStatus activeStatus={"packaging"} />
        </>
    );
};

export default PackagingOrders;