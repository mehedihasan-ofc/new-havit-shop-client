import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
    const { data: categories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            return res.json();
        }
    });

    return [categories, loading, refetch];
};

export default useCategories;