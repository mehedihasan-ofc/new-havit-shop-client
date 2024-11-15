import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Radio } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const NewPromoModal = ({ open, handleOpen }) => {
    const [axiosSecure] = useAxiosSecure();
    
    const [promoCode, setPromoCode] = useState("");
    const [discountType, setDiscountType] = useState("percent");
    const [discountValue, setDiscountValue] = useState(0);
    const [expiryDate, setExpiryDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newPromo = {
                promoCode,
                discountType,
                discount: discountType === "percent" ? `${discountValue}%` : `${discountValue}Tk`,
                expiryDate,
            };

            // Make API call using axiosSecure
            const { data } = await axiosSecure.post("/promo-code", newPromo);

            if (data.insertedId) {
                toast.success("Promo Code Created Successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });

                // Reset form data after successful submission
                setPromoCode("");
                setDiscountType("percent");
                setDiscountValue(0);
                setExpiryDate("");
                handleOpen(); // Close the modal
            } else {
                toast.error("Failed to create promo code.", {
                    position: "top-right",
                    autoClose: 1000,
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error("Error creating promo code:", error);
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: false,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog size="lg" className="rounded p-5" open={open} handler={handleOpen}>
            <DialogHeader>Create New Promo Code</DialogHeader>
            <DialogBody>
                <form className="space-y-4">
                    {/* Promo Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="promoCode">
                            Promo Code
                        </label>
                        <input
                            id="promoCode"
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    {/* Discount Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                        <div className="flex items-center gap-4 mt-1">
                            <Radio
                                id="percent"
                                name="discountType"
                                label="Percent (%)"
                                color="red"
                                checked={discountType === "percent"}
                                onChange={() => setDiscountType("percent")}
                            />
                            <Radio
                                id="amount"
                                name="discountType"
                                label="Amount (Tk)"
                                color="green"
                                checked={discountType === "amount"}
                                onChange={() => setDiscountType("amount")}
                            />
                        </div>
                    </div>

                    {/* Discount Value */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="discountValue"
                        >
                            {discountType === "percent" ? "Discount (%)" : "Discount (Tk)"}
                        </label>
                        <input
                            id="discountValue"
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            placeholder={
                                discountType === "percent"
                                    ? "Enter discount percentage"
                                    : "Enter discount amount in Tk"
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="expiryDate">
                            Expiry Date
                        </label>
                        <input
                            id="expiryDate"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                </form>
            </DialogBody>

            <DialogFooter>
                <Button
                    size="sm"
                    onClick={handleOpen}
                    className="rounded-none bg-red-500 font-medium mr-5"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    className="rounded-none bg-primary font-medium"
                    color="green"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    {loading ? "Creating..." : "Create"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default NewPromoModal;