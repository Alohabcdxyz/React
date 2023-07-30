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
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
      });
    });
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
      "roleId",
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

  handleAddNew = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
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
          className={"ModalUserClassName"}
        >
          <ModalHeader>Add new User</ModalHeader>
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
                      />
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <label for=''>Address</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
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
                    <label for=''>Phone Number</label>
                    <input
                      type='text'
                      className='form-control'
                      id=''
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

                    <div className='form-group col-md-5'>
                      <label for=''>Role</label>
                      <select
                        name='roleId'
                        className='form-control'
                        onChange={(e) => {
                          this.handleOnChangeInput(
                            e,
                            "roleId"
                          );
                        }}
                        value={this.state.roleId}
                      >
                        <option value='1'>Admin</option>
                        <option value='2'>Doctor</option>
                        <option value='3'>Patient</option>
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
                this.handleAddNew();
              }}
              className='px-3'
            >
              Add new
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
)(ModalUser);
