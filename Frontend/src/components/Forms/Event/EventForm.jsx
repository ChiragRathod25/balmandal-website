import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, FileUploader, CloudFilesManager, Select } from '../../index';
import databaseService from '../../../services/database.services';
import { useNavigate } from 'react-router-dom';

function EventForm({ event }) {

  if(event)
     console.log('calling for Edit form', event);
  
  const { register, handleSubmit, watch,setValue} = useForm({
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startAt: event?.startAt || '',
      endAt: event?.endAt || '',
      venue: event?.venue || '',
      media: null,
    },
  });

  
  useEffect(()=>{
    if(event){
      const newStartAt= new Date(event?.startAt).toISOString().split('T').join(' ').substr(0,19) || '';
      const newEndAt= new Date(event?.endAt).toISOString().split('T').join(' ').substr(0,19) || '';
      console.log('newStartAt',newStartAt);
      console.log('newEndAt',newEndAt);
      setValue('startAt', newStartAt);
      setValue('endAt', newEndAt);
    }

  },[event]);
  // setValue('startAt', new Date(event?.startAt).toISOString().split('T').join(' ').substr(0,19) || '');
  // setValue('endAt', new Date(event?.endAt).toISOString().split('T').join(' ').substr(0,19) || '');
  const startAd=watch('startAt');
  const endAd=watch('endAt');

  useEffect(() => {
    console.log('startAt',startAd);
    console.log('endAt',endAd);
    if(startAd.length>0 && endAd.length>0){
    if(startAd && endAd){
      if(startAd>endAd){
        alert('Start Date should be less than End Date');
        setValue('endAt', '');
      }
    }
  }}
  ,[startAd,endAd]);
  const navigate = useNavigate();

  const [cloudFiles, setCloudFiles] = React.useState(event?.media || []);

  let FinalCloudFiles = cloudFiles;
  const submit = async (data) => {
    data['cloudMediaFiles'] = JSON.stringify(FinalCloudFiles);
    console.log('Submitting form data', data);
    if (event) {
      const response = await databaseService
        .updateEvent(data, event._id)
        .then((response) => response.data);
      if (response) {
        navigate('/event');
      }
    } else {
      const response = await databaseService.addEvent(data).then((response) => response.data);
      if (response) {
        navigate('/event');
      }
    }
  };

  const handleCancel = () => {
    navigate('/event');
  };
  const setFinalCloudFiles = (files) => {
    FinalCloudFiles = files;
  };
  const handleDeleteFile = async (index) => {
    const url = cloudFiles[index];
    console.log('url', url);
    await databaseService.deleteFile({ deleteUrl: url }).then(() => {
      setCloudFiles((prev) => prev.filter((img, i) => i !== index));
    });
    const newFiles = cloudFiles.filter((img, i) => i !== index);
    console.log('newFiles', newFiles);

    // setCloudFiles((prev)=>newFiles);
    setFinalCloudFiles(newFiles);
    handleSubmit(submit)();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submit)}>
          <Input
            label="Title"
            name="title"
            placeholder="Enter title"
            {...register('title', { required: true })}
          />

          <Input
            label="Description"
            name="description"
            placeholder="Enter description"
            {...register('description')}
            type="textarea"
          />
          <Input
            label="Venue"
            name="venue"
            placeholder="Enter venue"
            {...register('venue', { required: true })}
          />
          <Input
            type="datetime-local"
            label="Start Date"
            name="startAt"
            {...register('startAt', { required: true })}
          />

          <Input
            type="datetime-local"
            label="End Date"
            name="endAt"
            {...register('endAt', { required: true })}
          />

          {cloudFiles && cloudFiles.length > 0 && (
            <CloudFilesManager
              cloudFiles={cloudFiles}
              setCloudFiles={setFinalCloudFiles}
              handleDeleteFile={handleDeleteFile}
            />
          )}

          <FileUploader
            accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
            register={register}
            name="media"
            watch={watch}
            className="w-full"
          />
          <Button type="submit">{event ? 'Update' : 'Create'}</Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
