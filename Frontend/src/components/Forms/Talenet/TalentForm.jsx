import React from 'react';
import { useForm } from 'react-hook-form';
import databaseService from '../../../services/database.services';
import { Button, Input, FileUploader } from '../../';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEditableUserTalent } from '../../../slices/dashboard/dashboardSlice';

function TalentForm({ talent, setAdd }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      heading: talent?.heading || '',
      description: talent?.description || '',
      image: null,
    },
  });

  const navigate = useNavigate();

  const cloudImages = talent?.images || [];
  const submit = async (data) => {
    if (isAdmin && userId) {
      if (talent) {
        const response = await databaseService
          .updateTalent(data, talent?._id, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserTalent(null));
          navigate(`/dashboard/user/${userId}`);
        }
      } else {
        const response = await databaseService
          .addTalent(data, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserTalent(null));
          navigate(`/dashboard/user/${userId}`);
          setAdd(false);
        }
      }
    } else {
      if (talent) {
        const response = await databaseService
          .updateTalent(data, talent?._id)
          .then((response) => response.data);
        if (response) {
          navigate(`/talent/${response._id}`);
        }
      } else {
        const response = await databaseService.addTalent(data).then((response) => response.data);
        if (response) navigate(`/talent/${response._id}`);
      }
    }
  };

  const handleCancel = () => {
    if (isAdmin && userId) {
      dispatch(setEditableUserTalent(null));
      navigate(`/dashboard/user/${userId}`);
      setAdd(false);
      return;
    } else {
      navigate(`/talent`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="Heading: "
          placeholder="Enter talent "
          {...register('heading', { required: true })}
          className="w-full"
        />
        <Input
          label="Description: "
          placeholder="Describe talent "
          {...register('description', { required: true })}
          className="w-full"
        />
        {cloudImages &&
          cloudImages.length > 0 &&
          cloudImages.map((img, index) => (
            <div key={index} className="my-2">
              {img.includes('image') !== -1 ? (
                <img src={img} className="preview-image w-full h-auto" />
              ) : (
                <video controls className="preview-video w-full h-auto">
                  <source src={img} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}

        <FileUploader
          register={register}
          name="image"
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
          className="w-full"
        />

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {talent ? 'Update' : 'Add'}
          </Button>
          <Button
            type="button"
            onClick={() => handleCancel()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TalentForm;
