import { Button } from "@material-tailwind/react";
import { BsExclamationTriangle } from "react-icons/bs";

const NoDataFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-5 bg-gray-100 rounded-md">
            <BsExclamationTriangle className="h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700">No Data Found</h1>
            <p className="mt-2 text-gray-500">It looks like there's nothing here. Try refreshing the page or check back later.</p>
            <Button
                size="sm"
                className="mt-5 rounded bg-primary font-medium"
                onClick={() => window.location.reload()}
            >
                Refresh
            </Button>
        </div>
    );
};

export default NoDataFound;