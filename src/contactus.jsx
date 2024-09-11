import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandingNavBar from "./landing/components/navbar";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Contactus() {
  return (
    <div style={{ backgroundColor: "#fff6ee" }}>
      <LandingNavBar />
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <p className="opacity-50 fw-semibold text-center">mosaiq</p>
        <section className="mb-5 text-center px-lg-5">
          <p className="sectionTitleNoto">Contact Us</p>
          <p className="sectionContentNoto">
            We're here to help! Reach out to us with any questions, concerns, or
            feedback you may have. We provide you with the information and
            assistance you need. Whether you need support, have inquiries, or
            simply want to connect, we're just a message away.
          </p>
          <form action="" method="post" id="contact_us_form">
            <div className="container-fluid">
              <div className="row g-4 justify-content-between">
                <div className="col-sm-6 col-12">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="form_input"
                    id="Fullname"
                    required=""
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="form_input"
                    id="Email"
                    required=" "
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    className="form_input"
                    id="Mobile"
                    minLength="10"
                    maxLength="10"
                    required=""
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <select
                    name="querry_category"
                    id="querry_category"
                    className="form_input"
                    required=""
                  >
                    <option defaultValue="--">Choose Category *</option>
                    <option defaultValue="General Inquiry">
                      General Inquiry
                    </option>
                    <option defaultValue="Technical Support">
                      Technical Support
                    </option>
                    <option defaultValue="Product Feedback">
                      Product Feedback
                    </option>
                    <option defaultValue="Feature Requests">
                      Feature Requests
                    </option>
                    <option defaultValue="Career Opportunities">
                      Career Opportunities
                    </option>
                    <option defaultValue="Others">Others</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea
                    name="querry"
                    id="querry"
                    placeholder="How can we help? *"
                    rows="4"
                    style={{ resize: "none" }}
                    className="form_input"
                    required=""
                  ></textarea>
                </div>
              </div>
            </div>
            <button type="submit" id="submit_btn">
              Submit
            </button>
          </form>
        </section>
        <section className="mb-5 text-center px-lg-5">
          <p className="sectionTitleNoto">Get in touch with us</p>
          <div className="container-fluid">
            <div className="row g-0 justify-content-between">
              <div className="col-lg-7 col-12 mb-4 mb-lg-0 rounded-3 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3828.2540701999565!2d77.36108814620404!3d16.361014877032652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721050058836!5m2!1sen!2sin"
                  style={{
                    border: "0",
                    width: "100%",
                    minHeight: "400px",
                    height: "100%",
                    border: "2px solid #E1E1E1",
                    borderRadius: "5px",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-lg-5 col-12 ps-lg-3">
                <div
                  className="p-3 h-100 d-flex flex-column justify-content-between"
                  style={{
                    backgroundColor: "#FFEFDC",
                    borderRadius: "5px",
                    minHeight: "400px",
                  }}
                >
                  <ul className="text-start d-flex flex-column gap-3 p-0 m-0">
                    <li>
                      <p className="other_sub_title">Address</p>
                      <p className="content">
                        Shaktinagar, Raichur, Karnataka - 584170
                      </p>
                    </li>
                    <li>
                      <p className="other_sub_title">Email Address</p>
                      <p className="content">support@mosaiq.in</p>
                    </li>
                    <li>
                      <p className="other_sub_title">Telephone</p>
                      <p className="content">9380248374</p>
                    </li>
                  </ul>
                  <ul className="text-start d-flex align-items-center gap-3 p-0 m-0">
                    <li className="social_media_wrapper">
                      <Link to={"/contact-us"}>
                        <FontAwesomeIcon icon={faFacebook} />
                      </Link>
                    </li>
                    <li className="social_media_wrapper">
                      <Link to={"/contact-us"}>
                        <FontAwesomeIcon icon={faXTwitter} />
                      </Link>
                    </li>
                    <li className="social_media_wrapper">
                      <Link to={"/contact-us"}>
                        <FontAwesomeIcon icon={faLinkedin} />
                      </Link>
                    </li>
                    <li className="social_media_wrapper">
                      <Link to={"/contact-us"}>
                        <FontAwesomeIcon icon={faYoutube} />
                      </Link>
                    </li>
                    <li className="social_media_wrapper">
                      <Link to={"/contact-us"}>
                        <FontAwesomeIcon icon={faInstagram} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
