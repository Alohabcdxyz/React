import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "antd";
import "./ProfileDoctor.scss";
import no_img from "../../../assets/images/noimg.jpg";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(
      this.props.doctorId
    );
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      //   this.getInforDoctor(this.props.doctorId);
      let data = await this.getInforDoctor(
        this.props.doctorId
      );
      this.setState({
        dataProfile: data,
      });
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderTimeBooking = (dataScheduleModal) => {
    let { language } = this.props;

    if (
      dataScheduleModal &&
      !_.isEmpty(dataScheduleModal)
    ) {
      let time =
        language === LANGUAGES.VI
          ? dataScheduleModal.timeTypeData.value_vi
          : dataScheduleModal.timeTypeData.value_en;
      let date =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment
                .unix(+dataScheduleModal.date / 1000)
                .format("dddd - DD/MM/YYYY")
            )
          : moment
              .unix(+dataScheduleModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id='patient.extra-infor.free' />{" "}
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let {
      language,
      isShowInfor,
      dataScheduleModal,
      isShowLinkDetail,
      isSHowPrice,
      doctorId,
    } = this.props;
    let { dataProfile } = this.state;
    let nameVi,
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.value_vi} ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.value_en} ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <>
        <Row className='intro-doctor'>
          <Col className='content-left' span={4}>
            <img
              src={
                dataProfile && dataProfile.image
                  ? dataProfile.image
                  : no_img
              }
              alt='doctor'
            />
          </Col>
          <Col className='content-right' span={20}>
            <div className='name-and-position'>
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className='information'>
              {isShowInfor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>
                        {language === LANGUAGES.VI
                          ? dataProfile.Markdown.description
                          : dataProfile.Markdown.value_en}
                      </span>
                    )}
                </>
              ) : (
                <>
                  {this.renderTimeBooking(
                    dataScheduleModal
                  )}
                </>
              )}
            </div>
          </Col>
          {isShowLinkDetail === true && (
            <div className='view-doctor'>
              <Link
                to={`/detail-doctor/${doctorId}`}
                style={{
                  textDecoration: "none",
                  marginLeft: "15px",
                }}
              >
                <FormattedMessage id='homepage.more' />
              </Link>
            </div>
          )}
          {isSHowPrice === true && (
            <Col className='price'>
              <FormattedMessage id='patient.extra-infor.price' />{" "}
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    value={
                      dataProfile.Doctor_Infor.priceData
                        .value_vi
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={
                      dataProfile.Doctor_Infor.priceData
                        .value_en
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
            </Col>
          )}
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDoctor);
