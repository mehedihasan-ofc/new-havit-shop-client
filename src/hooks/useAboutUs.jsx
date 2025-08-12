import { useQuery } from "@tanstack/react-query";

const useAboutUs = () => {
    const { data: aboutUsData = {}, isLoading, refetch } = useQuery({
        queryKey: ['aboutUsData'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/about-us');
            return res.json();
        }
    });

    return [aboutUsData, isLoading, refetch];
};

export default useAboutUs;