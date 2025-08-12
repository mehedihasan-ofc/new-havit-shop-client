import { useQuery } from "@tanstack/react-query";

const useSocialMedia = () => {
    const { data: socialMediaData = {}, isLoading, refetch } = useQuery({
        queryKey: ["socialMediaData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/social-media");
            return res.json();
        },
    });

    return [socialMediaData, isLoading, refetch];
};

export default useSocialMedia;