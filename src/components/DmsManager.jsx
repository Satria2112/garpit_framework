"use client";
import React, { useEffect, useState } from "react";

export default function DmsManager() {

  useEffect(() => {
    const upload = (event) => {
      const response = event.detail;
      console.log("Upload:", response);
    };

    const preview = (event) => {
      const response = event.detail;
      console.log("Preview:", response);
    };

    const download = (event) => {
      const response = event.detail;
      console.log("Download:", response);
    };

    const uploadEl = document.querySelector("str-dms-upload");
    const previewEl = document.querySelector("str-dms-preview");
    const downloadEl = document.querySelector("str-dms-download");

    uploadEl.addEventListener("responseUpload", upload);
    previewEl.addEventListener("responsePreview", preview);
    downloadEl.addEventListener("responseDownload", download);

    return () => {
      uploadEl.removeEventListener("responseUpload", upload);
      previewEl.removeEventListener("responsePreview", preview);
      downloadEl.removeEventListener("responseDownload", download);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center sm:items-start">
      <div className="ml-20 mt-10 pointer">
        <str-dms-upload
          //MODE & CSS
          type="modal"
          color="blue"
          //mandatory value
          objectStore="MUFOS"
          formCode="CAMSBIU1001"
          nik="15997284"
          keyValue={JSON.stringify({ CAMSID: "5" })}
        >
          Upload
        </str-dms-upload>
      </div>

      <div className="ml-20 mt-10 pointer">
        <str-dms-preview
          //MODE & CSS
          type="modal"
          color="green"
          //mandatory value
          objectStore="MUFOS"
          formCode="CAMSBIU1001"
          nik="15997284"
          keyValue={JSON.stringify({ CAMSID: "5" })}
        >
          Preview
        </str-dms-preview>
      </div>

      <div className="ml-20 mt-10 pointer">
        <str-dms-download
          //MODE & CSS
          type="modal"
          color="green"
          //mandatory value
          objectStore="MUFOS"
          formCode="CAMSBIU1001"
          nik="15997284"
          keyValue={JSON.stringify({ CAMSID: "5" })}
        >
          Download
        </str-dms-download>
      </div>
    </div>
  );
}
