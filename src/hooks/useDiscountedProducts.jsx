import { useQuery } from "@tanstack/react-query";

const useDiscountedProducts = () => {
    
    const { data: discountedProducts = [], isLoading } = useQuery({
        queryKey: ['discountedProducts'],
        queryFn: async () => {
            const res = await fetch('https://havit-shop.onrender.com/products/discounted');
            return res.json();
        }
    });
    
    return [discountedProducts, isLoading];
};

export default useDiscountedProducts;