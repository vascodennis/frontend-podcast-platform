"use client";

import EpisodesTable from "../../components/EpisodesTable";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import xml2js from "xml2js";

const PodcastDetails = () => {
  const pathname = usePathname();
  const PodcastID = pathname.split("/")[2];

  const [podcastDescription, setPodcastDescription] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rssItems, setRssItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?id=${PodcastID}`
        );
        const data = await response.json();
        setPodcastDescription(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (PodcastID) {
      fetchData();
    }
  }, [PodcastID]);

  console.log(PodcastID);
  console.log(podcastDescription);

  useEffect(() => {
    async function fetchRss() {
      const response = await fetch("https://feeds.megaphone.fm/60-songs");
      const xmlString = await response.text();

      const parser = new xml2js.Parser({ explicitArray: false });
      const parsedXml = await parser.parseStringPromise(xmlString);

      const rssItems = parsedXml.rss.channel.item;

      setRssItems(rssItems);
    }

    fetchRss();
  }, []);

  console.log(rssItems);

  return (
    <>
      {podcastDescription &&
      podcastDescription.results &&
      podcastDescription.results.length > 0 ? (
        <section className="flex p-8">
          <div className="flex flex-col justify-center items-center w-1/3 h-fit mr-32 shadow-lg border border-grayLight p-4">
            <img
              className="p-8"
              src={podcastDescription.results[0].artworkUrl600}
              alt="teste"
              width={300}
              height={300}
            />
            <div className="w-full flex flex-col items-center border-y border-grayLight my-4 p-6">
              <h3 className="text-xl font-bold text-center">
                {podcastDescription.results[0].collectionName}
              </h3>
              <h5 className="text-base text-center">
                by {podcastDescription.results[0].artistName}
              </h5>
            </div>
            <div className="w-full flex flex-col items-center p-6">
              <h5 className="font-bold">Description</h5>
              <p className="text-base">bla bla</p>
            </div>
          </div>
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col justify-center w-full shadow-lg border border-grayLight p-4">
              <h2 className="font-bold text-2xl">
                Episodes: {podcastDescription.results[0].trackCount}
              </h2>
            </div>
            <div className="w-full shadow-lg border border-grayLight p-4 mt-8">
              <EpisodesTable details={rssItems} />
            </div>
          </div>
        </section>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default PodcastDetails;
