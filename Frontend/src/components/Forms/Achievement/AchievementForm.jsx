import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, FileUploader } from '../../index';
import databaseService from '../../../services/database.services';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserAchievement } from '../../../slices/dashboard/dashboardSlice';
import CloudeFilesManager from '../CloudeFilesManager';

function AchievementForm({ achievement, setAdd }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.dashboard.editableUser?._id);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: achievement?.title || '',
      description: achievement?.description || '',
      image: null,
    },
  });
  const navigate = useNavigate();

  const [cloudFiles, setCloudFiles] = React.useState(achievement?.images || []);

  useEffect(() => {
    console.log('Achievement file manager', achievement);
    console.log('Rerendering for cloudFiles file manager', cloudFiles);
    setFinalCloudFiles(cloudFiles);
  }, [cloudFiles]);

  let FinalCloudFiles = cloudFiles;
  const submit = async (data) => {
    data['cloudFiles'] = JSON.stringify(FinalCloudFiles);
    console.log('submitting form data', data);

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

  const setFinalCloudFiles = (nf) => {
    FinalCloudFiles = nf;
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
        type="textarea"
        label="Description:"
        placeholder="Description about achievement"
        {...register('description')}
        className="w-full"
        rows={5}
      />

      {cloudFiles && cloudFiles.length > 0 && (
        <CloudeFilesManager cloudFiles={cloudFiles} handleDeleteFile={handleDeleteFile} />
      )}

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
          onClick={() => handleCancel()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </Button>
      </div>
    </form>
    // </div>
  );
}

export default AchievementForm;
