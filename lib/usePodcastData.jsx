import { useState, useEffect } from "react";

function usePodcastData(podcastID) {
  const [podcastDescription, setpodcastDescription] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?id=${podcastID}`
        );
        const json = await response.json();
        setpodcastDescription(json);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (podcastID) {
      fetchData();
    }
  }, [podcastID]);

  return { podcastDescription, error, isLoading };
}

export default usePodcastData;
