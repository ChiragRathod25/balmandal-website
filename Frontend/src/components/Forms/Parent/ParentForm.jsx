import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, Button } from "../../";
import databaseService from "../../../services/database.services";
import { useNavigate } from "react-router-dom";

function ParentForm({ parent }) {
    console.log("Parent Form",parent);
    
  const { register, handleSubmit } = useForm({
    defaultValues: {
      role: parent?.role || "",
      fullName: parent?.fullName || "",
      email: parent?.email || "",
      mobileNumber: parent?.mobileNumber || "",
      occupation: parent?.occupation || "",
    },
  });
 
  const navigate=useNavigate()
  const submit = async (data) => {
    if(parent){
      const response=await databaseService.updateParentDetails(data,parent?._id).then((response)=>response.data);
      if(response)
        console.log(response)
    }else{
      const response=await databaseService.addParentDetails(data).then((response)=>response.data);
      if(response)
        navigate(`/parent/${response._id}`)
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
          {...register("mobileNumber", { required: true })}
        />

        <Input
          label="occupation: "
          placeholder="Enter Parent occupation"
          {...register("occupation", { required: true })}
        />

        <Button type="submit">{parent ? "Update" : "Add"}</Button>
        <Button onClick={()=>navigate(`/parent/`)}>Cancel</Button>
      </form>
    </>
  );
}

export default ParentForm;
