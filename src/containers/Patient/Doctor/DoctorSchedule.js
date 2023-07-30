import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import {
  getScheduleDoctorByDate,
  getScheduleDoctorBookingByDate,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "antd";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleModal: {},
      bookingTime: [],
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDay = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let labelVi = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${labelVi}`;
          obj.label = today;
        } else {
          let labelViFirstCharacter = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          obj.label = this.capitalizeFirstLetter(
            labelViFirstCharacter
          );
        }
      } else {
        if (i === 0) {
          let labelEn = moment(new Date()).format("DD/MM");
          let today = `Today - ${labelEn}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      obj.value = moment(new Date())
        .add(i, "days")
        .startOf("day")
        .valueOf();
      allDay.push(obj);
    }
    return allDay;
  };

  async componentDidMount() {
    let { language } = this.props;
    let allDay = this.getArrDays(language);
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDay[0].value
      );
      let res2 = await getScheduleDoctorBookingByDate(
        this.props.doctorIdFromParent,
        allDay[0].value
      );
      console.log("Lịch đã book");
      console.log(res2);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
        bookingTime: res2.data ? res2.data : [],
      });
    }

    this.setState({
      allDay: allDay,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDay = this.getArrDays(this.props.language);
      this.setState({
        allDay: allDay,
      });
    }

    if (
      this.props.doctorIdFromParent !==
      prevProps.doctorIdFromParent
    ) {
      let allDay = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDay[0].value
      );
      let res2 = await getScheduleDoctorBookingByDate(
        this.props.doctorIdFromParent,
        allDay[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
        bookingTime: res2.data ? res2.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (
      this.props.doctorIdFromParent &&
      this.props.doctorIdFromParent !== -1
    ) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(
        doctorId,
        date
      );

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleClickScheduleTimeModal = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleModal: time,
    });
  };

  closeModalBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDay,
      allAvailableTime,
      bookingTime,
      isOpenModalBooking,
      dataScheduleModal,
    } = this.state;
    let { language } = this.props;
    console.log(bookingTime);
    return (
      <>
        <div className='doctor-schedule-container'>
          <div className='all-schedule'>
            <select
              onChange={(event) => {
                this.handleOnChangeSelect(event);
              }}
            >
              {allDay &&
                allDay.length > 0 &&
                allDay.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className='all-time-available'>
            <div className='calendar'>
              <i className='fas fa-calendar-alt'>
                <span>
                  <FormattedMessage id='patient.detail-doctor.schedule' />
                </span>
              </i>
            </div>
            <div className='time-content'>
              {allAvailableTime &&
              allAvailableTime.length > 0 ? (
                <>
                  <Row>
                    <Col
                      span={24}
                      className='time-content-btns'
                    >
                      {allAvailableTime.map(
                        (item, index) => {
                          let timeDisplay =
                            language === LANGUAGES.VI
                              ? item.timeTypeData.value_vi
                              : item.timeTypeData.value_en;
                          const isTimeBooked =
                            bookingTime.some(
                              (bookingItem) =>
                                bookingItem.timeType ===
                                  item.timeType &&
                                bookingItem.date ===
                                  item.date
                            );

                          return (
                            <>
                              <button
                                className={
                                  language === LANGUAGES.VI
                                    ? "btn-vi"
                                    : "btn-en"
                                }
                                onClick={() => {
                                  this.handleClickScheduleTimeModal(
                                    item
                                  );
                                }}
                                key={index}
                                disabled={isTimeBooked}
                              >
                                {timeDisplay}
                              </button>
                            </>
                          );
                        }
                      )}
                    </Col>
                    <Col span={24} className='book-free'>
                      <FormattedMessage id='patient.detail-doctor.choose' />
                      <i className='far fa-hand-point-up'></i>
                      <FormattedMessage id='patient.detail-doctor.free' />
                    </Col>
                  </Row>
                </>
              ) : (
                <div className='no-schedule'>
                  <FormattedMessage id='patient.detail-doctor.note' />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBooking={this.closeModalBooking}
          dataScheduleModal={dataScheduleModal}
        />
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
)(DoctorSchedule);
