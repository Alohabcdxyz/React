import React, { Component } from "react";
import { connect } from "react-redux";
import {
  LANGUAGES,
  CommonUtils,
  CRUD_ACTIONS,
} from "../../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import { Col, Row, Form, Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import * as actions from "../../../../store/actions/";
import "react-markdown-editor-lite/lib/index.css";
import {
  createSpecialty,
  getAllSpecialty,
} from "../../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();

class ManageSpecialty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImg: [],

      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      dataSpecialty: [],
      action: "",
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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (
      prevProps.allSpecialty !== this.props.allSpecialty
    ) {
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        action: CRUD_ACTIONS.CREATE,
      });
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

  handleSaveSpecialty = async () => {
    let res = await createSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Specialty success");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        previewImg: "",
      });

      this.props.fetchSpecialtyRedux();
    } else {
      toast.error("Add new Specialty fail");
    }
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
    let { dataSpecialty } = this.state;
    return (
      <>
        <Row className='manage-specialty-container'>
          <Col className='manage-specialty-title' span={24}>
            Quản lý chuyên khoa
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
              <Form.Item label='Tên chuyên khoa'>
                <Input
                  name='name'
                  value={this.state.name}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "name")
                  }
                />
              </Form.Item>

              <Form.Item label='Ảnh chuyên khoa'>
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
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
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
                  <th>Name Specialty</th>
                  <th>Image Specialty</th>
                  <th>Description</th>
                  <th>Option</th>
                </tr>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
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
                        <td>{item.descriptionMarkdown}</td>
                        <td>
                          <button
                            className='btn-delete'
                            onClick={() =>
                              this.handleDeleteSpe(item)
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
    allSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSpeRedux: (id) => dispatch(actions.deleteSpe(id)),

    fetchSpecialtyRedux: () =>
      dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSpecialty);
