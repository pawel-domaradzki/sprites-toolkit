"use client";

import React, { FC, useState } from "react";
import { FileUploader } from "react-drag-drop-files";


interface DropZoneProps {}

const DropZone: FC<DropZoneProps> = ({ fileUpload, children }) => {
  const fileTypes = ["JPG", "PNG", "GIF"];

  return (
    <FileUploader
      multiple
      handleChange={fileUpload}
      name="file"
      types={fileTypes}
      classes="bg-slate-200"
    >
      {children}
    </FileUploader>
  );
};

export default DropZone;
