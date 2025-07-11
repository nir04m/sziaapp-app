import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getFriendRequests, acceptFriendRequest } from '../lib/api';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const {data:friendRequests, isLoading} = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
  })
  const {mutate:acceptRequestMutation, isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['friendRequests']});
      queryClient.invalidateQueries({queryKey: ['friends']});
    }

  })
  return (
    <div>
      NotificationsPage
    </div>
  )
}

export default NotificationsPage
