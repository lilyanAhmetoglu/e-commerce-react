import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Panda</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Inforamtion</h2>
            <div className="business_info">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="info">
                  <div>Address</div>
                  <div>Istanbul / Turkey</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="info">
                  <div>Phone</div>
                  <div>+1 0000000 00</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="info">
                  <div>Working Hours</div>
                  <div>Mon-Sun/ 9am-6pm</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="info">
                  <div>Email</div>
                  <div>info@Kangaroo.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <p>
                Get all the latest information on events, sales and offers. You
                can miss out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
