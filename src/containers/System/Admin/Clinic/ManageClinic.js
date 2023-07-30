import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import { Col, Row, Form, Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as actions from "../../../../store/actions/";
import {
  createClinic,
  getAllClinic,
} from "../../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();

class ManageSpecialty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      address: "",
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHtml: html,
    });
  };

  // handleChangeImage = async (event) => {
  //   let data = event.target.files;
  //   let file = data[0];

  //   if (file) {
  //     let base64 = await CommonUtils.getBase64(file);

  //     this.setState({
  //       imageBase64: base64,
  //     });
  //   }
  // };

  handleSaveClinic = async () => {
    let res = await createClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Clinic success");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Add new Clinic fail");
    }
  };

  handleDeleteCli = async (clinic) => {
    this.props.deleteCliRedux(clinic.id);
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
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

  handleChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        imageBase64: base64,
      });
    }
  };

  render() {
    let { dataClinic } = this.state;
    return (
      <>
        <Row className='manage-specialty-container'>
          <Col className='manage-specialty-title' span={24}>
            <FormattedMessage id='menu.admin.cli' />
          </Col>

          <Col className='add-new-specialty' span={24}>
            <Form
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
            >
              <Form.Item
                label={
                  <FormattedMessage id='menu.admin.cli-name' />
                }
              >
                <Input
                  name='name'
                  value={this.state.name}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "name")
                  }
                />
              </Form.Item>

              <Form.Item
                label={
                  <FormattedMessage id='menu.admin.cli-address' />
                }
              >
                <Input
                  name='address'
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(
                      event,
                      "address"
                    )
                  }
                />
              </Form.Item>

              <Form.Item
                label={
                  <FormattedMessage id='menu.admin.cli-img' />
                }
              >
                {/* <input
                  name='imageBase64'
                  className='form-control-file'
                  type='file'
                  onChange={(event) => {
                    this.handleChangeImage(
                      event,
                      "imageBase64"
                    );
                  }}
                /> */}
                <div className='upload-img'>
                  <input
                    name='imageBase64'
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
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className='fas fa-upload'
                      style={{
                        marginRight: "10px",
                      }}
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
              </Form.Item>
            </Form>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </Col>
          <Col span={24} className='button-save'>
            <Button
              type='primary'
              onClick={() => this.handleSaveClinic()}
            >
              Save{" "}
            </Button>
          </Col>

          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
          <Col span={24}>
            <table>
              <tbody>
                <tr>
                  <th>
                    <FormattedMessage id='menu.admin.cli-name' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.cli-img' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.des' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.option' />
                  </th>
                </tr>
                {dataClinic &&
                  dataClinic.length > 0 &&
                  dataClinic.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={item.image}
                            alt='chuyenkhoa'
                          />
                        </td>
                        <td>{item.descriptionHtml}</td>
                        <td>
                          <button
                            className='btn-delete'
                            onClick={() =>
                              this.handleDeleteCli(item)
                            }
                          >
                            <i className='fas fa-trash'></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
  return {
    deleteCliRedux: (id) => dispatch(actions.deleteCli(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSpecialty);
