import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Form, Input, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { CommonUtils } from "../../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import {
  createHandbook,
  getAllHandbook,
} from "../../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImg: [],
      name: "",
      imageBase64: "",
      descriptionHtml: "",
      descriptionMarkdown: "",
      status: 1,
      dataHandbook: [],
      value_en: "",
      htmlEn: "",
      markdownEn: "",
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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleSaveHandbook = async () => {
    let res = await createHandbook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Handbook success");
      this.setState({
        previewImg: [],
        name: "",
        imageBase64: "",
        descriptionHtml: "",
        descriptionMarkdown: "",
        status: 1,
        value_en: "",
        markdownEn: "",
        htmlEn: "",
      });
    } else {
      toast.error("Add new Handbook fail");
    }
  };

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
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
                    }}
                    onClick={() => {
                      this.openPreImg();
                    }}
                  ></div>
                </div>
              </Form.Item>
            </Form>
            <>Tiếng Việt</>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
            <>Tiếng Anh</>
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeEn}
              value={this.state.markdownEn}
            />
          </Col>
          <Col span={24} className='button-save'>
            <Button
              style={{
                width: "80px",
                marginTop: "10px",
              }}
              onClick={() => this.handleSaveHandbook()}
            >
              <FormattedMessage id='manage-user.save' />
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
                </tr>
                {dataHandbook &&
                  dataHandbook.length > 0 &&
                  dataHandbook.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={item.image}
                            alt='handbook'
                          />
                        </td>
                        <td>{item.descriptionMarkdown}</td>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageHandBook);
