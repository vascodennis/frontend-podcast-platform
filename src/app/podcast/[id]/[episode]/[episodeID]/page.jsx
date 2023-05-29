import EpisodeAudio from "@/app/components/EpisodeAudio";
import React from "react";

const page = () => {
  return (
    <>
      <section className="flex p-8">
        <div className="flex flex-col justify-center items-center w-1/3 h-full mr-32 shadow-lg border border-grayLight p-4"></div>

        <EpisodeAudio />
      </section>
    </>
  );
};

export default page;
