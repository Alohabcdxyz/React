import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { Col, Row } from "antd";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageProfile extends Component {
  constructor(props) {
    super(props);
    const local = JSON.parse(
      localStorage.getItem("persist:user")
    );
    const userInfor = JSON.parse(local.userInfo);

    const convertInfo = {
      label: `${userInfor.lastName} ${userInfor.firstName}`,
      value: userInfor.id,
    };
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHtml: "",
      selectedDoctor: convertInfo,
      description: "",
      listDoctor: [],
      hasOldData: false,

      //save doctor_infor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
      selectedClinic: "",
      selectedSpecialty: "",
      value_en: "",
      htmlEn: "",
      markdownEn: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getRequiredDoctorInfor();
    setTimeout(() => {
      this.handleChange(this.state.selectedDoctor);
    }, 500);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.dataAllDoctor !== this.props.dataAllDoctor
    ) {
      let dataSelect = this.buildDataInputSelect(
        this.props.dataAllDoctor,
        "USERS"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !==
      this.props.allRequiredDoctorInfor
    ) {
      let {
        resPrice,
        resPayment,
        resProvince,
        resSpecialty,
        resClinic,
      } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(
        resPrice,
        "PRICE"
      );
      let dataSelectPayment = this.buildDataInputSelect(
        resPayment,
        "PAYMENT"
      );
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(
        resClinic,
        "CLINIC"
      );

      console.log(dataSelectPrice);
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.dataAllDoctor,
        "USERS"
      );
      let {
        resPrice,
        resPayment,
        resProvince,
        resSpecialty,
        resClinic,
      } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(
        resPrice,
        "PRICE"
      );
      let dataSelectPayment = this.buildDataInputSelect(
        resPayment,
        "PAYMENT"
      );
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(
        resClinic,
        "CLINIC"
      );
      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };

  handleEditorChangeEn = ({ html, text }) => {
    this.setState({
      markdownEn: text,
      htmlEn: html,
    });
  };

  handleSaveContent = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctorRedux({
      contentHtml: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      value_en: this.state.value_en,
      markdownEn: this.state.markdownEn,
      htmlEn: this.state.htmlEn,
      doctorId: this.state.selectedDoctor.value,
      action:
        hasOldData === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic &&
        this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChange = async (selectedDoctor, name) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctorService(
      selectedDoctor.value
    );
    console.log(res);
    let {
      listPayment,
      listPrice,
      listProvince,
      listSpecialty,
      listClinic,
    } = this.state;
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.Markdown
    ) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        specialtyId = "",
        selectedSpecialty = "",
        clinicId = "",
        selectedClinic = "";
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPayment = listPayment.find(
          (item) => item && item.value === paymentId
        );
        selectedPrice = listPrice.find(
          (item) => item && item.value === priceId
        );
        selectedProvince = listProvince.find(
          (item) => item && item.value === provinceId
        );
        selectedSpecialty = listSpecialty.find(
          (item) => item && item.value === specialtyId
        );
        selectedClinic = listClinic.find(
          (item) => item && item.value === clinicId
        );

        console.log(selectedPrice);
      }

      this.setState({
        value_en: markdown.value_en,
        htmlEn: markdown.htmlEn,
        markdownEn: markdown.markdownEn,
        contentHtml: markdown.contentHtml,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHtml: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
        value_en: "",
        markdownEn: "",
        htmlEn: "",
      });
    }
  };

  handleChangeSelectDoctorInfor = async (
    selectedDoctor,
    name
  ) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeDescription = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  buildDataInputSelect = (inpData, type) => {
    let result = [];
    let { language } = this.props;

    if (inpData && inpData.length > 0) {
      if (type === "USERS") {
        inpData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          obj.label =
            language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "PRICE") {
        inpData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.value_vi} VND`;
          let labelEn = `${item.value_en} $`;
          obj.label =
            language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inpData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.value_vi}`;
          let labelEn = `${item.value_en}`;
          obj.label =
            language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "SPECIALTY") {
        inpData.map((item, index) => {
          let obj = {};

          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "CLINIC") {
        inpData.map((item, index) => {
          let obj = {};

          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
    }
    return result;
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>
          <FormattedMessage id='admin.manage-doctor.title' />
        </div>
        <Row className='more-infor'>
          <Col className='content-left' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.choose-doctor' />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctor}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.choose-doctor' />
              }
              isDisabled={true}
            />

            {/* <div>{userDoctor.name}</div> */}
          </Col>
          <Col className='content-right' span={8}>
            <label>
              <FormattedMessage id='admin.manage-doctor.information' />
            </label>
            <textarea
              className='form-control'
              onChange={(event) =>
                this.handleChangeDescription(
                  event,
                  "description"
                )
              }
              value={this.state.description}
            ></textarea>
          </Col>
          <Col span={1}></Col>
          <Col className='content-right' span={8}>
            <label>
              <FormattedMessage id='admin.manage-doctor.information-en' />
            </label>
            <textarea
              className='form-control'
              onChange={(event) =>
                this.handleChangeDescription(
                  event,
                  "value_en"
                )
              }
              value={this.state.value_en}
            ></textarea>
          </Col>
        </Row>

        <Row
          className='doctor-clinic-infor'
          style={{ justifyContent: "space-between" }}
        >
          <Col className='choose-price' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.price' />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.price' />
              }
              name='selectedPrice'
              isDisabled={true}
            />
          </Col>
          <Col className='choose-payment' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.payment' />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.payment' />
              }
              name='selectedPayment'
            />
          </Col>
          <Col className='choose-provin' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.province' />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.province' />
              }
              name='selectedProvince'
            />
          </Col>
        </Row>

        <Row
          className='doctor-clinic-infor'
          style={{ justifyContent: "space-between" }}
        >
          <Col className='choose-provin' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.specialty' />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.specialty' />
              }
              name='selectedSpecialty'
            />
          </Col>
          <Col className='choose-provin' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.clinic' />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              placeholder={
                <FormattedMessage id='admin.manage-doctor.clinic' />
              }
              name='selectedClinic'
            />
          </Col>
          <Col className='choose-provin' span={7}></Col>
        </Row>

        <Row
          className='clinic-infor'
          style={{ justifyContent: "space-between" }}
        >
          <Col className='choose-name' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.name' />
            </label>
            <input
              className='form-control'
              onChange={(event) =>
                this.handleChangeDescription(
                  event,
                  "nameClinic"
                )
              }
              value={this.state.nameClinic}
            />
          </Col>
          <Col className='choose-address' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.address' />
            </label>
            <input
              className='form-control'
              onChange={(event) =>
                this.handleChangeDescription(
                  event,
                  "addressClinic"
                )
              }
              value={this.state.addressClinic}
            />
          </Col>
          <Col className='choose-note' span={7}>
            <label>
              <FormattedMessage id='admin.manage-doctor.note' />
            </label>
            <input
              className='form-control'
              onChange={(event) =>
                this.handleChangeDescription(event, "note")
              }
              value={this.state.note}
            />
          </Col>
        </Row>
        <div className='manage-doctor-tool'>
          <div style={{ margin: "0 20px" }}>
            <FormattedMessage id='menu.admin.vi' />
          </div>
          <MdEditor
            style={{ height: "350px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <div style={{ margin: "0 20px" }}>
            <FormattedMessage id='menu.admin.en' />
          </div>
          <MdEditor
            style={{ height: "350px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChangeEn}
            value={this.state.markdownEn}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content"
              : "create-content"
          }
          onClick={() => {
            this.handleSaveContent();
          }}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id='admin.manage-doctor.save-data' />
            </span>
          ) : (
            <span>
              <FormattedMessage id='admin.manage-doctor.create-data' />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataAllDoctor: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor:
      state.admin.allRequiredDoctorInfor,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () =>
      dispatch(actions.fetchAllDoctor()),
    saveDetailDoctorRedux: (data) =>
      dispatch(actions.saveDetailDoctor(data)),
    getRequiredDoctorInfor: () =>
      dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProfile);
