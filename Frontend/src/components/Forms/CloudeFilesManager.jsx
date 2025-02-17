import React, { useState,useEffect } from 'react';

function CloudFilesManager({ cloudFiles, handleDeleteFile }) {
  useEffect(() => {
    console.log('Rerendering for cloudFiles file manager', cloudFiles);
  }, [cloudFiles]);

  const [isVisible, setIsVisible] = React.useState(null);
  useEffect(() => {
    console.log('isVisible', isVisible);
  }, [isVisible]);

  const handleDelete = async (index) => {
    console.log('Deleting file at index:', index);
    await handleDeleteFile(index); // Use the function from props
  };

  const handleDownload = (index) => {
    console.log('Downloading file at index:', index);
    console.log('Downloading file at index:', cloudFiles[index]);
    async function downloadFileFromServer(fileUrl, fileName) {
      console.log('fileUrl', fileUrl);
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
    const extension = cloudFiles[index].split('.').pop();
    const fileurl = cloudFiles[index].replace('http://', 'https://');
    downloadFileFromServer(fileurl, `file-${index}.${extension}`);
  };
  const handeView = (index) => {
    setView(cloudFiles[index]);
  };

  const [view, setView] = React.useState(null);

  return (
    <>
      {/* View Modal */}
      {view && (
        <div className="fixed inset-0 flex items-center justify-center bg-black 
        min-h-screen
        bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setView(null)}
            >
              ✖
            </button>
            {view.includes('image') ? (
              <img src={view} alt="
              File Preview" className="w-full rounded-lg" />
            ) : (
              <video src={view} controls className="w-full rounded-lg" />
            )}
            </div>
        </div>
      )}

      {/* File Manager Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-4 p-1">
        {cloudFiles?.length > 0 &&
          cloudFiles.map((file, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg shadow-md bg-white transition hover:shadow-lg"
            >
              {/* File Preview */}
              {/* <div className="relative"> */}
              <div className="relative border border-gray-200 rounded-lg shadow-md bg-white transition hover:shadow-lg overflow-hidden p-1">
                {file.includes('image') ? (
                  <img
                    src={file}
                    className="w-full h-40 object-cover rounded-t-lg transition-transform hover:scale-105"
                    onError={(e) => (e.target.src = '/fallback-image.jpg')}
                  />
                ) : (
                  <video
                    src={file}
                    controls
                    className="w-full h-40 rounded-t-lg transition-transform hover:scale-105"
                  />
                )}

                {/* Options Button */}
                <button
                  className="absolute top-2 right-2 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-300 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsVisible(isVisible === index ? null : index);
                  }}
                  onMouseEnter={() => setIsVisible(index)}
                >
                  ⋮
                </button>
              </div>

              {/* Dropdown Menu */}
              {isVisible === index && (
                <div
                  className="absolute top-10 right-4 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-32 z-10"
                  onMouseLeave={() => setIsVisible(null)}
                >
                  <ul className="text-sm text-gray-700">
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => {
                        setIsVisible(null);
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </li>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => {
                        setIsVisible(null);
                        handleDownload(index);
                      }}
                    >
                      Download
                    </li>
                    <li
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => {
                        setIsVisible(null);
                        setView(file);
                      }}
                    >
                      View
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default CloudFilesManager;
