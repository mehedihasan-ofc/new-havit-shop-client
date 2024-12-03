import { useQuery } from "@tanstack/react-query";

const useLogo = () => {
    const { data: logoData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: ['logoData'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/logo');
            return res.json();
        }
    });

    return [logoData, loading, refetch];
};

export default useLogo;