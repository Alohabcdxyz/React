import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import {
  LANGUAGES,
  CRUD_ACTIONS,
  CommonUtils,
} from "../../../utils";
import * as actions from "../../../store/actions/";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableUser from "./TableUser";
import { toast } from "react-toastify";

class Userredux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: [],
      isOpen: false,

      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",

      action: "",
      nameError: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender:
          arrGender && arrGender.length > 0
            ? arrGender[0].keyMap
            : "",
      });
    }
    if (
      prevProps.positionRedux !== this.props.positionRedux
    ) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0
            ? arrPosition[0].keyMap
            : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role:
          arrRole && arrRole.length > 0
            ? arrRole[0].keyMap
            : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.genderRedux;
      let arrRole = this.props.roleRedux;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        role:
          arrRole && arrRole.length > 0
            ? arrRole[0].keyMap
            : "",
        position:
          arrPosition && arrPosition.length > 0
            ? arrPosition[0].keyMap
            : "",
        avatar: "",
        gender:
          arrGender && arrGender.length > 0
            ? arrGender[0].keyMap
            : "",
        action: CRUD_ACTIONS.CREATE,
        previewImg: "",
      });
    }
  }

  handleChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreImg = () => {
    if (!this.state.previewImg) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let { phoneNumber } = this.state;
    let isValidPhoneNumber =
      this.isValidPhoneNumber(phoneNumber);

    if (!isValidPhoneNumber) {
      toast.error(
        <FormattedMessage id='error.phonenumber' />
      );
      return;
    }

    let { email } = this.state;
    let isValidEmail = this.isValidEmail(email);

    if (!isValidEmail) {
      toast.error(<FormattedMessage id='error.mail' />);
      return;
    }

    let isValid =
      this.checkValidate() && this.validateName();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.saveUser({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    this.props.fetchUserRedux();
  };

  validateName = () => {
    let { firstName, lastName } = this.state;
    if (!firstName.trim() || !lastName.trim()) {
      this.setState({ nameError: "Bạn phải nhập tên" });
      return false;
    } else {
      // Use regular expression to check name format
      let namePattern = /^[a-zA-Z\s]+$/;
      if (!namePattern.test(firstName, lastName)) {
        this.setState({
          nameError: <FormattedMessage id='error.name' />,
        });
        return false;
      } else {
        this.setState({ nameError: "" });
      }
    }
    return true;
  };

  onChangeinput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });

    if (id === "name") {
      this.setState({ nameError: "" });
    }
  };

  isValidEmail = (email) => {
    // Regular expression for email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    return emailPattern.test(email);
  };

  checkValidate = () => {
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing para: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  // Add this function inside your Userredux class
  isValidPhoneNumber = (phoneNumber) => {
    // Regular expression to check if the input contains only numbers
    let numberPattern = /^\d+$/;

    // Check if the phone number contains only numbers and has a maximum length of 10 digits
    return (
      phoneNumber.length === 10 &&
      numberPattern.test(phoneNumber)
    );
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(
        user.image,
        "base64"
      ).toString("binary");
    }

    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      previewImg: imageBase64,
      gender: user.gender,
      action: CRUD_ACTIONS.EDIT,
      id: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let getGender = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
      position,
      avatar,
      nameError,
    } = this.state;
    return (
      <>
        <div className='redux-container'>
          <div className='title'>
            <FormattedMessage id='manage-user.add' />
          </div>
          <div>
            {getGender === true ? "Loading gender" : ""}
          </div>
          <div className='user-redux-body'>
            <div className='container'>
              <div className='row'>
                <div
                  className='row firstLine'
                  style={{ marginBottom: "20px" }}
                >
                  <div className='col-3'>
                    <label>
                      <FormattedMessage id='manage-user.firstname' />
                    </label>
                    <input
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                      className='form-control'
                      type='text'
                      value={firstName}
                      onChange={(event) => {
                        this.onChangeinput(
                          event,
                          "firstName"
                        );
                      }}
                    />
                    {nameError && (
                      <span style={{ color: "red" }}>
                        {nameError}
                      </span>
                    )}
                  </div>
                  <div className='col-3'>
                    <label>
                      <FormattedMessage id='manage-user.lastname' />
                    </label>
                    <input
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                      className='form-control'
                      type='text'
                      value={lastName}
                      onChange={(event) => {
                        this.onChangeinput(
                          event,
                          "lastName"
                        );
                      }}
                    />
                    {nameError && (
                      <span style={{ color: "red" }}>
                        {nameError}
                      </span>
                    )}
                  </div>
                  <div className='col-3'>
                    <label>
                      <FormattedMessage id='manage-user.email' />
                    </label>
                    <input
                      className='form-control'
                      type='email'
                      value={email}
                      onChange={(event) => {
                        this.onChangeinput(event, "email");
                      }}
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className='col-3'>
                    <label>
                      <FormattedMessage id='manage-user.password' />
                    </label>
                    <input
                      className='form-control'
                      type='password'
                      value={password}
                      onChange={(event) => {
                        this.onChangeinput(
                          event,
                          "password"
                        );
                      }}
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div
                  className='row secondLine'
                  style={{ marginBottom: "20px" }}
                >
                  <div className='col-3'>
                    <label>
                      <FormattedMessage id='manage-user.phone' />
                    </label>
                    <input
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                      className='form-control'
                      type='text'
                      pattern='[0-9]*'
                      value={phoneNumber}
                      onChange={(event) => {
                        this.onChangeinput(
                          event,
                          "phoneNumber"
                        );
                      }}
                    />
                  </div>
                  <div className='col-9'>
                    <label>
                      <FormattedMessage id='manage-user.address' />
                    </label>
                    <input
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                      className='form-control'
                      type='text'
                      value={address}
                      onChange={(event) => {
                        this.onChangeinput(
                          event,
                          "address"
                        );
                      }}
                    />
                  </div>
                </div>
                <div className='col-3'>
                  <label>
                    <FormattedMessage id='manage-user.gender' />
                  </label>
                  <select
                    disabled={
                      this.state.action ===
                      CRUD_ACTIONS.EDIT
                        ? true
                        : false
                    }
                    className='form-control'
                    onChange={(event) => {
                      this.onChangeinput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <>
                            <option
                              key={index}
                              value={item.keyMap}
                            >
                              {language === LANGUAGES.VI
                                ? item.value_vi
                                : item.value_en}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className='col-3'>
                  <label>
                    <FormattedMessage id='manage-user.position' />
                  </label>
                  <select
                    disabled={
                      this.state.action ===
                      CRUD_ACTIONS.EDIT
                        ? true
                        : false
                    }
                    className='form-control'
                    onChange={(event) => {
                      this.onChangeinput(event, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <>
                            <option
                              key={index}
                              value={item.keyMap}
                            >
                              {language === LANGUAGES.VI
                                ? item.value_vi
                                : item.value_en}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className='col-3'>
                  <label>
                    <FormattedMessage id='manage-user.role' />
                  </label>
                  <select
                    disabled={
                      this.state.action ===
                      CRUD_ACTIONS.EDIT
                        ? true
                        : false
                    }
                    className='form-control'
                    onChange={(event) => {
                      this.onChangeinput(event, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <>
                            <option
                              key={index}
                              value={item.keyMap}
                            >
                              {language === LANGUAGES.VI
                                ? item.value_vi
                                : item.value_en}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className='col-3'>
                  <label>
                    <FormattedMessage id='manage-user.img' />
                  </label>{" "}
                  <br />
                  <div className='upload-img'>
                    <input
                      disabled={
                        this.state.action ===
                        CRUD_ACTIONS.EDIT
                          ? true
                          : false
                      }
                      id='previewImg'
                      type='file'
                      hidden
                      onChange={(event) =>
                        this.handleChangeImage(event)
                      }
                    />
                    <label
                      className='label-upload'
                      htmlFor='previewImg'
                    >
                      <i
                        className='fas fa-upload'
                        style={{ marginRight: "10px" }}
                      ></i>
                      <FormattedMessage id='manage-user.upload' />
                    </label>
                    <div
                      className='preview-img'
                      style={{
                        backgroundImage: `url(${this.state.previewImg})`,
                      }}
                      onClick={() => {
                        this.openPreImg();
                      }}
                    ></div>
                  </div>
                </div>
                <div className='col-12 mt-3'>
                  <button
                    className={
                      this.state.action ===
                      CRUD_ACTIONS.CREATE
                        ? "btn btn-primary"
                        : "sua-user"
                    }
                    style={{
                      width: "80px",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    {this.state.action ===
                      CRUD_ACTIONS.CREATE && (
                      <FormattedMessage id='manage-user.save' />
                    )}
                  </button>
                </div>
                <div
                  className='col-12'
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <TableUser
                    handleEditUserToChild={
                      this.handleEditUserFromParent
                    }
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImg}
              onCloseRequest={() =>
                this.setState({ isOpen: false })
              }
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () =>
      dispatch(actions.fetchGenderStart()),
    getPositionStart: () =>
      dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLaguageApp(language)),
    saveUser: (data) => dispatch(actions.saveUser(data)),
    fetchUserRedux: () =>
      dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) =>
      dispatch(actions.editUser(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Userredux);
