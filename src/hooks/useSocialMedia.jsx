import { useQuery } from "@tanstack/react-query";

const useSocialMedia = () => {
    const { data: socialMediaData = {}, isLoading, refetch } = useQuery({
        queryKey: ["socialMediaData"],
        queryFn: async () => {
            const res = await fetch("https://server.havitshopbd.com/social-media");
            return res.json();
        },
    });

    return [socialMediaData, isLoading, refetch];
};

export default useSocialMedia;