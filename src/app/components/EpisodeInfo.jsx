const EpisodeInfo = ({ episodeinfo }) => {
  if (!episodeinfo || episodeinfo.length === 0) {
    return <p>No episodes available.</p>;
  }

  const cachedData = localStorage.getItem("podcastsData");
  const episodeDescription = JSON.parse(cachedData);

  const collectionID = episodeinfo.results[0].collectionId;

  const filteredEpisodes = episodeDescription.feed.entry.filter(
    (item) => item.id.attributes["im:id"] === collectionID.toString()
  );

  const summaries = filteredEpisodes.map((episode) => episode.summary.label);

  return (
    <div className="flex flex-col justify-center items-center w-1/3 h-fit mr-32 shadow-lg border border-grayLight p-4">
      <img
        className="p-8"
        src={episodeinfo.results[0].artworkUrl600}
        alt={episodeinfo.results[0].collectionName}
        width={300}
        height={300}
      />
      <div className="w-full flex flex-col border-y border-grayLight my-4 p-6">
        <h3 className="text-xl font-bold text-left">
          {episodeinfo.results[0].collectionName}
        </h3>
        <h5 className="text-base text-left">
          by {episodeinfo.results[0].artistName}
        </h5>
      </div>
      <div className="w-full flex flex-col p-6">
        <h5 className="font-bold text-left">Description</h5>
        <p className="text-base italic text-left mt-4 text-xs">{summaries}</p>
      </div>
    </div>
  );
};

export default EpisodeInfo;
