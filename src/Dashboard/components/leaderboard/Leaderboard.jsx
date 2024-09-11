import "./Leaderboard.css";
import leaderboardBanner from "../../../assets/images/leaderboardBanner.svg";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import StudentLeaderboard from "./studentLeaderboard";
import CollegeLeaderboard from "./collegeLeaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function Leaderboard() {
  let [leaderboardType, setLeaderboardType] = useState("Student");
  let [leaderboardTime, setLeaderboardTime] = useState("Weekly");
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{leaderboardType} Leaderboard.</Popover.Header>
      <Popover.Body>
        {leaderboardType === "Student"
          ? "The Student Leaderboard displays individual XP points earned by each student. It ranks students based on their personal achievements and accumulated experience points."
          : "The College Leaderboard shows the total XP earned by all students from each college combined. It ranks colleges based on the cumulative achievements of their students."}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div id="leaderboardBanner" className="mb-5 px-lg-4 px-3">
        <div className="bannerText h-100">
          <p className="h2">Leaderboard</p>
          <p className="h6">
            Where Outstanding Students and Esteemed Colleges Shine Together.
            Track Achievements, Celebrate Excellence, and Push Beyond Limits.
            Join the Journey to Reach the Top of the Leaderboard!
          </p>
        </div>
        <div className="bannerImg h-100 d-none d-lg-flex">
          <img
            src={leaderboardBanner}
            alt="Leaderboard"
            id="leaderboardBannerImg"
          />
        </div>
      </div>
      <div className="leaderboardUtilityBar d-flex align-items-center justify-content-between">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant={`${
              leaderboardType === "Student" ? "dark" : "light"
            } btn-sm border`}
            onClick={() => setLeaderboardType("Student")}
          >
            Student
          </Button>
          <Button
            variant={`${
              leaderboardType === "College" ? "dark" : "light"
            } btn-sm border`}
            onClick={() => setLeaderboardType("College")}
          >
            College
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant={`${
              leaderboardTime === "Weekly" ? "dark" : "light"
            } btn-sm border`}
            onClick={() => setLeaderboardTime("Weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={`${
              leaderboardTime === "Monthly" ? "dark" : "light"
            } btn-sm border`}
            onClick={() => setLeaderboardTime("Monthly")}
          >
            Monthly
          </Button>
        </ButtonGroup>
      </div>
      <div className="leaderboardWrapper table-responsive my-4">
        <p className="tableTitle mb-2">
          {leaderboardType} Leaderboard - {leaderboardTime}{" "}
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="opacity-50"
              style={{ cursor: "pointer" }}
            />
          </OverlayTrigger>
        </p>
        <table className="table table-bordered">
          <thead className="position-sticky top-0">
            <tr>
              <th className="rankingCol">Ranking</th>
              <th className="fullNameCol">
                {leaderboardType === "Student" ? "Full Name" : "College Name"}
              </th>
              <th className="xpCol">XP</th>
              <th className="totalProblemsCol">Problems Solved</th>
              <th className="approvedCol">Approved</th>
              <th className="accuracyCol">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardType === "Student" ? (
              <StudentLeaderboard timeFrame={leaderboardTime} />
            ) : (
              <CollegeLeaderboard timeFrame={leaderboardTime} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
