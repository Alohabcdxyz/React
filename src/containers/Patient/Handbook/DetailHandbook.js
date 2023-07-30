import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./Dthb.scss";
import _ from "lodash";
import { getDetailHandbook } from "../../../services/userService";
import { Button, Col, Row } from "antd";
import HeaderHomePage from "../../Home_Page/HeaderHomePage";
import { withRouter } from "react-router";
class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailHanbook: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let res = await getDetailHandbook(
        this.props.match.params.id
      );
      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHanbook: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  backPage = () => {
    this.props.history.push("/home");
  };

  render() {
    let { dataDetailHanbook } = this.state;
    let { language } = this.props;
    return (
      <>
        <HeaderHomePage />
        <Row className='container-hb'>
          <Col span={24} className='create'>
            <FormattedMessage id='handbook.create' /> :{" "}
            {new Date(
              dataDetailHanbook.createdAt
            ).toLocaleDateString()}
          </Col>
          <Col span={24} className='update'>
            <FormattedMessage id='handbook.update' /> :{" "}
            {new Date(
              dataDetailHanbook.updatedAt
            ).toLocaleDateString()}
          </Col>
          <Col span={24} className='author'>
            <FormattedMessage id='handbook.author' /> :{" "}
            {dataDetailHanbook.adminData &&
              dataDetailHanbook.adminData.lastName}{" "}
            {dataDetailHanbook.adminData &&
              dataDetailHanbook.adminData.firstName}
          </Col>
          <Col span={24} className='title-handbook'>
            {language === LANGUAGES.VI
              ? dataDetailHanbook.name
              : dataDetailHanbook.value_en}
          </Col>
          <Col span={24} className='content-news'>
            {language === LANGUAGES.VI ? (
              <>
                {dataDetailHanbook &&
                  !_.isEmpty(dataDetailHanbook) && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          dataDetailHanbook.descriptionHtml,
                      }}
                    ></div>
                  )}
              </>
            ) : (
              <>
                {dataDetailHanbook &&
                  !_.isEmpty(dataDetailHanbook) && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetailHanbook.htmlEn,
                      }}
                    ></div>
                  )}
              </>
            )}
            {/* {dataDetailHanbook &&
              !_.isEmpty(dataDetailHanbook) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      dataDetailHanbook.descriptionHtml,
                  }}
                ></div>
              )} */}
          </Col>
          <Button
            type='primary'
            onClick={() => this.backPage()}
          >
            <FormattedMessage id='handbook.back' />
          </Button>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailHandbook)
);
