import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { Col, Row } from "antd";
import { getExxtraInforDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExxtraInforDoctorById(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      this.props.doctorIdFromParent !==
      prevProps.doctorIdFromParent
    ) {
      let res = await getExxtraInforDoctorById(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHide = (status) => {
    this.setState({
      isShowDetail: status,
    });
  };

  render() {
    let { isShowDetail, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className='doctor-extra-infor-container'>
          <div className='content-up'>
            <div className='text-address'>
              <FormattedMessage id='patient.extra-infor.address' />
            </div>
            <div className='name-clinic'>
              {extraInfor && extraInfor.nameClinic
                ? extraInfor.nameClinic
                : ""}
            </div>
            <div className='clinic-address'>
              {extraInfor && extraInfor.addressClinic
                ? extraInfor.addressClinic
                : ""}
            </div>
          </div>
          <div className='content-down'>
            {isShowDetail === false ? (
              <div className='hide1'>
                <FormattedMessage id='patient.extra-infor.price' />{" "}
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={extraInfor.priceData.value_vi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={extraInfor.priceData.value_en}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}{" "}
                <span
                  className='hide'
                  onClick={() => this.showHide(true)}
                >
                  <FormattedMessage id='patient.extra-infor.detail' />
                </span>
              </div>
            ) : (
              <>
                <div className='price'>
                  <FormattedMessage id='patient.extra-infor.price' />
                </div>

                <Row className='detail-price'>
                  <Col span={21}>
                    <FormattedMessage id='patient.extra-infor.price' />
                  </Col>
                  <Col span={2} pull={1}>
                    {extraInfor &&
                      extraInfor.priceData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          value={
                            extraInfor.priceData.value_vi
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={
                            extraInfor.priceData.value_en
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </Col>
                  <Col span={24} className='detail-text'>
                    {extraInfor && extraInfor.note
                      ? extraInfor.note
                      : ""}
                  </Col>
                </Row>

                <div className='paymnet'>
                  <FormattedMessage id='patient.extra-infor.payment' />{" "}
                  {extraInfor &&
                  extraInfor.paymentData &&
                  language === LANGUAGES.VI
                    ? extraInfor.paymentData.value_vi
                    : ""}
                  {extraInfor &&
                  extraInfor.paymentData &&
                  language === LANGUAGES.EN
                    ? extraInfor.paymentData.value_en
                    : ""}
                </div>
                <div
                  className='hide'
                  onClick={() => this.showHide(false)}
                >
                  <FormattedMessage id='patient.extra-infor.hide' />
                </div>
              </>
            )}
          </div>
        </div>
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
)(DoctorExtraInfor);
