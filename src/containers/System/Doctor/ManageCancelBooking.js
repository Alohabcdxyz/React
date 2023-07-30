import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageBooking.scss";
import { Col, Row, Button } from "antd";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctorCancelBooking,
  sendRemedyDetail,
} from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import ModalBill from "./ModalBill";
import LoadingOverlay from "react-loading-overlay";
import * as XLSX from "xlsx";

class ManageCancelBooking extends Component {
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
    let res = await getAllPatientForDoctorCancelBooking({
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

  exportExcel = () => {
    const { dataPatient, priceDoctor, language } =
      this.state;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    const header = [
      "STT",
      "Fullname",
      "Gender",
      "Address",
      "Time",
      "Phone",
      "Mail",
    ];
    const headerCellStyle = { font: { bold: true } };
    XLSX.utils.sheet_add_aoa(worksheet, [header], {
      origin: "A1",
      cellStyles: true,
      cellStyles: headerCellStyle,
    });

    const processedData = dataPatient.map((item, index) => {
      let gender =
        language === LANGUAGES.VI
          ? item.patientData.genderData.value_vi
          : item.patientData.genderData.value_en;
      let time =
        language === LANGUAGES.VI
          ? item.timeTypeDataBooking.value_vi
          : item.timeTypeDataBooking.value_en;
      return [
        index + 1,
        item.patientData.firstName,
        gender,
        item.patientData.address,
        time,
        item.patientData.phoneNumber,
        item.patientData.email,
      ];
    });
    XLSX.utils.sheet_add_aoa(worksheet, processedData, {
      origin: -1,
    });

    const columnWidths = header.map(() => ({ wch: 15 }));
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Patient Data"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const excelUrl = URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "patient_data.xlsx";
    link.click();
  };

  render() {
    let { dataPatient } = this.state;
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
              <FormattedMessage id='menu.doctor.cancel-booking' />
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
                      <FormattedMessage id='menu.doctor.phone' />
                    </th>
                    <th>
                      <FormattedMessage id='menu.doctor.mail' />
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
                          <td>
                            {item.patientData.phoneNumber}
                          </td>
                          <td>{item.patientData.email}</td>
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
              <Col style={{ marginTop: "20px" }}>
                <Button
                  onClick={this.exportExcel}
                  type='primary'
                >
                  Xuất Excel
                </Button>
              </Col>
            </Col>
          </Row>
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
)(ManageCancelBooking);
