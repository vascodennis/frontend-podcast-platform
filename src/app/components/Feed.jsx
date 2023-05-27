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

  return <div>Feed</div>;
};

export default Feed;
