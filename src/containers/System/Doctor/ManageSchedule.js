import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import { Col, Row, Button } from "antd";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctorDate: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    // this.props.fetchAllDoctorRedux();
    this.props.fetchAllSchduleTime();
    let data = this.buildDataInputSelect();
    if (data && data.length > 0) {
      this.setState({
        listDoctor: [...data],
        selectedDoctorDate: data[0],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (
    //   prevProps.dataAllDoctor !== this.props.dataAllDoctor
    // ) {
    //   let dataSelect = this.buildDataInputSelect(
    //     this.props.dataAllDoctor
    //   );
    //   this.setState({
    //     listDoctor: dataSelect,
    //   });
    // }
    if (
      prevProps.allScheduleTime !==
      this.props.allScheduleTime
    ) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataInputSelect = (inpData) => {
    let result = [];
    let { language } = this.props;
    // if (inpData && inpData.length > 0) {
    //   inpData.map((item, index) => {
    //     let obj = {};
    //     let labelVi = `${item.lastName} ${item.firstName}`;
    //     let labelEn = `${item.firstName} ${item.lastName}`;
    //     obj.label =
    //       language === LANGUAGES.VI ? labelVi : labelEn;
    //     obj.value = item.id;
    //     result.push(obj);
    //   });
    // }
    if (this.props.userInfo) {
      let item = this.props.userInfo;
      let object = {};
      let labelVi = `${item.lastName} ${item.firstName}`;
      let labelEn = `${item.firstName} ${item.lastName}`;
      object.label =
        language === LANGUAGES.VI ? labelVi : labelEn;
      object.value = item.id;
      // object.isDisabled = true;
      result.push(object);
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctorDate: selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id)
          item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveShedule = async () => {
    let { rangeTime, selectedDoctorDate, currentDate } =
      this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid Date!");
      return;
    }
    if (
      selectedDoctorDate &&
      _.isEmpty(selectedDoctorDate)
    ) {
      toast.error("Invalid Doctor!");
      return;
    }
    // let formattedDate = moment(currentDate).format(
    //   dateFormat.SEND_TO_SERVER
    // );
    // let formattedDate = moment(currentDate).unix();
    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(
        (item) => item.isSelected === true
      );
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let obj = {};
          obj.doctorId = selectedDoctorDate.value;
          obj.date = formattedDate;
          obj.timeType = schedule.keyMap;
          result.push(obj);
        });
      } else {
        toast.error("Invalid Selected Time!");
        return;
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctorDate.value,
      formattedDate: formattedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save schedule success");
    } else {
      toast.error("Save schedule fail");
    }
  };

  render() {
    let yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    );
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className='manage-schedule-container'>
          <div className='manage-schedule-title'>
            <FormattedMessage id='manage-schedule.title' />
          </div>
          <Row className='container'>
            <Col span={11}>
              <label>
                <FormattedMessage id='manage-schedule.choose-doctor' />
              </label>
              <Select
                value={this.state.selectedDoctorDate}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                isDisabled={true}
              />
            </Col>
            <Col span={2} />
            <Col span={11}>
              <label>
                <FormattedMessage id='manage-schedule.choose-date' />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className='form-control'
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </Col>
            <Col span={24} className='pick-hour'>
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <>
                      <button
                        className={
                          item.isSelected === true
                            ? "btn-schedule active"
                            : "btn-schedule"
                        }
                        key={index}
                        onClick={() =>
                          this.handleClickBtnTime(item)
                        }
                      >
                        {language === LANGUAGES.VI
                          ? item.value_vi
                          : item.value_en}
                      </button>
                    </>
                  );
                })}
            </Col>
            <Col span={24} className='btn-save'>
              <Button
                type='primary'
                onClick={() => this.handleSaveShedule()}
              >
                <FormattedMessage id='manage-schedule.save' />
              </Button>
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
    dataAllDoctor: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () =>
      dispatch(actions.fetchAllDoctor()),
    fetchAllSchduleTime: () =>
      dispatch(actions.fetchAllSchduleTime()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSchedule);
