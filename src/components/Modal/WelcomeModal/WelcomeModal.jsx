import { Button, Dialog, DialogBody } from "@material-tailwind/react";

const WelcomeModal = ({ open, handleOpen, welcomeData }) => {

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            className="max-w-xl mx-auto"
        >
            {/* Modal Body */}
            <DialogBody className="p-0">
                {/* Top Section - Text & Close Icon */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-bold text-primary">Deal of the Day</h2>
                    <button
                        onClick={handleOpen}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Middle Section - Image */}
                <div className="relative">
                    {welcomeData?.image ? (
                        <img
                            src={welcomeData.image}
                            alt="Welcome"
                            className="w-full h-[264px] object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-[264px] bg-gray-200">
                            <p className="text-gray-500">No Image Available</p>
                        </div>
                    )}
                </div>

                {/* Bottom Section - Button */}
                <div className="flex justify-center py-4 bg-gray-50">
                    <Button
                        size="sm"
                        onClick={handleOpen}
                        className="rounded-none bg-primary font-medium"
                    >
                        Shop Now
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default WelcomeModal;