import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import HeaderHomePage from "../HeaderHomePage";
import SupportWindow from "./SupportWindow";
import { Col, Row } from "antd";
import thumb from "../../../assets/images/thumb.png";
export const Support = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setVisible(false);
      }
    }
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [ref]);
  return (
    <div ref={ref}>
      <HeaderHomePage isShowBanner={false} />
      <Row style={{ marginTop: "20px" }}>
        <Col span={14}>
          <img src={thumb}></img>
        </Col>
        <Col span={9}>
          <span
            style={{ fontSize: "36px", fontWeight: 700 }}
          >
            Get Support
          </span>
          <p
            style={{
              fontSize: "18px",
              textAlign: "justify",
            }}
          >
            You can count on our team of highly skilled
            customer experience service experts who{" "}
            <br></br> take personal pride in giving top
            notch service to each and every customer
            <br />
            <br />
            Please note, we are able to respond much faster
            during our normal support hours of <br /> 5am -
            5pm Pacific Time (GMT-7 or GMT-8), Monday
            through Friday, except Holidays.
          </p>
          <SupportWindow visible={visible} />
          <Avatar
            onClick={() => setVisible(true)}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Support;
