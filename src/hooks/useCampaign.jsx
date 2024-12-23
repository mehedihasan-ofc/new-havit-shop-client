import { useQuery } from "@tanstack/react-query";

const useCampaign = () => {
    const { data: campaignData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: ['campaignData'],
        queryFn: async () => {
            const res = await fetch('https://server.havitshopbd.com/campaign');
            return res.json();
        }
    });

    return [campaignData, loading, refetch];
};

export default useCampaign;