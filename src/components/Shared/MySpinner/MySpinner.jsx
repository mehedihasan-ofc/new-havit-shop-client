import { Spinner } from "@material-tailwind/react";

const MySpinner = () => {
    return (
        <div className="flex items-center justify-center h-80">
            <Spinner color="teal" className="h-10 w-10" />
        </div>
    );
};

export default MySpinner;