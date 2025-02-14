import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select, Button } from '../../';
import databaseService from '../../../services/database.services';
import { useNavigate, useParams } from 'react-router-dom';
import { setEditableUserParent } from '../../../slices/dashboard/dashboardSlice';
import { useSelector, useDispatch } from 'react-redux';

function ParentForm({ parent, setAdd }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: parent?.role || '',
      fullName: parent?.fullName || '',
      email: parent?.email || '',
      mobileNumber: parent?.mobileNumber || '',
      occupation: parent?.occupation || '',
    },
  });

  const navigate = useNavigate();
  const submit = async (data) => {
    if (isAdmin && userId) {
      if (parent) {
        const response = await databaseService
          .updateParentDetails(data, parent?._id, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserParent(null));
          navigate(`/dashboard/user/${userId}`);
        }
      } else {
        const response = await databaseService
          .addParentDetails(data, userId)
          .then((response) => response.data);
        if (response) {
          dispatch(setEditableUserParent(null));
          setAdd(false);
          navigate(`/dashboard/user/${userId}`);
        }
      }
    } else {
      if (parent) {
        const response = await databaseService
          .updateParentDetails(data, parent?._id)
          .then((response) => response.data);
        if (response) console.log(response);
      } else {
        const response = await databaseService
          .addParentDetails(data)
          .then((response) => response.data);
        if (response) navigate(`/parent/${response._id}`);
      }
    }
  };

  const handleCancel = () => {
    if (isAdmin && userId) {
      dispatch(setEditableUserParent(null));
      setAdd(false);
      return;
    }
    navigate(`/parent`);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <Select
        label="Role"
        options={['Father', 'Mother']}
        {...register('role', { required: true })}
        className="mb-4"
      />
      <Input
        label="Full name: "
        placeholder="Enter Parent Fullname"
        {...register('fullName', { required: true })}
        className="mb-4"
      />
      <Input
        type="email"
        label="Email: "
        placeholder="Enter Parent Email"
        {...register('email', { required: true })}
        className="mb-4"
      />
      <Input
        type="tel"
        label="Mobile: "
        placeholder="Enter Parent Mobile Number"
        {...register('mobileNumber', { required: true })}
        className="mb-4"
      />
      <Input
        label="Occupation: "
        placeholder="Enter Parent Occupation"
        {...register('occupation', { required: true })}
        className="mb-4"
      />
      <div className="flex justify-between">
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {parent ? 'Update' : 'Add'}
        </Button>
        <Button
          onClick={() => handleCancel()}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ParentForm;
