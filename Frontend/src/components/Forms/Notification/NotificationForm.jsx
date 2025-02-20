import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import { Input, Button, FileUploader, Select } from '../../index';
import { socket } from '../../../App';
function NotificationForm() {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const submit = async (data) => {
    if (!confirm(`Are you sure want to create notification ?`)) {
      return;
    }
    console.log('Submitting form data', data);
    await databaseService
      .createNotification(data)
      .then((response) => response.data)
      .then((response) => {
        socket.emit('notify',response)
        return response;})
      .then((response)=>navigate(`/notification/${response._id}`))
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
        <Select
        label="Notification Type"
          options={['info','warning','error','success']}
          {...register('notificationType',{required:true})}

        />
        <div className="flex flex-row gap-5 w-full max-w-md mx-auto p-10">
          <label htmlFor="yes">True</label>
          <input
            type="radio"
            label="true"
            id="yes"
            value={true}
            name="isBroadcast"
            {...register('isBroadcast', { required: true,value:true })}
          />
          <label htmlFor="no">False</label>
          <input
            type="radio"
            label="false"
            value={false}
            name="isBroadcast"
            id="no"
            {...register('isBroadcast', { required: true,value:false })}
          />
        </div>

        <Select
          options={['all', 'admin', 'individual']}
          label="Target group"
          {...register('targetGroup')}
        />

        {/* // TODO : implement created for  */}
        <Input type="text" placeholder="Enter Link" {...register('link')} label="link" />
        <FileUploader
          name="poster"
          register={register}
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
        />


        {/* TODO : Notification Preview Card */}
        <Button type="submit">Create</Button>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </>
  );
}

export default NotificationForm;
