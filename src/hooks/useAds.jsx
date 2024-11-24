import { useQuery } from "@tanstack/react-query";

const useAds = () => {
    const { data: adsData = {}, isLoading: loading } = useQuery({
        queryKey: ['adsData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/ads');
            return res.json();
        }
    });

    return [adsData, loading];
};

export default useAds;