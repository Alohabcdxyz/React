import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { Col, Row, Form, Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  LANGUAGES,
  CommonUtils,
  CRUD_ACTIONS,
} from "../../../../utils";
import { getAllClinic } from "../../../../services/userService";
import * as actions from "../../../../store/actions/";
const mdParser = new MarkdownIt();
class EditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImg: [],
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      dataClinic: [],
      action: "",
      id: "",
      address: "",
      value_en: "",
      htmlEn: "",
      markdownEn: "",
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allClinic !== this.props.allClinic) {
      this.setState({
        action: CRUD_ACTIONS.CREATE,
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        address: "",
        value_en: "",
        htmlEn: "",
        markdownEn: "",
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
        imageBase64: base64,
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

  handleSaveClinic = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.saveClinic({
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        address: this.state.address,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editClinicRedux({
        id: this.state.id,
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        address: this.state.address,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
    }
    this.setState({
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      address: "",
      previewImg: "",
      value_en: "",
      htmlEn: "",
      markdownEn: "",
    });
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditClinic = (clinic) => {
    let newImageBase64 = "";
    if (clinic.image) {
      newImageBase64 = new Buffer(
        clinic.image,
        "base64"
      ).toString("binary");
    }
    this.setState({
      name: clinic.name,
      imageBase64: clinic.image,
      descriptionHtml: clinic.descriptionHtml,
      descriptionMarkdown: clinic.descriptionMarkdown,
      previewImg: newImageBase64,
      action: CRUD_ACTIONS.EDIT,
      id: clinic.id,
      address: clinic.address,
      value_en: clinic.value_en,
      htmlEn: clinic.htmlEn,
      markdownEn: clinic.markdownEn,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHtml: html,
    });
  };

  handleEditorChangeEn = ({ html, text }) => {
    this.setState({
      markdownEn: text,
      htmlEn: html,
    });
  };

  render() {
    let { dataClinic } = this.state;
    let { language } = this.props;
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
                  <FormattedMessage id='menu.admin.cli-name-en' />
                }
              >
                <Input
                  name='value_en'
                  value={this.state.value_en}
                  onChange={(event) =>
                    this.handleOnchangeInput(
                      event,
                      "value_en"
                    )
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
            <>
              <FormattedMessage id='menu.admin.vi' />
            </>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
            <>
              <FormattedMessage id='menu.admin.en' />
            </>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeEn}
              value={this.state.markdownEn}
            />
          </Col>
          <Col span={24} className='button-save'>
            <Button
              className={
                this.state.action === CRUD_ACTIONS.EDIT
                  ? "btn btn-warning"
                  : "btn btn-primary"
              }
              style={{
                width: "80px",
                marginTop: "10px",
              }}
              type='primary'
              onClick={() => this.handleSaveClinic()}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id='manage-user.edit' />
              ) : (
                <FormattedMessage id='manage-user.save' />
              )}
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
                        <td>
                          {language === LANGUAGES.VI
                            ? item.name
                            : item.value_en}
                        </td>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={item.image}
                            alt='chuyenkhoa'
                          />
                        </td>
                        <td>
                          {language === LANGUAGES.VI
                            ? item.descriptionMarkdown
                            : item.markdownEn}
                        </td>
                        <td>
                          <button
                            className='btn-edit'
                            onClick={() =>
                              this.handleEditClinic(item)
                            }
                          >
                            <i className='fas fa-pencil-alt'></i>
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
    allClinic: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveClinic: (data) =>
      dispatch(actions.saveClinic(data)),
    editClinicRedux: (data) =>
      dispatch(actions.editClinic(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClinic);
