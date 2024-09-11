import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import weeklyCollegeLeaderboard from "../../../assets/data/Leaderboard/weeklyCollegeLeaderboard";
import "./ranking.css";
import {
  faRankingStar,
  faBuildingColumns,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CollegeRankings() {
  return (
    <div className="border rounded-2 p-3 mb-4 overflow-auto">
      <p>
        <FontAwesomeIcon icon={faBuildingColumns} /> College Rankings
      </p>
      <hr />
      <table className="table rankingTable">
        <thead>
          <tr>
            <th className="rankingCol">
              <FontAwesomeIcon icon={faRankingStar} />
            </th>
            <th className="nameCol">Name</th>
            <th className="xpCol">XP</th>
          </tr>
        </thead>
        <tbody>
          {weeklyCollegeLeaderboard.slice(0, 5).map((student, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="nameCol">
                  <span>{student.name}</span>
                </td>
                <td>{student.xp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link
        to={"/dashboard/leaderboard"}
        className="viewLeaderboardLink text-center d-block"
      >
        View Leaderboard <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
}
