import { useQuery } from "@tanstack/react-query";

const useAds = () => {
    const { data: adsData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: ['adsData'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/ads');
            return res.json();
        }
    });

    return [adsData, loading, refetch];
};

export default useAds;