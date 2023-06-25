"use client";

import { useCompletion } from 'ai/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { BeatLoader } from 'react-spinners';
import { set } from 'lodash';

const FileUploadComponent: React.FC = () => {
  const [fileContents, setFileContents] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileError("");

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => setFileError("File reading was aborted");
      reader.onerror = () => setFileError("File reading has failed");
      reader.onload = () => {
        const contents = reader.result as string;
        setFileContents(contents);
      };

      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
    }
  });

  const { complete, isLoading } = useCompletion({
    id: "novel",
    api: "/api/process",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      console.log(completion);
      setApiResponse(completion);
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleProcessClick = async () => {
    console.log(fileContents);
    setLoading(true);
    complete(fileContents);
  }

  const loadSampleJournal = () => {
    setFileContents("Man, today has been one of those days where my brain feels like a wild rollercoaster. Being smart can be a blessing and a curse, you know? Sometimes it feels like I overthink everything and drive myself crazy. Like, I'm constantly questioning myself and wondering if I'm living up to my potential.\
    Lately, I've been doing some serious soul-searching. I'm realizing that I've got some issues to work through, especially when it comes to relationships. It's like my brain goes into overdrive, and I end up overanalyzing every little thing. It's tough because I genuinely want to connect with people, but it's like I trip over my own thoughts and end up saying or doing something dumb.\
    Something else I've noticed is how biased my thinking can be. It's kinda scary to realize that my brain isn't always as fair and open-minded as I want it to be. But you know what? I'm determined to change that. I want to challenge my own biases, learn from my mistakes, and become a better person.\
    It's a journey, for sure. I'm starting to see that being intelligent isn't just about book smarts or knowing a bunch of stuff. It's about being aware of your own flaws and working on them. I'm ready to embrace my vulnerabilities, grow as a person, and let go of all the mental baggage that's been holding me back.\
    I guess what I'm saying is, I want to be smarter in more ways than one. I want to be emotionally intelligent, socially intelligent, and all that good stuff. It won't be easy, but I'm willing to put in the effort. Here's to a future where my brain works for me, not against me. Cheers!");
  }

  return (
    <div className="container mx-auto">
      <div>
        <p className="text-2xl font-bold text-center py-4">You can bring your existing journals via text or csv or json files</p>
        <div {...getRootProps({ className: 'dropzone w-64 mx-auto cursor-pointer flex flex-col items-center justify-center p-10 bg-blue-500 rounded-lg' })}>
          <input {...getInputProps()} />
          <p className="text-white">Upload your journals.</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={loadSampleJournal} className="mt-5 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Try with a sample journal</button>
      </div>

      {fileError && (
        <div className="mt-5 text-red-500">{fileError}</div>
      )}
      {(
        <div className='flex flex-col justify-center py-4'>
          <textarea
            className="w-full h-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows={10}
            value={fileContents}
            onChange={(e) => setFileContents(e.target.value)}
          />
          <button onClick={handleProcessClick} className="mt-5 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Process this journal with AI</button>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center mt-5">
          <BeatLoader color={"#123abc"} loading={loading} size={15} />
        </div>
      )}
      {apiResponse && (
        <div className="mt-5 bg-green-200 p-5 rounded">
          <p>{apiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;