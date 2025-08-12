import { useQuery } from "@tanstack/react-query";

const useSubcategories = () => {
    const { data: subcategories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['subcategories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/subcategories');
            return res.json();
        }
    });

    return [subcategories, loading, refetch];
};

export default useSubcategories;