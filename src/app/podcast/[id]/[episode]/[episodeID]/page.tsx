"use client";

import EpisodeAudio from "../../../../components/EpisodeAudio";
import { usePathname } from "next/navigation";
import EpisodeInfo from "../../../../components/EpisodeInfo";
import usePodcastData from "../../../../../../lib/usePodcastData";
import { useEffect, useState } from "react";
import useRssFeed from "../../../../../../lib/useRssFeed";
import Loader from "../../../../components/Loader";

type PodcastData = {
  podcastDescription: any;
  error: Error | null;
};

interface RssFeed {
  rssItems: Episode[];
  error: Error | null;
}

interface Episode {
  author: string;
  "content:encoded": string;
  description: string;
  enclosure: {
    $: {
      length: number;
      type: string;
      url: string;
    };
  };
  guid: {
    _: string;
  };
  "itunes:author": string;
  "itunes:duration": string;
  "itunes:episodeType": string;
  "itunes:explicit": string;
  "itunes:subtitle": string;
  "itunes:summary": string;
  "itunes:title": string;
  link: string;
  pubDate: string;
  title: string;
}

const page = () => {
  const pathname = usePathname() as string;
  const podcastID = pathname.split("/")[2] as string;
  const episodeID = decodeURIComponent(pathname.split("/")[4]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { podcastDescription, error: podcastError }: PodcastData =
    usePodcastData(podcastID);

  const { rssItems, error: rssError }: RssFeed = useRssFeed(
    podcastDescription?.results[0]?.feedUrl
  );

  console.log(rssItems);

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

  let filteredEpisodes: Episode[];
  if (!Array.isArray(rssItems) || rssItems.length === 0) {
    return null;
  } else {
    filteredEpisodes = rssItems.filter(
      (episode: Episode) => episode.guid["_"] === episodeID
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
