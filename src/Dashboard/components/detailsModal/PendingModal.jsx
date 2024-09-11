import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import "./PendingModal.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PendingModal({ show, onHide, challenge }) {
  if (!challenge) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Challenge Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="statusMessageWrapper mb-4">
          <FontAwesomeIcon icon={faClock} id="pendingIcon" />
          <p className="pendingMessage">
            Thanks for submitting your Solution! Our team is currently verifying
            it. You'll receive an update within 24-48hrs.
          </p>
        </div>
        <p
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#challengeDetails"
          aria-expanded="false"
          aria-controls="challengeDetails"
        >
          <span
            style={{
              fontSize: "0.8rem",
              color: "#0050C8",
              marginRight: "10px",
            }}
          >
            Challenge Details
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              fontSize: "0.8rem",
              color: "#0050C8",
            }}
          />
        </p>
        <div className="collapse hide" id="challengeDetails">
          <ul className="challengeDetails_wrapper p-0 pt-3">
            <li className="challenge_detail">
              <span>Title : </span>
              <p id="challengeTitle">{challenge.title}</p>
            </li>
            <li className="challenge_detail">
              <span>Description : </span>
              <p id="challengeDesc">{challenge.description}</p>
            </li>
            <li className="challenge_detail">
              <span>Submitted On : </span>
              <p id="challengeSubDate">{challenge.submittedOn}</p>
            </li>
            <li className="challenge_detail">
              <span className="d-flex align-items-center">
                Solution Link :{" "}
              </span>
              <a href={`https://${challenge.Link}`} target="_blank">
                {challenge.Link}
              </a>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
