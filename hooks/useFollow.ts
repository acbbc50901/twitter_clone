import React, { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import useCurrentUser from './useCurrentUser'
import useUser from './useUser'
import useLoginModal from './useLoginModal'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { params: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
      toast.success('Success');
    } catch(error) {
      console.log(error);
      toast.error('Somethig error')
    } },[currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal])

  return { toggleFollow, isFollowing }
}

export default useFollow