import { Container } from "react-bootstrap";
import checkBox from "../../assets/icons/check_box.png";
import benefitsBanner from "../../assets/images/benefits_banner.png";

export default function Benefits() {
  return (
    <Container>
      <div className="benefits_section my-5">
        <div className="container-fluid p-0 w-1300 mx-auto">
          <div className="row g-0 align-items-center">
            <div className="col-lg-8 col-md-6 pb-md-4">
              <p className="sec_title mb-5">
                Work on Your Schedule, <span>Earn on Your Terms</span>
              </p>
              <ul className="p-0">
                <li className="benefit_point">
                  <div className="benefit_title_wrapper">
                    <img src={checkBox} alt="" className="check_icon" />
                    <p className="benefit_title">Put Your Skills to the Test</p>
                  </div>
                  <p className="benefit_desc">
                    Challenge yourself with a wide range of projects across
                    various fields. Showcase your problem-solving abilities and
                    prove your expertise to the Mosaiq community.
                  </p>
                </li>
                <li className="benefit_point">
                  <div className="benefit_title_wrapper">
                    <img src={checkBox} alt="" className="check_icon" />
                    <p className="benefit_title">Flexible Work Schedule</p>
                  </div>
                  <p className="benefit_desc">
                    Work on projects whenever it suits you. Mosaiq allows you to
                    set your own pace and choose projects that fit your
                    schedule.
                  </p>
                </li>
                <li className="benefit_point">
                  <div className="benefit_title_wrapper">
                    <img src={checkBox} alt="" className="check_icon" />
                    <p className="benefit_title">Guaranteed Rewards</p>
                  </div>
                  <p className="benefit_desc">
                    Get rewarded for your expertise! Submit the best solutions
                    based on pre-defined metrics and earn competitive rewards.
                    Mosaiq ensures your hard work is recognized and financially
                    compensated.
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={benefitsBanner}
                alt=""
                id="benefits_img"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
