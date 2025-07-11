import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserFriends, getRecommendedUsers, getOutgoingFriendReqs, sendFriendRequest } from '../lib/api'

const useOutgoingReq = () => {
  const queryClient = useQueryClient();

  const {data:friends=[], isLoading:loadingFriends} = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  const {data:recommendedUsers=[], isLoading:loadingUsers} = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: getRecommendedUsers,
  });

  const {data:outgoingFriendReqs} = useQuery({
    queryKey: ['outgoingFriendReqs'],
    queryFn: getOutgoingFriendReqs,
  });

  const {mutate:sendRequestMutation, isPending:sendRequestisPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['outgoingFriendReqs']}),
  })

  return {sendRequestMutation, outgoingFriendReqs, recommendedUsers, loadingUsers, friends, loadingFriends, sendRequestisPending}
}

export default useOutgoingReq
