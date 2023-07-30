import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageBooking.scss";
import { Col, Row, Button } from "antd";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  sendRemedyDetail,
} from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import ModalBill from "./ModalBill";
import LoadingOverlay from "react-loading-overlay";

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date())
        .startOf("day")
        .valueOf(),
      dataPatient: [],
      isOpenModalBill: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
      reason: item.patientData.reason,
    };
    this.setState({
      isOpenModalBill: true,
      dataModal: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModalBill: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataFromChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await sendRemedyDetail({
      email: dataFromChild.email,
      imgBase64: dataFromChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy Success");
      await this.getDataPatient();
      this.closeModal();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send Fail!");
    }
  };

  render() {
    let { dataPatient, isOpenModalBill, dataModal } =
      this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading...'
        >
          <Row className='manage-booking-container'>
            <Col className='manage-booking-title' span={24}>
              <FormattedMessage id='menu.doctor.manage-booking' />
            </Col>
            <Col className='manage-booking-body' span={24}>
              <Col className='' span={24}>
                <label>
                  <FormattedMessage id='menu.doctor.select-date' />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className='form-control'
                  value={this.state.currentDate}
                />
              </Col>
              <Col span={24}>
                <table>
                  <tr>
                    <th>
                      <FormattedMessage id='menu.doctor.stt' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.fullname' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.gender' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.address' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.time' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.reason' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.action' />
                    </th>
                  </tr>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      let gender =
                        language === LANGUAGES.VI
                          ? item.patientData.genderData
                              .value_vi
                          : item.patientData.genderData
                              .value_en;
                      let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeDataBooking
                              .value_vi
                          : item.timeTypeDataBooking
                              .value_en;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.patientData.firstName}
                          </td>
                          <td>{gender}</td>
                          <td>
                            {item.patientData.address}
                          </td>
                          <td>{time}</td>
                          <td>{item.patientData.reason}</td>
                          <td>
                            <Button
                              type='primary'
                              onClick={() => {
                                this.handleConfirm(item);
                              }}
                              style={{
                                marginRight: "10px",
                              }}
                            >
                              <FormattedMessage id='menu.doctor.save' />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ textAlign: "center" }}
                      >
                        <FormattedMessage id='menu.doctor.nodata' />
                      </td>
                    </tr>
                  )}
                </table>
              </Col>
            </Col>
          </Row>
          <ModalBill
            isOpenModal={isOpenModalBill}
            dataModal={dataModal}
            closeModalBill={this.closeModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBooking);
