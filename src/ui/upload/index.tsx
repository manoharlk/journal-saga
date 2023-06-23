"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const file = fileList[0];
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error('File is too large');
      setFile(null);
    } else {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target?.result;
        console.log(fileContent);
        toast.success('File uploaded successfully');
      };

      reader.onerror = (event) => {
        console.error('An error occurred while reading the file:', event);
        toast.error('An error occurred while reading the file');
      };

      reader.readAsText(file);
      setFile(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('An error occurred while uploading the file:', await response.text());
    } else {
      console.log('File uploaded successfully');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-16 p-24">
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".txt,.csv,.json" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;