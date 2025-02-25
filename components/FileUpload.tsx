import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from '@/lib/config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { toast } from "sonner"

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}



const FileUpload = (
  { onFileChange }: {
    onFileChange: (filePath: string) => void
  }) => {


  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)



  const onError = (error: any) => {
    console.error("Error uploading file", error)
    toast("Your file could not be uploaded. Please try again.")

  }



  const onSuccess = (result: any) => {
    setFile(result)
    onFileChange(result.filePath)
    // toast({
    //   title: "uploaded successfully",
    //   description: `${result.filePath} uploaded successfully!`,
    // });
    toast(`${result.filePath}Event has been created.`)

    console.log("File uploaded successfully", result);
  }



  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}>

      <IKUpload
        className='hidden'
        fileName="file"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}

      />
      <button
        className="upload-btn"
        // className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base">upload a file</p>

        {/* <p className={cn("text-base", styles.placeholder)}>{placeholder}</p> */}

        {file && (
          <p className="upload-filename">{file.filePath}</p>
          // <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
          style={{ display: "center" }}
        />
      )}


    </ImageKitProvider >

  )
}

export default FileUpload

