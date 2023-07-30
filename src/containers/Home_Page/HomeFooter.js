import React, { Component } from "react";

import { connect } from "react-redux";
import PhoBo from "../../assets/images/fb.svg";
import YTB from "../../assets/images/ytb.svg";
import { Col, Row, List } from "antd";
import logo from "../../assets/images/logo.svg";
import tick from "../../assets/images/tick.svg";
import location from "../../assets/images/location.svg";
import bocongthuong from "../../assets/images/bo-cong-thuong.svg";
import "./HomeFooter.scss";
import down from "../../assets/images/down.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
const data = [
  {
    title: "Liên hệ hợp tác",
    titleEn: "Contact for cooperation",
  },
  {
    title: "Sưc khỏe doanh nghiệp",
    titleEn: "Business Health",
  },
  {
    title: "Danh bạ y tế",
    titleEn: "Medical Directory",
  },
  {
    title: "Gói chuyển đổi số doanh nghiệp",
    titleEn: "Business Digital Transformation Package",
  },
  {
    title: "Tuyển dụng",
    titleEn: "Recruitment",
  },
  {
    title: "Câu hỏi thường gặp",
    titleEn: "Frequently Asked Questions",
  },
  {
    title: "Điều khoản sử dụng",
    titleEn: "Terms of Use",
  },
];
const emailAddress = "support@bookingcare.vn";
const subject = "Bạn cần trợ giúp";
const body = "Nội dung email";

const handleEmailLinkClick = () => {
  window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};
class HomeFooter extends Component {
  render() {
    let { language } = this.props;
    return (
      <>
        <div className='all'>
          {" "}
          <Row className='top-footer'>
            <Col span={10} className='first-child'>
              <img
                src={logo}
                alt='logo'
                className='logo-footer'
              ></img>
              <h4>
                <FormattedMessage id='footer.name' />
              </h4>
              <div className='infor'>
                <p>
                  <img src={location} alt='location'></img>
                  <FormattedMessage id='footer.address' />
                </p>
                <p>
                  <img src={tick} alt='tick'></img>
                  <FormattedMessage id='footer.bct' />
                </p>
              </div>
              <div className='check'>
                <a
                  href='http://online.gov.vn/Home/WebDetails/68563'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    src={bocongthuong}
                    alt='bo-cong-thuong'
                  ></img>
                </a>
              </div>
            </Col>
            <Col span={7} className='second-child'>
              <List
                itemLayout='horizontal'
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <a
                          href='#'
                          style={{
                            textDecoration: "none",
                            color: "#45c3d2",
                          }}
                        >
                          {language === LANGUAGES.VI
                            ? item.title
                            : item.titleEn}
                        </a>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={7} className='last-child'>
              <h4>
                {" "}
                <FormattedMessage id='footer.hnoi' />
              </h4>
              <p>
                <FormattedMessage id='footer.hnoi-address' />
              </p>
              <h4>
                {" "}
                <FormattedMessage id='footer.vp' />
              </h4>
              <p>
                {" "}
                <FormattedMessage id='footer.vp-address' />
              </p>
              <h4>
                {" "}
                <FormattedMessage id='footer.sp' />
              </h4>
              <p>
                <button
                  style={{
                    outline: "none",
                    border: "none",
                  }}
                  onClick={handleEmailLinkClick}
                >
                  {emailAddress}
                </button>{" "}
                || 024-7301-2468 (7h - 18h)
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col span={24} className='download'>
              <img src={down} alt='download'></img> Tải ứng
              dụng MinhCare cho điện thoại hoặc máy tính
              bảng:{" "}
              <a
                href='https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare'
                target='_blank'
                rel='noreferrer'
                style={{
                  color: "#45c3d2",
                }}
              >
                Android
              </a>
              -
              <a
                href='https://apps.apple.com/vn/app/bookingcare/id1347700144'
                target='_blank'
                rel='noreferrer'
                style={{
                  color: "#45c3d2",
                }}
              >
                iPhone/iPad
              </a>
              -
              <a
                href='https://bookingcare.vn/app'
                target='_blank'
                rel='noreferrer'
                style={{
                  color: "#45c3d2",
                }}
              >
                Khác
              </a>
            </Col>
          </Row>
          <Row className='home-footer-container'>
            <Col span={12} className='text'>
              © 2023 BookingCare with Nguyễn Tuấn Minh.
            </Col>
            <Col
              push={7}
              span={12}
              className='right-home-footer'
            >
              <a
                href='https://www.facebook.com/bookingcare'
                target='_blank'
                rel='noreferrer'
              >
                <img src={PhoBo} alt='fb'></img>
              </a>
              <a
                href='https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ'
                target='_blank'
                rel='noreferrer'
              >
                <img src={YTB} alt='ytb'></img>
              </a>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeFooter);
