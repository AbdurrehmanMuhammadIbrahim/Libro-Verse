import React from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from '@/lib/config';

const {
    env: {
      imagekit: { publicKey, privateKey, urlEndpoint },
    },
  } = config;

const FileUpload = () => {

    const authenticator =  async() =>{
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
        } catch (error) {
            console.log(error)
        }
    }

  return (
  <ImageKitProvider 
  publicKey={publicKey}
   urlEndpoint={urlEndpoint}
   authenticator={authenticator}>


   </ImageKitProvider>

  )
}

export default FileUpload
