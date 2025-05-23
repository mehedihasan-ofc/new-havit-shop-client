import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";

const BreakingMarquee = () => {

    const { data: breakingTextData = {}, isLoading } = useQuery({
        queryKey: ['breakingTextData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/breaking-text');
            return res.json();
        }
    });

    return (
        <div className="py-2 bg-primary">
            <div className="my-container">
                <Marquee speed={30} className="text-white text-sm font-tiro font-normal md:text-base">
                    {isLoading ? "Loading..." : breakingTextData?.breakingText || "No breaking text available"}
                </Marquee>
            </div>
        </div>
    );
};

export default BreakingMarquee;