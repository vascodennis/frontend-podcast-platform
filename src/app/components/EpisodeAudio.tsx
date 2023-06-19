interface EpisodeDetails {
  title: string;
  description: string;
  enclosure: {
    $: {
      url: string;
    };
  };
}

interface EpisodeAudioProps {
  episodedetails: EpisodeDetails;
}

const EpisodeAudio: React.FC<EpisodeAudioProps> = ({ episodedetails }) => {
  if (!episodedetails) {
    return <p>No episodes available.</p>;
  }

  return (
    <div className="flex flex-col w-2/3 shadow-lg border border-grayLight p-4 h-fit">
      <h2 className="text-4xl font-bold">{episodedetails.title}</h2>
      <p
        className="italic text-xs mt-4"
        dangerouslySetInnerHTML={{ __html: episodedetails.description }}
      />

      <div className="w-full border-t border-grayLight my-4 pt-4">
        <audio className="w-full" controls>
          <source src={episodedetails.enclosure["$"].url} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  );
};

export default EpisodeAudio;
