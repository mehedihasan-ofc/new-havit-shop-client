import RefundOrdersByStatus from "../../../../components/RefundOrdersByStatus/RefundOrdersByStatus";

const RefundPending = () => {
    return (
        <>
            <RefundOrdersByStatus status={"pending"} />
        </>
    );
};

export default RefundPending;