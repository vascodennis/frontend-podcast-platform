"use client";

import { useState, useEffect, useRef } from "react";
import { PodcastCard } from "./PodcastCard";

import Link from "next/link";
import usePodcastsAll from "../../../lib/usePodcastAll";
import Loader from "./Loader";

const Feed = () => {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is already in local storage
        const cachedData = localStorage.getItem("podcastsData");
        const cachedTime = localStorage.getItem("podcastsDataTime");

        // Check if data is not null and less than a day old
        if (
          cachedData !== null &&
          cachedTime !== null &&
          Date.now() - cachedTime < 86400000
        ) {
          setAllPodcasts(JSON.parse(cachedData));
          setIsLoading(false);
        } else {
          const data = await usePodcastsAll();
          setAllPodcasts(data);
          setIsLoading(false);

          // Store data and time of fetch in local storage
          localStorage.setItem("podcastsData", JSON.stringify(data));
          localStorage.setItem("podcastsDataTime", Date.now().toString());
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPodcasts.feed.entry.filter(
      (item) =>
        regex.test(item["im:artist"].label) || regex.test(item["im:name"].label)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeoutRef.current);
    const searchText = e.target.value;
    setSearchText(searchText);

    // debounce method
    searchTimeoutRef.current = setTimeout(() => {
      const searchResult = filterPrompts(searchText);
      setSearchedResults(searchResult);
    }, 100);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full h-8 flex justify-end">
        <div className="bg-titleBlue rounded p-2 flex justify-center items-center">
          {searchedResults.length === 0 && searchText === ""
            ? allPodcasts.feed.entry.length
            : searchedResults.length}
        </div>
        <form>
          <input
            className="ml-6 w-80 border-2 rounded border-grayLight pl-2"
            type="text"
            placeholder="Filter podcast"
            value={searchText}
            onChange={handleSearchChange}
            required
          />
        </form>
      </div>
      <section className="grid grid-cols-4 gap-2 gap-y-24 mt-32 place-items-center">
        {searchedResults.length > 0
          ? searchedResults.map((podcast, index) => (
              <Link
                href={`/podcast/${podcast.id.attributes["im:id"]}`}
                key={index}
              >
                <PodcastCard
                  title={podcast["im:name"].label}
                  author={podcast["im:artist"].label}
                  image={podcast["im:image"][0].label}
                />
              </Link>
            ))
          : allPodcasts.feed.entry.map((podcast, index) => (
              <Link
                href={`/podcast/${podcast.id.attributes["im:id"]}`}
                key={index}
              >
                <PodcastCard
                  title={podcast["im:name"].label}
                  author={podcast["im:artist"].label}
                  image={podcast["im:image"][0].label}
                />
              </Link>
            ))}
      </section>
    </>
  );
};

export default Feed;
