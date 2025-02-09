import React from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button } from "../../";
import databaseService from "../../../services/database.services";

function ParentForm({ parent }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: parent?.role || "",
      fullName: parent?.fullName || "",
      email: parent?.email || "",
      mobileNumber: parent?.mobileNumber || "",
      occupation: parent?.occupation || "",
    },
  });
  const submit = async (data) => {
    if(parent){
      await databaseService.updateParentDetails(data);
    }else{
      await databaseService.addParentDetails(data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Select
        label="select"
        options={["Father","Mother"]}
        {...register('role',{required:true})}
        />
        <Input
          label="Full name: "
          placeholder="Enter Parent Fullname"
          {...register("fullName", { required: true })}
        />
        <Input
          type="email"
          label="Email: "
          placeholder="Enter Parent Email"
          {...register("email", { required: true })}
        />
        <Input
          type="tel"
          label="Mobile: "
          placeholder="Enter Parent Mobile Number"
          {...register("mobile", { required: true })}
        />

        <Input
          label="occupation: "
          placeholder="Enter Parent occupation"
          {...register("occupation", { required: true })}
        />

        <Button type="submit">{parent ? "Update" : "Add"}</Button>
      </form>
    </>
  );
}

export default ParentForm;
