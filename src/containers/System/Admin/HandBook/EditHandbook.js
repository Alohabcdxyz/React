import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Col, Row, Form, Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  CommonUtils,
  CRUD_ACTIONS,
} from "../../../../utils";
import { getAllHandbook } from "../../../../services/userService";
import * as actions from "../../../../store/actions/";
const mdParser = new MarkdownIt();
class EditHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImg: [],
      name: "",
      value_en: "",
      imageBase64: "",
      descriptionHtml: "",
      htmlEn: "",
      markdownEn: "",
      descriptionMarkdown: "",
      dataHandbook: [],
      action: "",
      id: "",
      status: "",
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allHandbook !== this.props.allHandbook) {
      this.setState({
        action: CRUD_ACTIONS.CREATE,
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        status: "",
        value_en: "",
        markdownEn: "",
        htmlEn: "",
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

  handleSaveHandbook = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.saveHandbook({
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        status: 1,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editHandBookRedux({
        id: this.state.id,
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        status: this.state.status,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
    }
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditSpe = (handbook) => {
    let newImageBase64 = "";
    if (handbook.image) {
      newImageBase64 = new Buffer(
        handbook.image,
        "base64"
      ).toString("binary");
    }
    this.setState({
      name: handbook.name,
      imageBase64: handbook.image,
      descriptionHtml: handbook.descriptionHtml,
      descriptionMarkdown: handbook.descriptionMarkdown,
      previewImg: newImageBase64,
      action: CRUD_ACTIONS.EDIT,
      id: handbook.id,
      status: handbook.status,
      value_en: handbook.value_en,
      htmlEn: handbook.htmlEn,
      markdownEn: handbook.markdownEn,
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
    let { dataHandbook } = this.state;
    return (
      <>
        <Row className='manage-specialty-container'>
          <Col className='manage-specialty-title' span={24}>
            <FormattedMessage id='handbook.hb-manage' />
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
                  <FormattedMessage id='handbook.tit' />
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
                  <FormattedMessage id='handbook.titen' />
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
                  <FormattedMessage id='handbook.thumb' />
                }
              >
                <div className='upload-img'>
                  <input
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
                      width: "100%",
                    }}
                    onClick={() => {
                      this.openPreImg();
                    }}
                  ></div>
                </div>
              </Form.Item>
              <Form.Item
                label={
                  <FormattedMessage id='handbook.status' />
                }
              >
                <div className='form-group col-md-5'>
                  <select
                    name='status'
                    className='form-control'
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "status");
                    }}
                    value={this.state.status}
                  >
                    <option value='1'>Show</option>
                    <option value='2'>Hide</option>
                  </select>
                </div>
              </Form.Item>
            </Form>
            <p>Tiếng Việt</p>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
            <p>Tiếng Anh</p>
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
              onClick={() => this.handleSaveHandbook()}
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
                    <FormattedMessage id='handbook.name-hb' />
                  </th>
                  <th>
                    <FormattedMessage id='handbook.thumb' />
                  </th>
                  <th>
                    <FormattedMessage id='handbook.des' />
                  </th>
                  <th>
                    <FormattedMessage id='handbook.status' />
                  </th>
                  <th>
                    <FormattedMessage id='handbook.option' />
                  </th>
                </tr>
                {dataHandbook &&
                  dataHandbook.length > 0 &&
                  dataHandbook.map((item, index) => {
                    return (
                      <>
                        {(item.status === 1 ||
                          item.status === 2) && (
                          <>
                            <tr>
                              <td>{item.name}</td>
                              <td>
                                <img
                                  style={{
                                    width: "100px",
                                  }}
                                  src={item.image}
                                  alt='chuyenkhoa'
                                />
                              </td>
                              <td>
                                {item.descriptionMarkdown}
                              </td>
                              <td>
                                {item.status === 1
                                  ? "Show"
                                  : "Hide"}
                              </td>
                              <td>
                                <button
                                  className='btn-edit'
                                  onClick={() =>
                                    this.handleEditSpe(item)
                                  }
                                >
                                  <i className='fas fa-pencil-alt'></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        )}
                      </>
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
    allHandbook: state.admin.allHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveHandbook: (data) =>
      dispatch(actions.saveHandbook(data)),
    editHandBookRedux: (data) =>
      dispatch(actions.editHandbook(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditHandbook);
