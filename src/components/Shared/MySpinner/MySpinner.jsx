// // import { Spinner } from "@material-tailwind/react";

// const MySpinner = () => {
//     return (
//         <div className="flex items-center justify-center h-80">
//             {/* <Spinner color="teal" className="h-10 w-10" /> */}
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
//         </div>
//     );
// };

// export default MySpinner;

const MySpinner = () => {
    return (
        <div className="flex items-center justify-center h-80 bg-secondary-light">
            <div className="relative flex items-center justify-center h-20 w-20">
                {/* Outer Gradient Circle */}
                <div
                    className="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
                    style={{
                        borderTopColor: '#30a444',
                        borderLeftColor: '#DEF9EC',
                        animationDuration: '1.5s',
                    }}
                ></div>
                {/* Inner Glow Effect */}
                <div
                    className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"
                ></div>
                {/* Center Icon */}
                <div className="z-10 text-primary font-extrabold text-2xl tracking-wider">
                    H
                </div>
            </div>
        </div>
    );
};

export default MySpinner;


