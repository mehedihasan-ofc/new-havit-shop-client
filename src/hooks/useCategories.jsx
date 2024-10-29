import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
    const { data: categories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/categories');
            return res.json();
        }
    });

    return [categories, loading, refetch];
};

export default useCategories;