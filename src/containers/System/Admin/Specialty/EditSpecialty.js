import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { Col, Row, Form, Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  CommonUtils,
  CRUD_ACTIONS,
  LANGUAGES,
} from "../../../../utils";
import { getAllSpecialty } from "../../../../services/userService";
import * as actions from "../../../../store/actions/";
const mdParser = new MarkdownIt();
class EditSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImg: [],

      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      dataSpecialty: [],
      action: "",
      id: "",
      value_en: "",
      htmlEn: "",
      markdownEn: "",
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allSpecialty !== this.props.allSpecialty
    ) {
      this.setState({
        action: CRUD_ACTIONS.CREATE,
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
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

  handleSaveSpecialty = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.saveSpecialty({
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editSpecialtyRedux({
        id: this.state.id,
        name: this.state.name,
        descriptionHtml: this.state.descriptionHtml,
        descriptionMarkdown: this.state.descriptionMarkdown,
        imageBase64: this.state.imageBase64,
        value_en: this.state.value_en,
        htmlEn: this.state.htmlEn,
        markdownEn: this.state.markdownEn,
      });
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        previewImg: "",
        value_en: "",
        htmlEn: "",
        markdownEn: "",
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

  handleEditSpe = (specialty) => {
    let newImageBase64 = "";
    if (specialty.image) {
      newImageBase64 = new Buffer(
        specialty.image,
        "base64"
      ).toString("binary");
    }
    this.setState({
      name: specialty.name,
      imageBase64: specialty.image,
      descriptionHtml: specialty.descriptionHtml,
      descriptionMarkdown: specialty.descriptionMarkdown,
      previewImg: newImageBase64,
      action: CRUD_ACTIONS.EDIT,
      id: specialty.id,
      value_en: specialty.value_en,
      htmlEn: specialty.htmlEn,
      markdownEn: specialty.markdownEn,
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

  handleDeleteSpe = async (spe) => {
    this.props.deleteSpeRedux(spe.id);
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    let { language } = this.props;
    return (
      <>
        <Row className='manage-specialty-container'>
          <Col className='manage-specialty-title' span={24}>
            <FormattedMessage id='menu.admin.spe' />
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
                  <FormattedMessage id='menu.admin.spe-name' />
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
                  <FormattedMessage id='menu.admin.spe-name-en' />
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
                  <FormattedMessage id='menu.admin.spe-img' />
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
              onClick={() => this.handleSaveSpecialty()}
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
                    <FormattedMessage id='menu.admin.spe-name' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.spe-img' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.des' />
                  </th>
                  <th>
                    <FormattedMessage id='menu.admin.option' />
                  </th>
                </tr>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
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
                              this.handleEditSpe(item)
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
    allSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSpecialty: (data) =>
      dispatch(actions.saveSpecialty(data)),
    editSpecialtyRedux: (data) =>
      dispatch(actions.editSpecialty(data)),
    fetchSpecialtyRedux: () =>
      dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSpecialty);
