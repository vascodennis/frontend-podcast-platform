"use client";

import Link from "next/link";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const EpisodesTable = ({ podcastID, details }) => {
  if (!details || details.length === 0) {
    return <p>No episodes available.</p>;
  }

  console.log(details);

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
              <Link href={`/podcast/${podcastID}/episode/${episode.guid["_"]}`}>
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
