import { Progress } from "@material-tailwind/react";
import SVG1 from "../../../../assets/svg/img-status-4.svg";
import SVG2 from "../../../../assets/svg/img-status-5.svg";
import SVG3 from "../../../../assets/svg/img-status-1.svg";
import SVG4 from "../../../../assets/svg/img-status-7.svg";
import SVG5 from "../../../../assets/svg/img-status-8.svg";
import SVG6 from "../../../../assets/svg/img-status-9.svg";

const StatsCard = ({ stats }) => {

    return (
        <div className="border rounded-md shadow">
            <div className="relative">
                <img className="absolute top-0 right-0"
                    src={stats === 1 && SVG1 || stats === 2 && SVG2 || stats === 3 && SVG3 || stats === 4 && SVG4 || stats === 5 && SVG5 || stats === 6 && SVG6}
                    alt="background" />

                <div className="space-y-4 p-5">
                    <h5 className="font-semibold text-xl text-gray-700">Daily Sales</h5>

                    <h3 className="font-medium text-2xl">$249.95</h3>

                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">You made an extra 35,000 this daily</p>
                        <Progress value={25} size="sm" color="blue" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;