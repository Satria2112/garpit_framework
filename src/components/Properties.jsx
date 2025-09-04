"use client";
import React, { useEffect, useRef, useState } from "react";

const fields = ["kucing", "kelinci", "buaya", "harimau", "serigala"];

export default function Properties() {
  const [uploadStatus, setUploadStatus] = useState({});
  const [propertyMap, setPropertyMap] = useState({});
  const [fileData, setFileData] = useState({});
  const inputRefs = useRef({});

  const objectStore = "MUFOS";
  const formCode = "FUD";
  const nik = "15997284";
  const docCode = [30, 57, 74, 107, 9430000];

  useEffect(() => {
    const handleProperties = (event) => {
      const field = event.target?.getAttribute("data-field");
      if (!field) return;

      const detail = event.detail;

      console.log("Properties untuk:", field, detail);

      setPropertyMap((prev) => ({
        ...prev,
        [field]: detail,
      }));

      setUploadStatus((prev) => ({
        ...prev,
        [field]: detail.uploadedStatus,
      }));
    };

    const properties = document.querySelectorAll("str-dms-properties");
    properties.forEach((el) =>
      el.addEventListener("responseProperties", handleProperties)
    );

    return () => {
      properties.forEach((el) =>
        el.removeEventListener("responseProperties", handleProperties)
      );
    };
  }, []);

  const handleClickDMS = (field) => {
    if (inputRefs.current[field]) {
      inputRefs.current[field].click();
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const detail = propertyMap[field];
    if (!detail) {
      alert("Spesifikasi dokumen belum tersedia.");
      return;
    }

    const { maxSize, extension, maxSizeDesc } = detail.documentSpecifications;
    const maxSizeInt = parseInt(maxSize);

    // Validasi ekstensi
    const validExtensions = extension.map((ext) => ext.toLowerCase());
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      alert(`Ekstensi file tidak valid. Harus: ${validExtensions.join(", ")}`);
      return;
    }

    // Validasi ukuran
    if (file.size > maxSizeInt) {
      alert(`Ukuran file melebihi batas (${maxSizeDesc})`);
      return;
    }

    // Konversi ke base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (base64) {
        setFileData((prev) => ({
          ...prev,
          [field]: base64,
        }));
        alert("File berhasil diproses dan disimpan sebagai base64");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-1 p-8 w-full max-w-5xl">
      <div className="grid grid-cols-4 font-semibold text-sm text-black px-4 py-4 border border-blue-700 rounded-t-md animate-moving-gradient">
        <div>Nama Field</div>
        <div className="text-center">Properties</div>
        <div className="text-center col-span-2">Status</div>
      </div>

      {fields.map((field, index) => {
        const keyValueStr = JSON.stringify({ NoApplication: "100" });
        const status = uploadStatus[field];

        return (
          <div
            key={field}
            className={`grid grid-cols-4 items-center border-x border-b border-dashed px-4 py-3 ${
              status === true
                ? "bg-green-50 border-green-400"
                : status === false
                ? "bg-red-50 border-red-400"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="capitalize text-sm font-medium">{field}</div>

            <div className="flex justify-center">
              <str-dms-properties
                data-field={field}
                type="modal"
                color="green"
                objectStore={objectStore}
                formCode={formCode}
                docCode={docCode[index]}
                nik={nik}
                keyValue={keyValueStr}
                onClick={() => handleClickDMS(field)}
              >
                Info
              </str-dms-properties>
              <input
                type="file"
                ref={(el) => (inputRefs.current[field] = el)}
                onChange={(e) => handleFileChange(e, field)}
                className="hidden"
              />
            </div>

            <div className="col-span-2 flex justify-center">
              {status === true ? (
                <span className="text-green-600 text-sm font-medium">
                  Uploaded
                </span>
              ) : status === false ? (
                <span className="text-red-600 text-sm font-medium">
                  Belum Upload
                </span>
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
