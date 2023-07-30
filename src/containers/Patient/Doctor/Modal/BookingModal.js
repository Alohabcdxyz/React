import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import { Col, Row } from "antd";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birth: "",
      genders: "",
      doctorId: "",
      selectedGender: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label =
          language === LANGUAGES.VI
            ? item.value_vi
            : item.value_en;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (
      this.props.dataScheduleModal !==
      prevProps.dataScheduleModal
    ) {
      if (
        this.props.dataScheduleModal &&
        !_.isEmpty(this.props.dataScheduleModal)
      ) {
        let doctorId =
          this.props.dataScheduleModal.doctorId;
        this.setState({
          doctorId: doctorId,
          timeType: this.props.dataScheduleModal.timeType,
        });
      }
    }
  }

  handelOnChangeInp = (event, id) => {
    let valueInp = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInp;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birth: date[0],
    });
  };

  handleChange = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birth).getTime();
    let timeString = this.buildTimeBooking(
      this.props.dataScheduleModal
    );
    let doctorName = this.buildDoctorName(
      this.props.dataScheduleModal
    );
    let res = await postPatientBooking({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataScheduleModal.date,
      birthday: date,
      doctorId: this.state.doctorId,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    console.log("check state", this.state);

    if (res && res.errCode === 0) {
      toast.success("Booking new appointment success");
      this.props.closeBooking();
    } else if (res && res.errResult === "already") {
      toast.error(res.errMessage);
    } else {
      toast.error("Booking new appointment fail");
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buildTimeBooking = (dataScheduleModal) => {
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
      return `  ${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataScheduleModal) => {
    let { language } = this.props;

    if (
      dataScheduleModal &&
      !_.isEmpty(dataScheduleModal)
    ) {
      let name =
        language === LANGUAGES.VI
          ? `${dataScheduleModal.doctorData.lastName} ${dataScheduleModal.doctorData.firstName}`
          : `${dataScheduleModal.doctorData.firstName} ${dataScheduleModal.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  checkEmail = () => {
    const input = document.querySelector("#email");
    const display = document.querySelector("#result");
    if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
      display.style.color = "#008000";
      display.innerHTML = input.value + " is valid";
    } else {
      display.style.color = "#FF0000";

      display.innerHTML =
        input.value + " is not a valid email";
    }
  };

  checkPhoneNumber = () => {
    var mobile = document.getElementById("phoneNumber");

    var message = document.getElementById("message");

    var goodColor = "#FF0000";
    var badColor = "#FFFFFF";

    if (
      mobile.value.length > 10 ||
      mobile.value.length < 10
    ) {
      mobile.style.backgroundColor = badColor;
      message.style.color = goodColor;
      message.innerHTML =
        "required 10 digits, match requested format!";
    } else {
      message.innerHTML = "";
    }
  };

  render() {
    let { isOpenModal, closeBooking, dataScheduleModal } =
      this.props;
    let doctorId = "";
    if (
      dataScheduleModal &&
      !_.isEmpty(dataScheduleModal)
    ) {
      doctorId = dataScheduleModal.doctorId;
    }

    return (
      <>
        <Modal
          size='lg'
          centered
          isOpen={isOpenModal}
          className={"ModalUserClassName"}
        >
          <div className='booking-modal-content'>
            <Row className='booking-modal-header'>
              <Col span={23} className='booking-title'>
                <FormattedMessage id='patient.booking.title' />
              </Col>
              <Col
                className='closeModal'
                span={1}
                onClick={closeBooking}
              >
                <i className='fas fa-times'></i>
              </Col>
            </Row>
            <Row
              className='booking-modal-body'
              style={{ gap: "10px" }}
            >
              <Col className='doctorInfo' span={24}>
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowInfor={false}
                  dataScheduleModal={dataScheduleModal}
                  isShowLinkDetail={false}
                  isSHowPrice={true}
                />
              </Col>
              <Col span={7}>
                <label>
                  <FormattedMessage id='patient.booking.fullname' />
                </label>
                <input
                  className='form-control'
                  value={this.state.fullName}
                  onChange={(event) => {
                    this.handelOnChangeInp(
                      event,
                      "fullName"
                    );
                  }}
                />
              </Col>
              <Col span={7}>
                <label>
                  <FormattedMessage id='patient.booking.phone' />
                </label>
                <input
                  id='phoneNumber'
                  className='form-control'
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handelOnChangeInp(
                      event,
                      "phoneNumber"
                    );
                  }}
                  onKeyUp={() => this.checkPhoneNumber()}
                />
                <span id='message'></span>
              </Col>
              <Col span={7}>
                <label>
                  <FormattedMessage id='patient.booking.email' />
                </label>
                <input
                  id='email'
                  className='form-control'
                  value={this.state.email}
                  onChange={(event) => {
                    this.handelOnChangeInp(event, "email");
                  }}
                  onKeyUp={() => this.checkEmail()}
                />
                <p id='result'></p>
              </Col>
              <Col span={11}>
                <label>
                  <FormattedMessage id='patient.booking.gender' />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChange}
                  options={this.state.genders}
                />
              </Col>
              <Col span={11}>
                <label>
                  <FormattedMessage id='patient.booking.birth' />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className='form-control'
                  value={this.state.birth}
                  // minDate={yesterday}
                />
              </Col>
              <Col span={24}>
                <label>
                  <FormattedMessage id='patient.booking.address' />
                </label>
                <input
                  className='form-control'
                  value={this.state.address}
                  onChange={(event) => {
                    this.handelOnChangeInp(
                      event,
                      "address"
                    );
                  }}
                />
              </Col>
              <Col span={24}>
                <label>
                  <FormattedMessage id='patient.booking.reason' />
                </label>
                <input
                  className='form-control'
                  value={this.state.reason}
                  onChange={(event) => {
                    this.handelOnChangeInp(event, "reason");
                  }}
                />
              </Col>
            </Row>
            <Row className='booking-modal-footer'>
              <button
                className='btn-booking-confirm'
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id='patient.booking.confirm' />
              </button>
              <button
                className='btn-booking-cancel'
                onClick={closeBooking}
              >
                <FormattedMessage id='patient.booking.cancel' />
              </button>
            </Row>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingModal);
