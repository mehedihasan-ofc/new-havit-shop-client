import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
   
    const { data: products = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/products');
            return res.json();
        }
    });

    return [products, loading, refetch];
};

export default useProducts;