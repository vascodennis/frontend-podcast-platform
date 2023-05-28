"use client";

import { useState, useEffect, useRef } from "react";
import { PodcastCard } from "./PodcastCard";

const Feed = () => {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const searchTimeoutRef = useRef(null);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      setAllPodcasts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPodcasts.feed.entry.filter(
      (item) =>
        regex.test(item["im:artist"].label) ||
        regex.test(item["im:name"].label) ||
        regex.test(item["im:image"][0].label)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full h-8 flex justify-end">
        <div className="bg-titleBlue rounded p-2 flex justify-center items-center">
          {(searchedResults.length = 0 ? 100 : searchedResults.length)}
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
      <section className="grid grid-cols-4 gap-2 gap-y-24 mt-32">
        {searchedResults.length > 0
          ? searchedResults.map((podcast, index) => (
              <PodcastCard
                key={index}
                title={podcast["im:name"].label}
                author={podcast["im:artist"].label}
                image={podcast["im:image"][0].label}
              />
            ))
          : allPodcasts.feed.entry.map((podcast, index) => (
              <PodcastCard
                key={index}
                title={podcast["im:name"].label}
                author={podcast["im:artist"].label}
                image={podcast["im:image"][0].label}
              />
            ))}
      </section>
    </>
  );
};

export default Feed;
