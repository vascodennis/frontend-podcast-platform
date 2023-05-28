"use client";

import Image from "next/image";
import React from "react";
import EpisodesTable from "../components/EpisodesTable";

const page = () => {
  return (
    <section className="flex p-8">
      <div className="flex flex-col justify-center items-center w-1/3 h-fit mr-32 shadow-lg border border-grayLight p-4">
        <Image className="p-8" src="/vercel.svg" width={300} height={300} />
        <div className="w-full flex flex-col items-center border-y border-grayLight my-4 p-6">
          <h3 className="text-xl font-bold">Title</h3>
          <h5 className="text-base">Author</h5>
        </div>
        <div className="w-full flex flex-col items-center p-6">
          <h5 className="font-bold">Description</h5>
          <p className="text-base">bla bla</p>
        </div>
      </div>
      <div className="flex flex-col w-2/3">
        <div className="flex flex-col justify-center w-full shadow-lg border border-grayLight p-4">
          <h2 className="font-bold text-2xl">Episodes: 66</h2>
        </div>
        <div className="w-full shadow-lg border border-grayLight p-4 mt-8">
          <EpisodesTable />
        </div>
      </div>
    </section>
  );
};

export default page;
