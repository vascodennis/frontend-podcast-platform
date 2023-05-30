"use client";

import EpisodeInfo from "@/app/components/EpisodeInfo";
import EpisodesTable from "../../components/EpisodesTable";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useRssFeed from "../../../../lib/useRssFeed";
import usePodcastData from "../../../../lib/usePodcastData";

const PodcastDetails = () => {
  const pathname = usePathname();
  const podcastID = pathname.split("/")[2];

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
    return <div>Loading...</div>;
  }

  return (
    <>
      {podcastDescription &&
      podcastDescription.results &&
      podcastDescription.results.length > 0 ? (
        <section className="flex p-8">
          <EpisodeInfo episodeinfo={podcastDescription} />
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col justify-center w-full shadow-lg border border-grayLight p-4">
              <h2 className="font-bold text-2xl">
                Episodes: {podcastDescription.results[0].trackCount}
              </h2>
            </div>
            {rssItems ? (
              <div className="w-full shadow-lg border border-grayLight p-4 mt-8">
                <EpisodesTable details={rssItems} podcastID={podcastID} />
              </div>
            ) : (
              "Loading"
            )}
          </div>
        </section>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default PodcastDetails;
