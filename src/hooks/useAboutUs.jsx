import { useQuery } from "@tanstack/react-query";

const useAboutUs = () => {
    const { data: aboutUsData = {}, isLoading, refetch } = useQuery({
        queryKey: ['aboutUsData'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/about-us');
            return res.json();
        }
    });

    return [aboutUsData, isLoading, refetch];
};

export default useAboutUs;