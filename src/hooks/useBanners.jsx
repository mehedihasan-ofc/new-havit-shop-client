import { useQuery } from "@tanstack/react-query";

const useBanners = () => {
    const { data: banners = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/banners');
            return res.json();
        }
    });

    return [banners, loading, refetch];
};

export default useBanners;