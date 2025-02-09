import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, FileUploader } from "../../index";
import databaseService from "../../../services/database.services";

function AchievementForm({ achievement }) {
  console.log("Component", achievement);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: achievement?.title || "",
      description: achievement?.description || "",
      image: achievement?.images || "",
    },
  });

  const submit = async (data) => {
    if (achievement) {
      await databaseService.updateAchivement(data);
    } else {
      await databaseService.addAchievement(data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          label="Title: "
          placeholder="Achievement Title e.g. 'All India skating first rank'"
          {...register("title", { required: true })}
        />
        <Input
          type="text"
          label="Description: "
          placeholder="Description about achievement"
          {...register("description")}
        />

        <FileUploader
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          register={register}
          name="image"
          watch={watch}
        />

        <Button
          type="submit"
          bgColor={achievement ? "bg-green-400" : undefined}
          className="w-full"
        >
          {achievement ? "Update" : "Add"}
        </Button>
      </form>
    </>
  );
}

export default AchievementForm;
