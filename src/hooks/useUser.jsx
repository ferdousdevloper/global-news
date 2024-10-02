import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';

const useUser = () => {
    const { user } = useAuth();

    const { data: isBlock, isPending: isBlockLoading } = useQuery({
        queryKey: [user?.email, 'isBlock'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3001/users/block/${user?.email}`);
            console.log(res.data);
            return res.data?.block;
        }
    });

    return [isBlock, isBlockLoading];
};

export default useUser;
