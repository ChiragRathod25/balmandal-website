import React from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../../services/database.services";
import { Button, Input, FileUploader } from "../../";

function TalentForm({ talent }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      heading: talent?.heading || "",
      description: talent?.description || "",
      image: talent?.images || "",
    },
  });
  const submit = async () => {
    if (talent) {
      await databaseService.updateTalent(data);
    } else {
      await databaseService.addTalent(data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Heading: "
          placeholder="Enter talent "
          {...register("heading", { required: true })}
        />
        <Input
          label="Description: "
          placeholder="Describe talent "
          {...register("description", { required: true })}
        />
        <FileUploader
          register={register}
          name="image"
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
        />

        <Button type="submit">{talent ? "Update" : "Add"}</Button>
      </form>
    </>
  );
}

export default TalentForm;
