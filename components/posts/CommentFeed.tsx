
import React, { useCallback } from 'react'
import CommentItem from './CommentItem'

interface Props {
  comments?: Record<string, any>
}

const CommentFeed: React.FC<Props> = ({comments = []}) => {

  return (
    <>
      {
        comments.map((comment: Record<string, any>, key: any) => 
          <CommentItem key={key} data={comment}/>
        )
      }
    </>
  )
}

export default CommentFeed