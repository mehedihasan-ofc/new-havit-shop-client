import { useQuery } from "@tanstack/react-query";

const usePopularProducts = (page = 1, limit = 12) => {
    const { data = {}, isLoading } = useQuery({
        queryKey: ['popularProducts', page, limit],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/popular?page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error('Failed to fetch popular products');
            return res.json();
        }
    });

    return [data, isLoading];
};

export default usePopularProducts;