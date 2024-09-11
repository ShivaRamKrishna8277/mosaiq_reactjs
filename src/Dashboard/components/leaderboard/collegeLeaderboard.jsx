import { useState, useEffect } from "react";
import weeklyCollegeLeaderboard from "../../../assets/data/Leaderboard/weeklyCollegeLeaderboard";
import monthlyCollegeLeaderboard from "../../../assets/data/Leaderboard/monthlyCollegeLeaderboard";

export default function CollegeLeaderboard({ timeFrame }) {
  const [personalRanking, setPersonalRanking] = useState("-");
  const data =
    timeFrame === "Weekly"
      ? weeklyCollegeLeaderboard
      : monthlyCollegeLeaderboard;

  useEffect(() => {
    const collegeIndex = data.findIndex(
      (college) => college.name === "AME's Degree College"
    );
    if (collegeIndex !== -1) {
      setPersonalRanking(collegeIndex + 1); // +1 to match the 1-based index
    } else {
      setPersonalRanking(">25");
    }
  }, [data]); // Ensure this runs when `data` changes

  return (
    <>
      <tr className="personalRankingRow">
        <th>{personalRanking}</th>
        <th>AME's Degree College</th>
        <th>11810</th>
        <th>90</th>
        <th>50</th>
        <th>87.50%</th>
      </tr>
      {data.map((college, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{college.name}</td>
            <td>{college.xp}</td>
            <td>{college.problemsSolved}</td>
            <td>{college.approvedProblems}</td>
            <td>{college.accuracy}</td>
          </tr>
        );
      })}
    </>
  );
}
