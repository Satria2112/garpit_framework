"use client";
import React, { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const fields = ["kucing", "kelinci", "buaya", "harimau", "serigala"];

export default function DmsTestTwo() {
  const [previewStatus, setPreviewStatus] = useState({});

  const objectStore = "MUFOS";
  const formCode = "CAMSBIU1001";
  const nik = "15997284";

  useEffect(() => {
    const handlePreview = (event) => {
      const response = event.detail;
      const field = event.target?.getAttribute("data-field");
      console.log("Preview untuk:", field, response);

      if (!field) return;

      setPreviewStatus((prev) => ({
        ...prev,
        [field]: response.uploadedStatus,
      }));
    };

    const previews = document.querySelectorAll("str-dms-preview");

    previews.forEach((el) =>
      el.addEventListener("responsePreview", handlePreview)
    );

    return () => {
      previews.forEach((el) =>
        el.removeEventListener("responsePreview", handlePreview)
      );
    };
  }, []);

  return (
    <div className="flex flex-col items-center sm:items-start gap-6 p-8">
      {fields.map((field, index) => {
        const keyValueStr = JSON.stringify({ CAMSID: `${index + 10}` });
        const status = previewStatus[field];

        return (
          <div
            key={field}
            className={`border border-dashed rounded-md p-4 w-full flex items-center justify-between gap-4 ${
              status === true
                ? "border-green-500 bg-green-50"
                : status === false
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
          >
            {/* Field label */}
            <div className="font-semibold w-32 capitalize">{field}</div>

            {/* Action Buttons */}
            <div className="flex gap-2 items-center">
              <str-dms-preview
                data-field={field}
                type="modal"
                color="green"
                objectStore={objectStore}
                formCode={formCode}
                nik={nik}
                keyValue={keyValueStr}
              >
                Preview
              </str-dms-preview>

              <str-dms-download
                type="modal"
                color="green"
                objectStore={objectStore}
                formCode={formCode}
                nik={nik}
                keyValue={keyValueStr}
              >
                Download
              </str-dms-download>
            </div>

            {/* Status Icon */}
            <div className="ml-auto pr-2">
              {status === true ? (
                <CheckIcon className="w-6 h-6 text-green-600" />
              ) : status === false ? (
                <XMarkIcon className="w-6 h-6 text-red-600" />
              ) : (
                <span className="text-gray-400 text-sm">Belum ada</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
