"use client";
import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

const fields = ["kucing", "kelinci", "buaya", "harimau", "serigala"];

export default function DmsTestTable() {
  const [uploadStatus, setUploadStatus] = useState({});
  const [fileNames, setFileNames] = useState({});

  const objectStore = "MUFOS";
  const formCode = "FUD";
  const nik = "15997284";
  const docCode = [30, 57, 74, 107, 9430000];
  const keyValueStr = JSON.stringify({ NoApplication: "100" });

  useEffect(() => {
    const handleUpload = (event) => {
      const response = event.detail;
      const field = event.target?.getAttribute("data-field");
      if (!field) return;

      console.log("Upload untuk:", field, response);

      setUploadStatus((prev) => ({
        ...prev,
        [field]: response.uploadedStatus,
      }));

      const fileName = response?.metaData?.fileName || "";
      setFileNames((prev) => ({
        ...prev,
        [field]: fileName,
      }));
    };

    const uploads = document.querySelectorAll("str-dms-upload");
    uploads.forEach((el) =>
      el.addEventListener("responseUpload", handleUpload)
    );

    return () => {
      uploads.forEach((el) =>
        el.removeEventListener("responseUpload", handleUpload)
      );
    };
  }, []);

  return (
    <div className="flex flex-col gap-1 p-8 w-full max-w-5xl">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_2fr_6fr_1fr] font-semibold text-sm text-black px-4 py-4 border border-blue-700 rounded-t-md animate-moving-gradient">
        <div>Nama Field</div>
        <div>Nama File</div>
        <div className="text-center">Action</div>
        <div className="text-center">Status</div>
      </div>

      {/* Table Rows */}
      {fields.map((field, index) => {
        // const keyValueStr = JSON.stringify({ OrderID: `${index + 50}` });
        // const keyValueStr = JSON.stringify({ NoApplication: '100' });
        const status = uploadStatus[field];
        const fileName = fileNames[field];

        return (
          <div
            key={field}
            className={`grid grid-cols-[2fr_2fr_6fr_1fr] items-center border-x border-b border-dashed px-4 py-3 ${
              status === true
                ? "bg-green-50 border-green-400"
                : status === false
                ? "bg-red-50 border-red-400"
                : "bg-white border-gray-300"
            }`}
          >
            {/* Nama Field */}
            <div className="capitalize text-sm font-medium">{field}</div>

            {/* Nama File */}
            <div className="text-sm truncate text-gray-700">
              {fileName ? (
                <span className="text-gray-800">{fileName}</span>
              ) : (
                <span className="text-gray-400">Belum ada</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2 items-center">
              <str-dms-upload
                data-field={field} 
                type="modal"
                color="blue"


                objectStore={objectStore}
                formCode={formCode}
                docCode={docCode[index]}

                nik={nik}
                keyValue={keyValueStr}
              >
                <ArrowUpTrayIcon className="w-5 h-5 text-black" />
              </str-dms-upload>

              <str-dms-preview
                type="modal"
                color="green"
                objectStore={objectStore}
                formCode={formCode}
                docCode={docCode[index]}
                nik={nik}
                keyValue={keyValueStr}
              >
                <EyeIcon className="w-5 h-5 text-black" />
              </str-dms-preview>

              <str-dms-download
                type="modal"
                color="green"
                objectStore={objectStore}
                formCode={formCode}
                docCode={docCode[index]}
                nik={nik}
                keyValue={keyValueStr}
              >
                <ArrowDownTrayIcon className="w-5 h-5 text-black" />
              </str-dms-download>
            </div>

            {/* Status */}
            <div className="flex justify-center">
              {status === true ? (
                <CheckIcon className="w-6 h-6 text-green-600" />
              ) : status === false ? (
                <XMarkIcon className="w-6 h-6 text-red-600" />
              ) : (
                <span className="text-gray-400 text-sm">-</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
