import { useQuery } from "@tanstack/react-query";

const useWelcome = () => {
    const { data: welcomeData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: ['welcomeData'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/welcome');
            return res.json();
        }
    });

    return [welcomeData, loading, refetch];
};

export default useWelcome;