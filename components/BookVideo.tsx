"use client";
import React from "react";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >


      <IKVideo path={videoUrl} h-300="true" controls={true} className="rounded-xl mx-auto w-full"
        style={{ maxHeight: "400px", width: "70%" }}

      />


    </ImageKitProvider>
  );
};
export default BookVideo;