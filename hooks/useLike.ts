import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser'
import useLoginModal from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const useLike = ({ userId, postId }:{userId?: string, postId: string}) => {
  const { data: currentUser } = useCurrentUser();
  const { data:fetchedPost ,mutate: mutateFetchedPost } = usePost(postId);
  const {mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser])

  const toggleLike = useCallback( async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        console.log('hi')
        request = () => axios.delete('/api/like', { params: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }
      request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch(error) {
      toast.error('Something error')
    }
  }, [currentUser, loginModal, mutateFetchedPost, mutateFetchedPosts, postId, hasLiked])

  return {hasLiked, toggleLike}

}

export default useLike