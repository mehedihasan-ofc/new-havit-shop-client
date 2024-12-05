import { useQuery } from "@tanstack/react-query";

const useBanners = () => {
    const { data: banners = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await fetch('https://havit-shop.onrender.com/banners');
            return res.json();
        }
    });

    return [banners, loading, refetch];
};

export default useBanners;