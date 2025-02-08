import { useState, useEffect } from "react";
import { Input } from "./";
import "./temp.css"
function MultipleFilesInputPreview({ register, name, accept, watch }) {
  const [preview, setPreview] = useState([]);
  const files = watch(name);

  console.log("Files", files);

  useEffect(() => {
    if (files && files.length > 0) {
      const newPreview = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      }));
      setPreview(newPreview);
      return () => newPreview.forEach(({url}) => URL.revokeObjectURL(url));
    }
  }, [files]);

  return (
    <div className="file-preview-container">
      <Input
        type="file"
        label="Images and Videos"
        accept={accept}
        {...register(name)}
        multiple
      />

      {preview.length > 0 && (
        <div className="preview-section">
          <h4>Selected Files:</h4>
          <ul className="preview-list">
            {preview.map(({ url, type }, index) => (
              <li key={index} className="preview-item">
                {type === "image" ? (
                  <img src={url} className="preview-image" alt={`Preview ${index}`} />
                ) : (
                  <video  controls className="preview-video">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultipleFilesInputPreview;
