"use client";

import { useState, useEffect } from "react";
import { FilterBar } from "./FilterBar";
import { PodcastCard } from "./PodcastCard";

const Feed = () => {
  const [allPodcast, setAllPodcast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      setAllPodcast(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(allPodcast);
  return (
    <section className="grid grid-cols-4 gap-2 gap-y-24 mt-32">
      {allPodcast.feed.entry.map((podcast, index) => (
        <PodcastCard
          key={index}
          title={podcast["title"].label}
          author={podcast["im:artist"].label}
          image={podcast["im:image"][0].label}
        />
      ))}
    </section>
  );
};

export default Feed;
