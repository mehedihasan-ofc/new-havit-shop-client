import useRefundOrdersByStatus from "../../hooks/useRefundOrdersByStatus";

const RefundOrdersByStatus = ({ status }) => {

    const [refundOrders, isLoading, refetch] = useRefundOrdersByStatus(status);

    console.log(refundOrders);

    return (
        <div>
            RefundOrdersByStatus
        </div>
    );
};

export default RefundOrdersByStatus;