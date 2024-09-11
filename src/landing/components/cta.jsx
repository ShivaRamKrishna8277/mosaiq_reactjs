import { Container } from "react-bootstrap";
import ctoBanner from "../../assets/images/landing_cto_banner.svg";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <div className="cta_section">
      <div
        className="container-fluid p-0"
        style={{ backgroundColor: "var(--primaryColor)" }}
      >
        <Container>
          <div className="row g-0 mx-auto align-items-center flex-md-row-reverse">
            <div className="col-md-7">
              <p className="cta_title mb-2">
                Unleash Your Potential. Take Flight with <span>mosaiq</span>
              </p>
              <p className="cta_sub_title mb-3">
                Tired of feeling limited by your college tier? mosaiq bridges
                the gap between talented students and top companies. We connect
                you with the opportunities you deserve, no matter your location.
              </p>
              <Link to={"/login"}>
                <button className="ctaButtons px-5">Explore</button>
              </Link>
            </div>
            <div className="col-md-5">
              <img src={ctoBanner} alt="" className="cta_img d-block mx-auto" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
