import React, { useState, useEffect } from "react";
import weeklyStudentLeaderboard from "../../../assets/data/Leaderboard/weeklyStudentLeaderboard";
import monthlyStudentLeaderboard from "../../../assets/data/Leaderboard/monthlyStudentLeaderboard";

export default function StudentLeaderboard({ timeFrame }) {
  const [personalRanking, setPersonalRanking] = useState("-");
  const data =
    timeFrame === "Weekly"
      ? weeklyStudentLeaderboard
      : monthlyStudentLeaderboard;

  useEffect(() => {
    const studentIndex = data.findIndex(
      (student) => student.name === "Vin Diesel"
    );
    if (studentIndex !== -1) {
      setPersonalRanking(studentIndex + 1); // +1 to match the 1-based index
    } else {
      setPersonalRanking(">25");
    }
  }, [data]); // Ensure this runs when `data` changes

  return (
    <>
      <tr className="personalRankingRow">
        <th>{personalRanking}</th>
        <th>Vin Diesel</th>
        <th>6000</th>
        <th>64</th>
        <th>60</th>
        <th>90.60%</th>
      </tr>
      {data.map((student, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{student.name}</td>
          <td>{student.xp}</td>
          <td>{student.problemsSolved}</td>
          <td>{student.approvedProblems}</td>
          <td>{student.accuracy}</td>
        </tr>
      ))}
    </>
  );
}
