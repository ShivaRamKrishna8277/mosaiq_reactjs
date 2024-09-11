import Modal from "react-bootstrap/Modal";

export default function CustomModal({ show, onClose, message, type }) {
  let color, bgcolor;

  switch (type) {
    case "info":
      color = "#1993D4";
      bgcolor = "#E5F7FC";
      break;
    case "success":
      color = "#408944";
      bgcolor = "#EDF6EC";
      break;
    case "error":
      color = "#D64140";
      bgcolor = "#FDEDED";
      break;
    default:
      color = "var(--textColor)";
      bgcolor = "white";
  }
  return (
    <Modal size="sm" show={show} onHide={onClose}>
      <Modal.Body
        style={{ backgroundColor: bgcolor }}
        className="rounded-2 text-center"
      >
        <p style={{ color: color }} className="m-0">
          {message}
        </p>
      </Modal.Body>
    </Modal>
  );
}
