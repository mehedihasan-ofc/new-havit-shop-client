import { useQuery } from "@tanstack/react-query";

const useWelcome = () => {
    const { data: welcomeData = {}, isLoading: isLoadingWelcome, refetch } = useQuery({
        queryKey: ['welcomeData'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/welcome');
            return res.json();
        }
    });

    return [welcomeData, isLoadingWelcome, refetch];
};

export default useWelcome;