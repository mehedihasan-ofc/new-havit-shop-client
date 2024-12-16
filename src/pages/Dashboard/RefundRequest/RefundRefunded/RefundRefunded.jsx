import RefundOrdersByStatus from "../../../../components/RefundOrdersByStatus/RefundOrdersByStatus";

const RefundRefunded = () => {
    return (
        <>
            <RefundOrdersByStatus status={"refunded"} />
        </>
    );
};

export default RefundRefunded;