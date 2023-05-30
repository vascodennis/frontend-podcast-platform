"use client";

import Link from "next/link";
import { LoadingContext } from "../../../lib/LoadingProvider";
import Loader from "./Loader";
import { useContext } from "react";

const Nav = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <nav className="flex-between w-full mb-6">
      <div className="flex justify-between items-center border-b border-grayLight">
        <Link href="/">
          <h1 className="font-bold text-titleBlue text-xl">Podcaster</h1>
        </Link>
        {isLoading && <Loader />}
      </div>
    </nav>
  );
};

export default Nav;
