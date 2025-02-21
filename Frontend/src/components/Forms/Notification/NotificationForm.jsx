import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import { Input, Button, FileUploader, Select } from '../../index';
import config from '../../../conf/config';


function NotificationForm() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    if (!confirm('Are you sure you want to create notification?')) {
      return;
    }
    if(!data.link){
      if(!confirm('link is not provided, do you want to continue?\n Base link will be used for notification'))
        return;
      data.link =config.baseUrl;
    }
    console.log('Submitting form data', data);
    await databaseService
      .createNotification(data)
      .then((response) => response.data)
      .then((response) => {
        // socket.emit('notify', response); // socket io real time notification
        return response;
      })
      .then((response) => navigate(`/notification/${response._id}`));
  };

  const handleCancel = () => {
    navigate('/notification');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="Title"
          type="text"
          placeholder="Enter Notification Title"
          {...register('title', { required: true })}
          className="w-full"
        />

        <Input
          label="Message"
          type="textarea"
          placeholder="Enter Notification Message"
          {...register('message', { required: true })}
          className="w-full"
        />

        <Select
          label="Notification Type"
          options={['info', 'warning', 'error', 'success']}
          {...register('notificationType', { required: true })}
        />

        <Select
          label="Target Group"
          options={['All', 'Admin', 'Individual','Custom']}
          {...register('targetGroup')}
        />

        <Input
          label="Link"
          type="text"
          placeholder="Enter Link"
          {...register('link',{ required: true }) }
          className="w-full"
        />

        <FileUploader
          name="poster"
          register={register}
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
          className="w-full"
        />

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
          </Button>
          <Button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NotificationForm;
