import { useQuery } from "@tanstack/react-query";

const useContactInfoData = () => {
    const { data: contactInfoData = {}, isLoading, refetch } = useQuery({
        queryKey: ["contactInfoData"],
        queryFn: async () => {
            const res = await fetch("https://havit-shop.onrender.com/contact-info");
            return res.json();
        },
    });

    return [contactInfoData, isLoading, refetch];
};

export default useContactInfoData;