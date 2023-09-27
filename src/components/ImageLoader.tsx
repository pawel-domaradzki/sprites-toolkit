"use client";

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageLoader({ onImagesLoaded }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onImagesLoaded(files);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const loadImages = acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const preview = URL.createObjectURL(file);
          const image = new Image();

          image.src = preview;

          image.onload = () => {
            setFiles((prevFiles) => [
              ...prevFiles,
              {
                file,
                image,
                preview,
                width: image.width,
                height: image.height,
              },
            ]);
            resolve();
          };

          image.onerror = reject;
        });
      });
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.file.name}>
      <div>
        <img src={file.preview} width={100} height={100} alt={file.file.name} />
      </div>
      <p>Width: {file.width}px,</p>
    </div>
  ));

  return (
    <section className="border-2 border-sky-500">
      <div className="py-8 bg-slate-600" {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="text-white">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside className="flex " onClick={() => console.log(files)}>
        {thumbs}
      </aside>
    </section>
  );
}

export default ImageLoader;
