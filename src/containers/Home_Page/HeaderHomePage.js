import React, { Component } from "react";

import { connect } from "react-redux";
import { Col, Row } from "antd";
import "./HeaderHome.scss";
import khamchuyenkhoa from "../../assets/images/khamchuyenkhoa.png";
import khamtongquat from "../../assets/images/khamtongquat.png";
import suckhoetinhthan from "../../assets/images/suckhoetinhthan.png";
import khamnhakhoa from "../../assets/images/khamnhakhoa.png";
import Android from "../../assets/images/android.svg";
import IOS from "../../assets/images/appstore.svg";
import VNam from "../../assets/images/vietnamflag.png";
import Usa from "../../assets/images/americanflag.jpg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLaguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnHome = () => {
    this.props.history.push("/home");
  };

  linkTo = () => {
    this.props.history.push("/support");
  };
  render() {
    return (
      <>
        <Row className='home-header-container'>
          <Col span={5} className='left-header'>
            <i className='fas fa-bars'></i>
            <image
              style={{ cursor: "pointer" }}
              className='logo'
              onClick={() => [this.returnHome()]}
            ></image>
          </Col>
          <Col span={14} className='center-header'>
            <Row className='center-content'>
              <Col span={2}></Col>
              <Col span={6} className='content-child'>
                <b>
                  <FormattedMessage id='homeheader.speciality' />
                </b>
                <p>
                  <FormattedMessage id='homeheader.searchdoctor' />
                </p>
              </Col>
              <Col span={6} className='content-child'>
                <b>
                  {" "}
                  <FormattedMessage id='homeheader.health-facility' />
                </b>
                <p>
                  <FormattedMessage id='homeheader.select-room' />
                </p>
              </Col>
              <Col span={4} className='content-child'>
                <b>
                  <FormattedMessage id='homeheader.doctor' />
                </b>
                <p>
                  <FormattedMessage id='homeheader.select-good-doctor' />
                </p>
              </Col>
              <Col span={6} className='content-child'>
                <b>
                  <FormattedMessage id='homeheader.fee' />
                </b>
                <p>
                  <FormattedMessage id='homeheader.check-health' />
                </p>
              </Col>
            </Row>
          </Col>
          <Col push={1} span={5} className='right-header'>
            <div className='flag'>
              <img
                className='VietNam'
                src={VNam}
                alt='VietNam'
                onClick={() => {
                  this.changeLanguage(LANGUAGES.VI);
                }}
              />{" "}
              |{" "}
              <img
                className='USA'
                src={Usa}
                alt='USA'
                onClick={() => {
                  this.changeLanguage(LANGUAGES.EN);
                }}
              />
            </div>
            <div className='support'>
              <i className='fas fa-question-circle' /> {""}
              <span onClick={() => this.linkTo()}>
                <FormattedMessage id='homeheader.support' />
              </span>
              <div className='tele'>024-7301-2468 </div>
            </div>
          </Col>
        </Row>
        {this.props.isShowBanner === true && (
          <div className='home-header-banner'>
            <div className='up'>
              <div className='title1'>
                <FormattedMessage id='banner.title1' />
              </div>
              <div className='title2'>
                <FormattedMessage id='banner.title2' />
              </div>
            </div>
            <div className='down'>
              <Row className='dowload'>
                <Col span={9}></Col>
                <Col span={3} className='android'>
                  <a
                    href='https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={Android} alt='android' />
                  </a>
                </Col>
                <Col span={3} className='ios'>
                  <a
                    href='https://apps.apple.com/vn/app/bookingcare/id1347700144'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={IOS} alt='ios' />
                  </a>
                </Col>
                <Col span={9}></Col>
              </Row>
              <Row className='option'>
                <Col span={6} className='option-child'>
                  <div className='icon-child'>
                    <img
                      src={khamchuyenkhoa}
                      alt='khamchuyenkhoa'
                    />
                  </div>
                  <div className='text-child'>
                    <FormattedMessage id='banner.Specialized-examination' />
                  </div>
                </Col>

                <Col span={6} className='option-child'>
                  <div className='icon-child'>
                    <img
                      src={khamtongquat}
                      alt='khamtongquat'
                    />
                  </div>
                  <div className='text-child'>
                    <FormattedMessage id='banner.General-examination' />
                  </div>
                </Col>

                <Col span={6} className='option-child'>
                  <div className='icon-child'>
                    <img
                      src={suckhoetinhthan}
                      alt='suckhoetinhthan'
                    />
                  </div>
                  <div className='text-child'>
                    <FormattedMessage id='banner.Mental-health' />
                  </div>
                </Col>
                <Col span={6} className='option-child'>
                  <div className='icon-child'>
                    <img
                      src={khamnhakhoa}
                      alt='khamnhakhoa'
                    />
                  </div>
                  <div className='text-child'>
                    <FormattedMessage id='banner.Dental-examination' />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
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
  return {
    changeLanguageAppRedux: (language) =>
      dispatch(changeLaguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
