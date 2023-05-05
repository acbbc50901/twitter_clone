import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './posts/PostItem'

interface Props {
  userId?: string
}

const PostFeed: React.FC<Props> = ({userId}) => {
  const {data: posts = []} = usePosts(userId);
  return (
    <>
      {
        posts.map((post: Record<string, any>, key: any) => 
          <PostItem userId={userId as string} key={key} data={post} />
        )
      }
    </>
  )
}

export default PostFeed