import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, FileUploader } from '../../index';
import databaseService from '../../../services/database.services';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserAchievement } from '../../../slices/dashboard/dashboardSlice';

function AchievementForm({ achievement,setAdd }) {
  console.log('AchievementForm Component', achievement);
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const {userId}=useParams();

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
    //if you are an admin and editing user achievement
    if (isAdmin && userId) {
      // if achievement is present then update it
      if (achievement) {
        console.log('Updating Achievement', data);
        const response = await databaseService
          .updateAchivement(data, achievement?._id,userId)
        .then((response) => response.data).catch((error)=>console.log("error while updating achievement",error));
        if (response) {
          console.log('Updated', response);
          dispatch(setEditableUserAchievement(null));
          navigate(`/dashboard/user/${userId}`);
        }
      } else {
        
        const response = await databaseService
          .addAchievement(data,userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserAchievement(null));
          navigate(`/dashboard/user/${userId}`);
          setAdd(false);
        }
      }
    }
    //if you are a user and adding your own achievement
    else {
      if (achievement) {
        const response = await databaseService
          .updateAchivement(data, achievement?._id)
          .then((response) => response.data);
        if (response) {
          console.log('Updated', response);
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

  const handleCancle = () => {
    if (isAdmin) {
      dispatch(setEditableUserAchievement(null));
      setAdd(false);
      return;
    }
    navigate('/achievement');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
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

        <Button
          type="submit"
          bgColor={achievement ? 'bg-green-400' : 'bg-blue-500'}
          className="w-full py-2 text-white rounded"
        >
          {achievement ? 'Update' : 'Add'}
        </Button>

        <Button
          onClick={() => handleCancle()}
          className="w-full py-2 text-white bg-gray-500 rounded"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default AchievementForm;
