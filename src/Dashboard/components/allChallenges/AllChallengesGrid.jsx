import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../table.css";
import "../grid.css";

export default function AllChallengesGrid({
  challenges,
  showModal,
  actionBtnText,
  type,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating content loading time
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="loader JS_on mx-auto my-5">
      <span className="binary"></span>
      <span className="binary"></span>
      <span className="getting-there">LOADING STUFF...</span>
    </div>
  ) : (
    <>
      {challenges.map((challenge, index) => (
        <div className="challenge_card border" key={index}>
          <div className="card_header">
            <p className={`card_category ${challenge.category.split(" ")[0]}`}>
              {challenge.category}
            </p>
            <p className={`card_difficulty ${challenge.difficulty}`}>
              {challenge.difficulty}
            </p>
          </div>
          <p className="mobile_card_title">{challenge.title}</p>
          <p className="mobile_card_desc">{challenge.description}</p>
          <div className="timeframe_wrapper">
            <div className="postedon_wrapper">
              <p className="timeframe_title">Posted On:</p>
              <p className="timeframe_content" id="card_PostedOn">
                {challenge.postedOn}
              </p>
            </div>
            <div className="timeframe_line"></div>
            <div className="endson_wrapper text-end">
              <p className="timeframe_title">Ends On:</p>
              <p className="timeframe_content" id="card_EndsOn">
                {challenge.endsOn}
              </p>
            </div>
          </div>
          {type === "Completed" && (
            <>
              <p className="result_title">Result:</p>
              <p className={`result_content ${challenge.result}`}>
                {challenge.result} - {challenge.reward}
              </p>
            </>
          )}
          {type !== "Completed" && (
            <div
              className="card_view_more_btn"
              onClick={() => showModal(challenge)}
            >
              <span>{actionBtnText}</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
