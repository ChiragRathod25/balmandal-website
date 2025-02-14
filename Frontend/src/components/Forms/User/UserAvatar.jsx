import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../../';
import databaseService from '../../../services/database.services';
import { useSelector } from 'react-redux';
function UserAvatar({ avatar }) {
  console.log('Initial User avatar:', avatar);
  const userId=useSelector((state)=>state.dashboard.editableUser?._id)
  console.log('userId:', userId);

  const { register, handleSubmit, reset, watch } = useForm();

  const [isEdititng, setEditing] = useState(false);
  

  const [avatarUrl, setAvatarUrl] = useState(
    avatar
      ? avatar
      : `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-m
              ale-avatar-icon-png.png`
  );

  const avatarWatch = watch('avatar');
  useEffect(() => {
    console.log('avatar:', avatar);
    if (avatar) setAvatarUrl(avatar);
  }, [avatar]);

  useEffect(() => {
    console.log('avatarWatch:', avatarWatch);
    if (!avatarWatch || avatarWatch?.length === 0) return;
    if (avatarWatch) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(avatarWatch[0]);
    }
  }, [avatarWatch]);
  useEffect(() => {}, [isEdititng]);

  const handleCancel = () => {
    reset();
    setEditing(false);
    if(avatar)
    setAvatarUrl(avatar);
  };
  const submit = async (data) => {
    console.log('submitting avatar');
    databaseService
      .updateAvatar(data,userId)
      .then((response) => response.data)
      .then((data) => {
        console.log('avatar updated', data);
        reset();
        setEditing(false);
        setAvatarUrl(data.avatar);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <img src={avatarUrl} alt="avatar" className="w-32 h-32 rounded-full" />

      {!isEdititng && <Button onClick={() => setEditing(true)}>Change</Button>}
      {isEdititng && (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center space-y-4 p-4">
          <Input type="file" {...register('avatar', { required: true })} />
            <div className="flex space-x-4">
        
            <Button type="submit">Upload</Button>
            <Button type="button" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserAvatar;
