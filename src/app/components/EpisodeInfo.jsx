import React from "react";

const EpisodeInfo = ({ episodeinfo }) => {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 h-fit mr-32 shadow-lg border border-grayLight p-4">
      <img
        className="p-8"
        src={episodeinfo.results[0].artworkUrl600}
        alt="teste"
        width={300}
        height={300}
      />
      <div className="w-full flex flex-col items-center border-y border-grayLight my-4 p-6">
        <h3 className="text-xl font-bold text-center">
          {episodeinfo.results[0].collectionName}
        </h3>
        <h5 className="text-base text-center">
          by {episodeinfo.results[0].artistName}
        </h5>
      </div>
      <div className="w-full flex flex-col items-center p-6">
        <h5 className="font-bold">Description</h5>
        <p className="text-base italic">bla bla</p>
      </div>
    </div>
  );
};

export default EpisodeInfo;
