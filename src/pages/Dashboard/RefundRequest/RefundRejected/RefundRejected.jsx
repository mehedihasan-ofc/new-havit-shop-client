import RefundOrdersByStatus from "../../../../components/RefundOrdersByStatus/RefundOrdersByStatus";

const RefundRejected = () => {
    return (
        <>
            <RefundOrdersByStatus status={"rejected"} />
        </>
    );
};

export default RefundRejected;