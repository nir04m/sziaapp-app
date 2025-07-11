import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../lib/api'

const useLogout = () => {
  const queryClient = useQueryClient();
  const {mutate, error} = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['authUser']}),
  });

  return {error:error, logoutMutation: mutate}

}

export default useLogout