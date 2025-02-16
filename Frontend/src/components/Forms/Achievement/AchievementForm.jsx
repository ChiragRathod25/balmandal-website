import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, FileUploader } from '../../index';
import databaseService from '../../../services/database.services';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserAchievement } from '../../../slices/dashboard/dashboardSlice';

function AchievementForm({ achievement, setAdd }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: achievement?.title || '',
      description: achievement?.description || '',
      image: '',
      cloudImages: achievement?.images || '',
    },
  });
  const cloudImages = achievement?.images;

  const navigate = useNavigate();

  const submit = async (data) => {
    if (isAdmin && userId) {
      if (achievement) {
        const response = await databaseService
          .updateAchivement(data, achievement?._id, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserAchievement(null));
          navigate(`/dashboard/user/${userId}`);
        }
      } else {
        const response = await databaseService
          .addAchievement(data, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserAchievement(null));
          setAdd(false);
          navigate(`/dashboard/user/${userId}`);
        }
      }
    } else {
      if (achievement) {
        const response = await databaseService
          .updateAchivement(data, achievement?._id)
          .then((response) => response.data);
        if (response) {
          console.log('here');
          
          navigate(`/achievement/${response._id}`);
        }
      } else {
        const response = await databaseService
          .addAchievement(data)
          .then((response) => response.data);
        if (response) navigate(`/achievement/${response._id}`);
      }
    }
  };

  const handleCancel = () => {
    if (isAdmin && userId) {
      dispatch(setEditableUserAchievement(null));
      if (setAdd) setAdd(false);
      navigate(`/dashboard/user/${userId}`);
      return;
    }
    navigate('/achievement');
  };

  return (
    // <div className="max-w-2xl mx-auto p-2">
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input
        type="text"
        label="Title: "
        placeholder="Achievement Title e.g. 'All India skating first rank'"
        {...register('title', { required: true })}
        className="w-full"
      />
      <Input
        type="text"
        label="Description: "
        placeholder="Description about achievement"
        {...register('description')}
        className="w-full"
      />
      {cloudImages &&
        cloudImages.length > 0 &&
        cloudImages.map((img, index) => {
          return img.includes('image') !== -1 ? (
            <img key={index} src={img} className="preview-image w-full h-auto my-2" />
          ) : (
            <video key={index} controls className="preview-video w-full h-auto my-2">
              <source src={img} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        })}

      <FileUploader
        accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
        register={register}
        name="image"
        watch={watch}
        className="w-full"
      />

      <div className="flex space-x-4 justify-center items-center px-12"> 
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {achievement ? 'Update' : 'Add'}
        </Button>

        <Button 
        type="button"
        onClick={() => handleCancel()} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </Button>
      </div>
    </form>
    // </div>
  );
}

export default AchievementForm;
