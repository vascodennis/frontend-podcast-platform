"use client";

const EpisodesTable = ({ details }) => {
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
            <td>{episode.title}</td>
            <td>{episode.pubDate}</td>
            <td>{episode["itunes:duration"]}</td>
          </tr>
        ))}
        <tr>
          <td>Sample Title 1</td>
          <td>2023-05-28</td>
          <td>2 hours</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EpisodesTable;
