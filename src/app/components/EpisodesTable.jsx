"use client";

const EpisodesTable = () => {
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
        <tr>
          <td>Sample Title 1</td>
          <td>2023-05-28</td>
          <td>2 hours</td>
        </tr>
        <tr>
          <td>Sample Title 2</td>
          <td>2023-05-29</td>
          <td>1 hour</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EpisodesTable;
