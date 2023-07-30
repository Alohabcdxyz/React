import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import "./ModalBill.scss";
import { toast } from "react-toastify";
import { Col, Row } from "antd";
import { LANGUAGES, CommonUtils } from "../../../utils";

class ModalCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnchangeFile = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let {
      isOpenModal,
      closeModalBill,
      dataModal,
      sendRemedy,
    } = this.props;
    return (
      <>
        <Modal
          size='md'
          centered
          isOpen={isOpenModal}
          className={"ModalUserClassName"}
        >
          <ModalHeader toggle={closeModalBill}>
            Gửi thông báo cho bệnh nhân
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col span={15}>
                <label>Email bệnh nhân</label>
                <input
                  style={{ width: "90%" }}
                  type='email'
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleChangeEmail(event);
                  }}
                />
              </Col>
              <Col span={9}>
                <label>Chọn file thông báo</label>
                <input
                  type='file'
                  onChange={(event) =>
                    this.handleOnchangeFile(event)
                  }
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ width: "100px" }}
              color='primary'
              onClick={() => this.handleSendRemedy()}
            >
              Send
            </Button>
            <Button
              style={{ width: "100px" }}
              color='secondary'
              onClick={closeModalBill}
            >
              Cancel
            </Button>
          </ModalFooter>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCancel);
