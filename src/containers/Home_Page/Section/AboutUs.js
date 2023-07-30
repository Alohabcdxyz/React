import { Col, Row } from "antd";
import React, { Component } from "react";

import { connect } from "react-redux";
import boyte from "../../../assets/images/aboutus/boyte.png";
import itc from "../../../assets/images/aboutus/ictnews.png";
import suckhoedoisong from "../../../assets/images/aboutus/suckhoedoisong.png";
import vnex from "../../../assets/images/aboutus/vnexpress.png";
import vtv1 from "../../../assets/images/aboutus/vtv1.png";
import "./AboutUs.scss";
import { FormattedMessage } from "react-intl";
class AboutUs extends Component {
  render() {
    return (
      <>
        <Row className='aboutus-container'>
          <Col span={24} className='aboutus-header'>
            <FormattedMessage id='homepage.aboutus' />
          </Col>
          <Col span={12} className='video-aboutus'>
            <iframe
              width='100%'
              height='350px'
              src='https://www.youtube.com/embed/FyDQljKtWnI'
              title='CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowfullscreen
            ></iframe>
          </Col>
          <Col span={12} className='link'>
            <Row>
              <Col push={3} span={9} className='link-news'>
                <a
                  href='https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={boyte} alt='boyte'></img>
                </a>
              </Col>
              <Col push={3} span={9} className='link-news'>
                <a
                  href='https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={itc} alt='ictnews'></img>
                </a>
              </Col>
              <Col push={3} span={9} className='link-news'>
                <a
                  href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    src={suckhoedoisong}
                    alt='suckhoedoisong'
                  ></img>
                </a>
              </Col>
              <Col push={3} span={9} className='link-news'>
                <a
                  href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={vnex} alt='vnex'></img>
                </a>
              </Col>
              <Col push={3} span={9} className='link-news'>
                <a
                  href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={vtv1} alt='vtv1'></img>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
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
)(AboutUs);
