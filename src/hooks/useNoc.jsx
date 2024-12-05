import { useQuery } from "@tanstack/react-query";

const useNoc = () => {
    const { data: noc = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['noc'],
        queryFn: async () => {
            const res = await fetch('https://havit-shop.onrender.com/noc');
            return res.json();
        }
    });

    return [noc, loading, refetch];
};

export default useNoc;