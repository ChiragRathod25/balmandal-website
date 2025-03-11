import React from 'react'

function CommentCard({comment}) {
  return (
    <div>
        {comment?.content}   by: {comment?.createdBy}
    </div>
  )
}

export default CommentCard