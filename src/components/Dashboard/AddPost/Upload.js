import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
 
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");



  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? "video/*" : "image/*",
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    reader.onerror = () => {
      console.error("Error reading file");
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div>
      <label className='text-sm text-richblack-5' htmlFor={name}>
        {label} {!viewData && <sup className='text-pink-200'>*</sup>}
      </label>
      <div
     
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md`}
        {...getRootProps()}
        
      >
        <input {...getInputProps()}  />
        {previewSource ? (
          <div className='flex w-full flex-col p-6'>
            {video ? (
              <Player aspectRatio='16:9' playsInline src={previewSource} />
            ) : (
              <img src={previewSource} alt="Preview" className='h-full w-full rounded-md object-cover' />
            )}
            {!viewData && (
              <button
                type='button'
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className='mt-3 text-richblack-400 underline'
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className='flex w-full flex-col items-center p-6'>
            <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
              <FiUploadCloud className='text-2xl text-yellow-50' />
            </div>
            <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
              Drag and Drop a {video ? "video" : "image"}, or Click to{" "}
              <span className='font-semibold text-yellow-50' >Browse </span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
