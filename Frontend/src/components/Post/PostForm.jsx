import React from 'react';
import { RTE, Input, Select, Button } from '../index';
import { useForm } from 'react-hook-form';
import databaseService from '../../services/database.services';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
  const { handleSubmit, register, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || '',
      status: post?.status || 'Draft',
      tags: post?.tags || '',
      isCommentEnable: post?.isCommentEnable || false,
    },
  });

  const navigate = useNavigate();
  const submit = async (data) => {
    console.log('submitting form data(Post): ', data);
    if (post) {
      const response = await databaseService
        .updatePost(data, post._id)
        .then((response) => response.data);
      console.log('Post Updated', response);
      if (response) {
        console.log('Navigating to post page', response);
        navigate('/post/' + response._id);
      }
    } else {
      const response = await databaseService.addPost(data).then((response) => response.data);
      console.log('Post Added', response);
      if (response) {
        console.log('Navigating to post page', response);
        navigate('/post/' + response._id);
      }
    }
  };
  return (
    <>
      <div>PostForm</div>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          name="title"
          label="Title: "
          {...register('title', { required: true })}
          placeholder="Enter Post Title"
          className="w-full"
        />
        <RTE
          name="content"
          label="Content: "
          control={control}
          defaultValue={getValues('content')}
        />
        <Input
          name="slug"
          label="Slug: "
          {...register('slug', { required: true })}
          placeholder="Enter Post Slug"
          className="w-full"
        />

        <Select
          name="status"
          label="Status: "
          {...register('status', { required: true })}
          className="w-full"
          options={['Draft', 'Published']}
        />
        <Input
          name="tags"
          label="Tags: "
          {...register('tags', { required: true })}
          placeholder="Enter Post Tags"
          className="w-full"
        />

        <Input
          type="checkbox"
          name="isCommentEnable"
          label="Enable Comments: "
          {...register('isCommentEnable')}
          className="w-full"
        />

        <Button type="submit">
          {post ? 'Update Post' : 'Add Post'}
        </Button>
      </form>
    </>
  );
}

export default PostForm;
