import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../../..';
import databaseService from '../../../../services/database.services';
import { useParams } from 'react-router-dom';

function CommentForm({ comment }) {
  const { postId } = useParams();
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      content: comment?.content || '',
    },
  });
  const submit = async (data) => {
    console.log('Submitting Comment Form', data);
    if (comment) {
      const response = await databaseService.updatePostComment(data, comment._id);
      if (response) {
        console.log('Comment updated successfully');
      }
    } else {
      const response = await databaseService.addPostComment(data, postId);
      if (response) {
        console.log('Comment added successfully');
      }
    }
    setValue({ content: '' });
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit(submit)} className="flex flex-row items-center w-full">
          <Input type="text" label="Comment" {...register('content', { required: true })} />

          <Button type="submit">Comment</Button>
        </form>
      </div>
    </>
  );
}

export default CommentForm;
