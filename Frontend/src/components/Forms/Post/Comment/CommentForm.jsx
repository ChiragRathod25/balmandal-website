import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../../..';
import databaseService from '../../../../services/database.services';
import { useParams } from 'react-router-dom';

function CommentForm({ comment, onCommentAdded }) {
  const { postId } = useParams();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { content: comment?.content || '' },
  });

  const submit = async (data) => {
    const response = await databaseService.addPostComment(data, postId);
    if (response) {
      onCommentAdded(response.data);
      reset();
    }
  };

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(submit)} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Write a comment..."
          {...register('content', { required: true })}
        />
        <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Comment
        </Button>
      </form>
    </div>
  );
}

export default CommentForm;
