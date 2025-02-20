import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import { Input, Button, FileUploader, Select } from '../../index';
function NotificationForm() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const submit = async (data) => {
    if (!confirm(`Are you sure want to create notification ?`)) {
      return;
    }
    await databaseService
      .createNotification(data)
      .then((response) => response.data)
      .then((response) => navigate(`/notification/confirm/${response._id}`));
  };

  const handleCancel = () => {
    navigate('/notification');
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          placeholder="Enter Notification Title"
          {...register('title', { required: true })}
          label="Title"
        />
        <Input
          type="textarea"
          placeholder="Enter Notification Message"
          {...register('message', { required: true })}
          label="Message"
        />
        <Input
          type="radio"
          label="true"
          name="isBroadcast"
          {...register('isBroadcast', { required: true })}
        />
        <Input
          type="radio"
          label="false"
          name="isBroadcast"
          {...register('isBroadcast', { required: true })}
        />
        <Select
          options={['all', 'admin', 'individual']}
          label="Target group"
          {...register('targetGroup')}
        />

        {/* // TODO : implement created for  */}
        <Input
          type="text"
          placeholder="Enter Link"
          {...register('link', { required: true })}
          label="link"
        />
        <FileUploader
          name="poster"
          register={register}
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
        />
        <Button type="submit">Create</Button>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </>
  );
}

export default NotificationForm;
