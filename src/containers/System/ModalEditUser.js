import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
    };
  }

  toggle = () => {
    this.props.toggleOpenAndClose();
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInp = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNumber",
      "gender",
    ];
    for (let i = 0; i < arrInp.length; i++) {
      if (!this.state[arrInp[i]]) {
        isValid = false;
        alert("Missing para: " + arrInp[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeInput = (e, id) => {
    const copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <>
        <Modal
          size='lg'
          centered
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"ModalEditUserClassName"}
        >
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <div className='container'>
              <form action='/post-crud' method='post'>
                <div className='form-row'>
                  <div
                    className='form-group col-md-12'
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className='form-group col-md-5'>
                      <label for=''>First Name</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='First Name'
                        name='firstName'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "firstName"
                          );
                        }}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className='form-group col-md-5'>
                      <label for=''>Last Name</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Last Name'
                        name='lastName'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "lastName"
                          );
                        }}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div
                    className='form-group col-md-12'
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className='form-group col-md-5'>
                      <label for='inputEmail4'>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        name='email'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "email"
                          );
                        }}
                        value={this.state.email}
                        disabled
                      />
                    </div>
                    <div className='form-group col-md-5'>
                      <label for='inputPassword4'>
                        Password
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='inputPassword4'
                        placeholder='Password'
                        name='password'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "password"
                          );
                        }}
                        value={this.state.password}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label for='inputAddress'>Address</label>
                  <input
                    type='text'
                    className='form-control'
                    id='inputAddress'
                    placeholder='1234 Main St'
                    name='address'
                    onChange={(e) => {
                      this.handleOnChangeInput(
                        e,
                        "address"
                      );
                    }}
                    value={this.state.address}
                  />
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label for='inputCity'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='inputCity'
                      name='phoneNumber'
                      onChange={(e) => {
                        this.handleOnChangeInput(
                          e,
                          "phoneNumber"
                        );
                      }}
                      value={this.state.phoneNumber}
                    />
                  </div>
                  <div
                    className='form-group col-md-12'
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className='form-group col-md-5'>
                      <label for=''>Gender</label>
                      <select
                        name='gender'
                        className='form-control'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "gender"
                          );
                        }}
                        value={this.state.gender}
                      >
                        <option value='0'>Male</option>
                        <option value='1'>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => {
                this.handleSaveUser();
              }}
              className='px-3'
            >
              Save changes
            </Button>{" "}
            <Button
              color='secondary'
              onClick={() => {
                this.toggle();
              }}
              className='px-3'
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditUser);
