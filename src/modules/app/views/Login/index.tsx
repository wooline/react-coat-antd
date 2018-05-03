import { Button, Form, Input, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import RootState from "core/RootState";
import thisModule from "modules/app";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import DocumentTitle from "react-document-title";

require("./index.less");
const Logo = require("./imgs/logo.svg");

interface Props extends FormComponentProps, RouteComponentProps<any> {
  dispatch: Dispatch<any>;
  hasLogined: boolean;
  logining: boolean;
}
interface OwnProps {}
interface State {
  redirectToReferrer: boolean;
}

class Component extends React.PureComponent<Props, State> {
  public render() {
    const {
      dispatch,
      hasLogined,
      logining,
      location,
      form: { getFieldDecorator, validateFields },
    } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };
    const onSubmit = event => {
      event.preventDefault();
      validateFields((errors, values) => {
        if (!errors) {
          dispatch(thisModule.actions.app_login(values) as any);
        }
      });
    };
    const usernameDecorator = getFieldDecorator("username", {
      rules: [
        {
          required: true,
          message: "Please input your username!",
        },
      ],
    });

    const passwordDecorator = getFieldDecorator("password", {
      rules: [
        {
          required: true,
          message: "Please input your Password!",
        },
      ],
    });
    return hasLogined ? (
      <Redirect to={from} />
    ) : (
      <DocumentTitle title="登录">
        <div className="app-Login">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <span>Ant Design</span>
          </div>
          <Form onSubmit={onSubmit} className="form">
            <Form.Item hasFeedback>{usernameDecorator(<Input placeholder="Username" />)}</Form.Item>
            <Form.Item hasFeedback>{passwordDecorator(<Input type="password" placeholder="Password" />)}</Form.Item>
            <Row>
              <Button type="primary" htmlType="submit" loading={logining}>
                登 录
              </Button>
              <p>
                <span>Username：admin</span>
                <span>Password：admin</span>
              </p>
            </Row>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const app = state.project.app;
  const curUser = app.curUser;
  const loginLoading = app.loading.login;
  return {
    hasLogined: curUser.uid && curUser.uid !== "0",
    logining: Boolean(loginLoading && loginLoading !== "Stop"),
  };
};
const mapDispatchToProps = (dispatch: Dispatch<string>, ownProps: OwnProps) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Component));
