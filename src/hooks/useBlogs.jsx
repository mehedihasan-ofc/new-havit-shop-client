import { useQuery } from '@tanstack/react-query';

const useBlogs = () => {
    
    const { data: blogs = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://havit-shop.onrender.com/blogs');
            return res.json();
        }
    });

    return [blogs, loading, refetch];
};

export default useBlogs;