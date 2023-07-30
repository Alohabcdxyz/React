import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import { Col, Row, Button } from "antd";
import doctor from "../../../assets/images/doctor.svg";
import cli from "../../../assets/images/cli.svg";
import news from "../../../assets/images/news.svg";
import medical from "../../../assets/images/medical.svg";
import "./Dashboard.scss";
import {
  getAllClinic,
  getAllDoctorService,
  getAllHandbook,
  getAllSpecialty,
  getScheduleDoctorByDate,
} from "../../../services/userService";
import * as XLSX from "xlsx";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicCount: 0,
      doctorCount: 0,
      speCount: 0,
      handbookCount: 0,
      itemsWithoutSchedule: [],
      itemsWithSchedule: [],
      allDay: [],
      currentDate: moment(new Date())
        .startOf("day")
        .valueOf(),
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
    let cliCount = await getAllClinic();
    let doctorCount = await getAllDoctorService();
    let speCount = await getAllSpecialty();
    let handbookCount = await getAllHandbook();

    if (
      (cliCount && cliCount.errCode === 0) ||
      (doctorCount && doctorCount.errCode === 0) ||
      (speCount && speCount.errCode === 0) ||
      (handbookCount && handbookCount.errCode === 0)
    ) {
      this.setState({
        clinicCount: cliCount.clinicCount,
        doctorCount: doctorCount,
        speCount: speCount.speCount,
        handbookCount: handbookCount.handbookCount,
      });
    }

    let { language } = this.props;
    let allDay = this.getArrDays(language);

    this.setState({
      allDay: allDay,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = async (event) => {
    let date = event.target.value;
    console.log(date);
    let dataDoctor = this.state.doctorCount;
    console.log(dataDoctor);
    let itemsWithoutSchedule = [];
    let itemsWithSchedule = [];

    await Promise.all(
      dataDoctor.data.map(async (item) => {
        let res = await getScheduleDoctorByDate(
          item.id,
          date
        );
        item.timeTypeValues = [];

        res.data.map((scheduleItem) => {
          console.log(scheduleItem.timeTypeData.value_vi);
          item.timeTypeValues.push(
            scheduleItem.timeTypeData.value_vi
          );
        });
        if (res.data && res.data.length > 0) {
          itemsWithSchedule.push(item);
        } else {
          itemsWithoutSchedule.push(item);
        }
      })
    );

    this.setState({
      itemsWithoutSchedule: itemsWithoutSchedule,
      itemsWithSchedule: itemsWithSchedule,
    });
  };

  exportExcel = () => {
    const { itemsWithSchedule, itemsWithoutSchedule } =
      this.state;
    const workbook = XLSX.utils.book_new();

    const sheet1Data = itemsWithSchedule.map(
      (item, index) => {
        return {
          STT: index + 1,
          Fullname: `${item.firstName} ${item.lastName}`,
          Time: item.timeTypeValues.join(", "),
          Mail: item.email,
        };
      }
    );
    const sheet1Header = [
      { header: "STT" },
      { header: "Fullname" },
      { header: "Time" },
      { header: "Mail" },
    ];
    const sheet1 = XLSX.utils.json_to_sheet(sheet1Data);
    XLSX.utils.sheet_add_json(sheet1, sheet1Header, {
      origin: "A1",
    });
    XLSX.utils.book_append_sheet(
      workbook,
      sheet1,
      "Bac si co lich hom nay"
    );

    const sheet2Data = itemsWithoutSchedule.map(
      (item, index) => {
        return {
          STT: index + 1,
          Fullname: `${item.firstName} ${item.lastName}`,
          Address: item.address,
          Mail: item.email,
        };
      }
    );
    const sheet2Header = [
      { header: "STT" },
      { header: "Fullname" },
      { header: "Address" },
      { header: "Mail" },
    ];
    const sheet2 = XLSX.utils.json_to_sheet(sheet2Data);
    XLSX.utils.sheet_add_json(sheet2, sheet2Header, {
      origin: "A1",
    });
    XLSX.utils.book_append_sheet(
      workbook,
      sheet2,
      "Bac si khong co lich hom nay"
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
    link.download = "doctor_data.xlsx";
    link.click();
  };

  render() {
    let {
      clinicCount,
      doctorCount,
      speCount,
      handbookCount,
      allDay,
      itemsWithoutSchedule,
      itemsWithSchedule,
    } = this.state;
    console.log(itemsWithoutSchedule);
    console.log(itemsWithSchedule);

    return (
      <>
        <div className='dashboard'>
          <div className='spe-dashboard'>
            <img src={doctor} alt='' />
            <p>
              <FormattedMessage id='thongke.cli' />{" "}
              {doctorCount?.doctorCount}{" "}
              <FormattedMessage id='thongke.doc' />
            </p>
          </div>
          <div className='spe-dashboard'>
            <img src={cli} alt='' />
            <p>
              <FormattedMessage id='thongke.cli' />{" "}
              {clinicCount}{" "}
              <FormattedMessage id='thongke.cli-extra' />
            </p>
          </div>
          <div className='spe-dashboard'>
            <img src={medical} alt='' />
            <p>
              <FormattedMessage id='thongke.cli' />{" "}
              {speCount}{" "}
              <FormattedMessage id='thongke.spe' />
            </p>
          </div>
          <div className='spe-dashboard'>
            <img src={news} alt='' />
            <p>
              <FormattedMessage id='thongke.cli' />{" "}
              {handbookCount}{" "}
              <FormattedMessage id='thongke.news' />
            </p>
          </div>
        </div>
        <div className='date'>
          <p>
            <FormattedMessage id='thongke.pick' />
          </p>
          <select
            onChange={(event) => {
              this.handleOnChangeDatePicker(event);
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

        <Row className='list'>
          <Col span={11}>
            <p>
              <FormattedMessage id='thongke.yes' />{" "}
            </p>
            <table>
              <tr>
                <th>
                  <FormattedMessage id='menu.doctor.stt' />
                </th>
                <th>
                  <FormattedMessage id='menu.doctor.fullname' />
                </th>
                <th>
                  <FormattedMessage id='menu.doctor.time' />
                </th>
                <th>
                  <FormattedMessage id='menu.doctor.mail' />
                </th>
              </tr>
              {itemsWithSchedule.map((item, index) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{`${item.lastName} ${item.firstName}`}</td>
                      <td>
                        {item.timeTypeValues &&
                          item.timeTypeValues.map(
                            (value, index) => (
                              <span
                                key={index}
                                class='btn-vi'
                              >
                                {value}
                              </span>
                            )
                          )}
                      </td>
                      <td>{item.email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <p>
              <FormattedMessage id='thongke.no' />{" "}
            </p>
            <table>
              <tr>
                <th>
                  <FormattedMessage id='menu.doctor.stt' />
                </th>
                <th>
                  <FormattedMessage id='menu.doctor.fullname' />
                </th>
                <th>
                  <FormattedMessage id='thongke.add' />{" "}
                </th>
                <th>
                  <FormattedMessage id='menu.doctor.mail' />
                </th>
              </tr>
              {itemsWithoutSchedule.map((item, index) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{`${item.lastName} ${item.firstName}`}</td>
                      <td>{item.address}</td>
                      <td>{item.email}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </Col>
          <Col span={2} style={{ marginTop: "20px" }}>
            <Button
              onClick={this.exportExcel}
              type='primary'
            >
              Xuất Excel
            </Button>
          </Col>
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
)(Dashboard);
