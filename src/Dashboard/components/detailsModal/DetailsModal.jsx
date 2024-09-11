import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./DetailsModal.css";
import CircularProgress from "@mui/material/CircularProgress";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function importImage(imageName) {
  try {
    // Make sure the path is correct relative to where this function is used
    return require(`../../../assets/icons/Brand Icons/${imageName}.png`);
  } catch (error) {
    console.error("Image not found:", imageName);
    return null;
  }
}

export default function DetailsModal({
  show,
  onHide,
  challenge,
  type,
  enrollToChallenge,
  isEnrolling,
  submitSolution,
  isSubmitting,
}) {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  if (!challenge) {
    return null;
  }

  const handleImageLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Url
  const validateURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );
    return !!pattern.test(url);
  };
  const handleChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setIsValid(validateURL(inputUrl));
  };

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
          Challenge Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_info_header d-flex align-content-center gap-3">
          <div>
            <span
              id="modalCategory"
              className={`${challenge.category} ModalCategory`}
            >
              {challenge.category}
            </span>
          </div>
          <div>
            <span
              id="modalDifficulty"
              className={`${challenge.difficulty}_modal ModalDifficulty`}
            >
              {challenge.difficulty}
            </span>
          </div>
        </div>
        <div>
          <span id="modalTitle" className="ModalTitle">
            {challenge.title}
          </span>
        </div>
        <div>
          <span id="modalDescription" className="ModalDesc">
            {challenge.description}
          </span>
        </div>
        <div className="timeframe_wrapper">
          <div className="postedon_wrapper">
            <p className="timeframe_title">Posted On:</p>
            <p className="timeframe_content" id="modalPostedOn">
              {challenge.postedOn}
            </p>
          </div>
          <div className="timeframe_line"></div>
          <div className="endson_wrapper text-end">
            <p className="timeframe_title">Ends On:</p>
            <p className="timeframe_content" id="modalEndsOn">
              {challenge.endsOn}
            </p>
          </div>
        </div>
        <div className="tools_wrapper my-3">
          <p className="subTitle">Reward:</p>
          <p
            id="reward_container"
            className="m-0"
            style={{ color: "var(--primaryColor)", fontWeight: "500" }}
          >
            {challenge.reward}
          </p>
        </div>
        <div className="tools_wrapper my-3">
          <p className="subTitle">Tools to Use:</p>
          <ul id="tools_container" className="m-0 pt-2 ModaltoolsContainer">
            {challenge.tools.map((tool) => {
              const imgSrc = importImage(tool);
              return imgSrc ? (
                <li key={tool} className="tool_item">
                  {loading && <CircularProgress color="success" size={20} />}
                  <OverlayTrigger overlay={<Tooltip id={tool}>{tool}</Tooltip>}>
                    <img
                      className="toolImg"
                      src={imgSrc}
                      alt={tool}
                      onLoad={handleImageLoad}
                      style={{ display: loading ? "none" : "block" }}
                    />
                  </OverlayTrigger>
                </li>
              ) : (
                <li key={tool}>
                  <span>{tool}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="tools_wrapper my-3">
          <p className="subTitle">Submission Method:</p>
          <ul
            id="submissionMethod_container"
            className="m-0 pt-2 ModalmethodContainer"
          >
            {challenge.submissionMethod.map((method) => {
              const imgSrc = importImage(method);
              return imgSrc ? (
                <li key={method} className="tool_item">
                  {loading && <CircularProgress color="success" size={20} />}
                  <OverlayTrigger
                    overlay={<Tooltip id={method}>{method}</Tooltip>}
                  >
                    <img
                      className="toolImg"
                      src={imgSrc}
                      alt={method}
                      onLoad={handleImageLoad}
                      style={{ display: loading ? "none" : "block" }}
                    />
                  </OverlayTrigger>
                </li>
              ) : (
                <li key={method}>
                  <span>{method}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
        {type === "Enroll" ? (
          <>
            {isEnrolling ? (
              <button className="btn btn-success btn-sm" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Enrolling...</span>
              </button>
            ) : (
              <button
                id="enroll_submit_btn"
                className="btn btn-success btn-sm"
                onClick={() => enrollToChallenge(challenge)}
              >
                Enroll Now
              </button>
            )}
          </>
        ) : (
          <form>
            <div className="input-group mb-3">
              <span className="input-group-text" id="solution">
                <FontAwesomeIcon icon={faLink} />
              </span>
              <input
                type="text"
                className={`form-control shadow-none ${
                  !isValid ? "is-invalid" : ""
                }`}
                placeholder="Enter solution link to submit"
                aria-label="solution"
                aria-describedby="solution"
                defaultValue={""}
                onChange={handleChange}
              />
              {!isValid && (
                <div className="invalid-feedback">
                  Please enter a valid URL.
                </div>
              )}
            </div>
            {isSubmitting ? (
              <button className="btn btn-success btn-sm" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Submitting...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success btn-sm"
                onClick={() => submitSolution(challenge, url)}
                disabled={!isValid || !url}
              >
                Submit
              </button>
            )}
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
