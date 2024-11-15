import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";

const NewPromoModal = ({ open, handleOpen }) => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [expiryDate, setExpiryDate] = useState("");

    const handleSubmit = () => {
        // Add logic to handle the promo code submission here
        console.log({ promoCode, discount, expiryDate });
        handleOpen(); // Close the modal after submission
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Create New Promo Code</DialogHeader>
            <DialogBody>
                <div className="space-y-4">
                    <div>
                        <Input
                            label="Promo Code"
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter promo code"
                        />
                    </div>
                    <div>
                        <Input
                            label="Discount (%)"
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            placeholder="Enter discount percentage"
                        />
                    </div>
                    <div>
                        <Input
                            label="Expiry Date"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                    Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>
                    Create
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default NewPromoModal;