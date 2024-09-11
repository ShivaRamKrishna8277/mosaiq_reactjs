import React, { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllChallengesRow({
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
    <tr>
      <td colSpan={7}>
        <div
          className={`loader JS_on ${
            window.innerWidth < 655 ? "p-5 mx-5" : "mx-auto"
          } my-5`}
        >
          <span className="binary"></span>
          <span className="binary"></span>
          <span className="getting-there">LOADING STUFF...</span>
        </div>
      </td>
    </tr>
  ) : (
    <>
      {challenges.map((challenge, index) => (
        <tr key={index}>
          <td>
            <span
              className={`categoryContent ${challenge.category.split(" ")[0]}`}
            >
              {challenge.category}
            </span>
          </td>
          <td className="titleCol">{challenge.title}</td>
          <td className="descCol">{challenge.description}</td>
          {type !== "Completed" && <td>{challenge.postedOn}</td>}
          {type !== "Completed" && <td>{challenge.endsOn}</td>}
          <td className={challenge.difficulty}>{challenge.difficulty}</td>
          {type === "Completed" && (
            <td className={challenge.result}>{challenge.result}</td>
          )}
          {type === "Completed" && (
            <td className={challenge.result}>{challenge.reward}</td>
          )}
          {type !== "Completed" && (
            <td className="actionCol" onClick={() => showModal(challenge)}>
              {actionBtnText} <FontAwesomeIcon icon={faArrowRight} />
            </td>
          )}
        </tr>
      ))}
    </>
  );
}
