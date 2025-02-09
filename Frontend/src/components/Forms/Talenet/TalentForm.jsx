import React from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../../services/database.services";
import { Button, Input, FileUploader } from "../../";
import { useNavigate } from "react-router-dom";

function TalentForm({ talent }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      heading: talent?.heading || "",
      description: talent?.description || "",
      image: null,
    },
  });
  // console.log("TalentForm",talent)
  const navigate = useNavigate();
  const cloudImages = talent?.images || [];
  const submit = async (data) => {
    if (talent) {
      const response = await databaseService
        .updateTalent(data, talent?._id)
        .then((response) => response.data);
      if (response) {
        console.log("Updated", response);
        navigate(`/talent/${response._id}`);
      }
    } else {
      const response = await databaseService
        .addTalent(data)
        .then((response) => response.data);
      if (response) navigate(`/talent/${response._id}`);

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
        {cloudImages &&
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
          register={register}
          name="image"
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
        />

        <Button type="submit">{talent ? "Update" : "Add"}</Button>
         <Button onClick={()=>navigate(`/talent`)}>Cancel</Button>
      </form>
    </>
  );
}

export default TalentForm;
