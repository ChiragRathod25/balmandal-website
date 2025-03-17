import React from 'react';
import { UnregisteredAttendanceForm } from '../../../components';

function AddUnregisteredAttendance() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
       <h2 className="text-2xl font-bold text-center mb-4">
        Add Unregistered Attendance
      </h2>
     
      <UnregisteredAttendanceForm />
    </div>
  );
}

export default AddUnregisteredAttendance;
