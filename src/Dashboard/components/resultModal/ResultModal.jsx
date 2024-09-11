import { Modal } from "react-bootstrap";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const ResultModal = ({ status, message, show, onHide, menuIndex }) => {
  const animationContainerRef = useRef(null); // Ref for the animation container

  useEffect(() => {
    if (show) {
      // Determine the correct animation file based on the status
      const animationFile =
        status === "success"
          ? require("../../../assets/animations/success.json")
          : require("../../../assets/animations/error.json");

      // Load the animation using Lottie
      const animation = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationFile,
      });

      // Clean up the animation when the component unmounts or show changes
      return () => {
        animation.destroy();
      };
    }
  }, [show, status]);

  // Automatically close the modal after 2 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
        // Simulate clicking a menu item after the modal closes
        document.querySelectorAll(".menu_item")[menuIndex]?.click();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onHide, menuIndex]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <div ref={animationContainerRef} style={{ height: "200px" }}></div>
        <p className="text-center">{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
