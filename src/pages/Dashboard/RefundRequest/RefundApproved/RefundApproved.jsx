import RefundOrdersByStatus from "../../../../components/RefundOrdersByStatus/RefundOrdersByStatus";

const RefundApproved = () => {
    return (
        <>
            <RefundOrdersByStatus status={"approved"} />
        </>
    );
};

export default RefundApproved;