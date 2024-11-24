// import { Spinner } from "@material-tailwind/react";

const MySpinner = () => {
    return (
        <div className="flex items-center justify-center h-80">
            {/* <Spinner color="teal" className="h-10 w-10" /> */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
    );
};

export default MySpinner;