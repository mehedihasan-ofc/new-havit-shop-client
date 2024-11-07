import { useQuery } from "@tanstack/react-query";

const useSubcategories = () => {
    const { data: subcategories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['subcategories'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/subcategories');
            return res.json();
        }
    });

    return [subcategories, loading, refetch];
};

export default useSubcategories;