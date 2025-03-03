import React from 'react';
import { Input, Button, Select } from '../../../index';
import databaseService from '../../../../services/database.services';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function UnregisteredAttendanceForm({ UnregisteredAttendance }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: UnregisteredAttendance?.fullName || '',
      mobile: UnregisteredAttendance?.mobile || '',
      email: UnregisteredAttendance?.email || '',
      remark: UnregisteredAttendance?.remark || '',
      status: UnregisteredAttendance?.status || '',
    },
  });
  const { eventId } = useParams();
  const navigate = useNavigate();
  const submit = async (data) => {
    console.log(data);
    if(UnregisteredAttendance){
        try {
          const response = await databaseService.updateUnregisteredAttendance(data, UnregisteredAttendance._id);
          if (response) {
            console.log('Unregistered Attendance updated successfully');
            navigate(`/event/${UnregisteredAttendance.eventId}`);
          }
        } catch (error) {
          console.log('Error in updating unregistered attendance', error);
          
        }
    }else{

      try {
        const response = await databaseService.addUnregisteredAttendance(data, eventId);
        
        if (response) {
          console.log('Unregistered Attendance added successfully');
          navigate(`/event/${eventId}`);
        }
      } catch (error) {
        console.log('Error in adding unregistered attendance', error);
      }
    }
    };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter Full Name"
          {...register('fullName', { required: true })}
        />
        <Input
          label="Mobile"
          type="text"
          placeholder="Enter Mobile Number"
          name="mobile"
          {...register('mobile')}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          {...register('email')}
        />
        <Input
          label="Remark"
          type="text"
          name="remark"
          placeholder="Enter Remark"
          {...register('remark')}
        />
        <Select
          label="Status"
          type="text"
          name="status"
          options={['present', 'absent']}
          placeholder="Enter Status"
          {...register('status', { required: true })}
        />
        <Button type="submit">Submit</Button>
        <Button onClick={() => navigate(`/event/${eventId || UnregisteredAttendance.eventId}`)}>Back</Button>
      </form>
    </>
  );
}

export default UnregisteredAttendanceForm;
