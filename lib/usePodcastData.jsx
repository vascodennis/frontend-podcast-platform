import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "./LoadingProvider";

function usePodcastData(podcastID) {
  const [podcastDescription, setpodcastDescription] = useState(null);
  const [error, setError] = useState(null);

  const { setIsLoading } = useContext(LoadingContext);

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
  }, [podcastID, setIsLoading]);

  return { podcastDescription, error };
}

export default usePodcastData;
