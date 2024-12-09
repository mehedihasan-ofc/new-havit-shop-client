import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
    const { data: categories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/categories');
            return res.json();
        }
    });

    return [categories, loading, refetch];
};

export default useCategories;