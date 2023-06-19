"use client";

import Link from "next/link";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const formatDuration = (duration: number | string): string => {
  // Check if the input is already in "hh:mm:ss" or "hh:mm" format
  const hhmmssPattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  if (typeof duration === "string" && hhmmssPattern.test(duration)) {
    return duration;
  }

  if (typeof duration !== "number" || duration < 0) {
    throw new Error(`Invalid duration: ${duration}`);
  }

  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = duration % 60;

  // Always use "hh:mm", optionally add ":ss" if there are non-zero seconds
  return secs === 0
    ? `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
    : `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

interface Episode {
  guid: { _: string };
  title: string;
  pubDate: string;
  "itunes:duration": number | string;
}

interface EpisodesTableProps {
  podcastID: string;
  details: Episode[];
}

const EpisodesTable: React.FC<EpisodesTableProps> = ({
  podcastID,
  details,
}) => {
  if (!details || details.length === 0) {
    return <p>No episodes available.</p>;
  }

  return (
    <table className="podcast-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {details.map((episode, index) => (
          <tr key={index}>
            <td className="text-titleBlue">
              <Link
                href={`/podcast/${podcastID}/episode/${encodeURIComponent(
                  episode.guid["_"]
                )}`}
              >
                {episode.title}
              </Link>
            </td>
            <td>{formatDate(episode.pubDate)}</td>
            <td>{formatDuration(episode["itunes:duration"])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EpisodesTable;
