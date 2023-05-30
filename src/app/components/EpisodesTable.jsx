"use client";

import Link from "next/link";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const formatDuration = (duration) => {
  // Check if the input is already in "hh:mm:ss" format
  const hhmmssPattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  if (typeof duration === "string" && hhmmssPattern.test(duration)) {
    return duration;
  }

  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = duration % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const EpisodesTable = ({ podcastID, details }) => {
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
