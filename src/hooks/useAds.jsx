import { useQuery } from "@tanstack/react-query";

const useAds = () => {
    const { data: adsData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: ['adsData'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/ads');
            return res.json();
        }
    });

    return [adsData, loading, refetch];
};

export default useAds;