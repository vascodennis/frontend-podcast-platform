import { useState, useEffect } from "react";
import xml2js from "xml2js";

const useRssFeed = (url) => {
  const [rssItems, setRssItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const xmlString = await response.text();

        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedXml = await parser.parseStringPromise(xmlString);

        if (parsedXml?.rss?.channel?.item) {
          setRssItems(parsedXml.rss.channel.item);
        } else {
          throw new Error("Invalid XML structure.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { rssItems, error };
};

export default useRssFeed;
