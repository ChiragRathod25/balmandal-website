import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, FileUploader } from "../../index";
import databaseService from "../../../services/database.services";
import { useNavigate } from "react-router-dom";

function AchievementForm({ achievement }) {
  console.log("AchievementForm Component", achievement);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: achievement?.title || "",
      description: achievement?.description || "",
      image: "",
      cloudImages: achievement?.images || "",
    },
  });
  const cloudImages = achievement?.images;

  const navigate = useNavigate();

  const submit = async (data) => {
    if (achievement) {
      const response = await databaseService
        .updateAchivement(data, achievement?._id)
        .then((response) => response.data);
      if (response) {
        console.log("Updated", response);
        navigate(`/achievement/${response._id}`);
      }
    } else {
      const response = await databaseService
        .addAchievement(data)
        .then((response) => response.data);
      if (response) navigate(`/achievement/${response._id}`);
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
        {
          cloudImages &&
          cloudImages.length > 0 &&
          cloudImages.map((img) => {
            return img.includes("image") !== -1 ? (
              <img src={img} className="preview-image" />
            ) : (
              <video controls className="preview-video">
                <source src={img} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          })}

        
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
        
         <Button onClick={()=>navigate(`/achievement/`)}>Cancel</Button>
      </form>
    </>
  );
}

export default AchievementForm;
