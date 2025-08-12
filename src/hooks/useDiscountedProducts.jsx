import { useQuery } from "@tanstack/react-query";

const useDiscountedProducts = (page = 1, limit = 12) => {
    const { data = {}, isLoading } = useQuery({
        queryKey: ['discountedProducts', page, limit],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/discounted?page=${page}&limit=${limit}`);
            if (!res.ok) {
                throw new Error('Failed to fetch discounted products');
            }
            return res.json();
        }
    });

    return [data, isLoading];
};

export default useDiscountedProducts;