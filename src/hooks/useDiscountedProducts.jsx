import { useQuery } from "@tanstack/react-query";

const useDiscountedProducts = () => {
    
    const { data: discountedProducts = [], isLoading } = useQuery({
        queryKey: ['discountedProducts'],
        queryFn: async () => {
            const res = await fetch('https://new-havit-shop-server.vercel.app/products/discounted');
            return res.json();
        }
    });
    
    return [discountedProducts, isLoading];
};

export default useDiscountedProducts;