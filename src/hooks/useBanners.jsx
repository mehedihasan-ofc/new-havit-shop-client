import { useQuery } from "@tanstack/react-query";

const useBanners = () => {
    const { data: banners = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/banners');
            return res.json();
        }
    });

    return [banners, loading, refetch];
};

export default useBanners;