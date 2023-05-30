"use client";

import EpisodeAudio from "@/app/components/EpisodeAudio";
import { usePathname } from "next/navigation";
import EpisodeInfo from "@/app/components/EpisodeInfo";
import usePodcastData from "../../../../../../lib/usePodcastData";
import { useEffect, useState } from "react";
import useRssFeed from "../../../../../../lib/useRssFeed";

const page = () => {
  const pathname = usePathname();
  const podcastID = pathname.split("/")[2];
  const episodeID = pathname.split("/")[4];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { podcastDescription, error: podcastError } = usePodcastData(podcastID);

  const { rssItems, error: rssError } = useRssFeed(
    podcastDescription?.results[0]?.feedUrl
  );

  useEffect(() => {
    if (podcastError || rssError) {
      setError(podcastError || rssError);
    }
    setIsLoading(false);
  }, [podcastError, rssError]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  let filteredEpisodes;
  if (!rssItems || rssItems.length === 0) {
    return null;
  } else {
    filteredEpisodes = rssItems.filter(
      (episode) => episode.guid["_"] === episodeID
    );
  }

  return (
    <>
      <section className="flex p-8">
        <EpisodeInfo episodeinfo={podcastDescription} />
        <EpisodeAudio episodedetails={filteredEpisodes[0]} />
      </section>
    </>
  );
};

export default page;
