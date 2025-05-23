import { useQuery } from "@tanstack/react-query";

const useAboutUs = () => {
    const { data: aboutUsData = {}, isLoading, refetch } = useQuery({
        queryKey: ['aboutUsData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/about-us');
            return res.json();
        }
    });

    return [aboutUsData, isLoading, refetch];
};

export default useAboutUs;