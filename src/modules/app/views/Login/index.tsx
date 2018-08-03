import { Button, Form, Input, Row } from "antd";
import { FormComponentProps } from "antd/lib/form";
import RootState from "core/RootState";
import thisModule from "modules/app";
import * as React from "react";
import DocumentTitle from "react-document-title";
import { connect, DispatchProp } from "react-redux";

require("./index.less");
const Logo = require("./imgs/logo.svg");

interface Props extends FormComponentProps, DispatchProp {
  logining: boolean;
}
interface State {
  redirectToReferrer: boolean;
}

class Component extends React.PureComponent<Props, State> {
  public render() {
    const {
      dispatch,
      logining,
      form: { getFieldDecorator, validateFields },
    } = this.props;
    const onSubmit = event => {
      event.preventDefault();
      validateFields((errors, values) => {
        if (!errors) {
          dispatch(thisModule.actions.login(values));
        }
      });
    };
    const usernameDecorator = getFieldDecorator("username", {
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          message: "Please input your username!",
        },
      ],
    });

    const passwordDecorator = getFieldDecorator("password", {
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          message: "Please input your Password!",
        },
      ],
    });
    return (
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

const mapStateToProps = (state: RootState) => {
  const app = state.project.app;
  const loginLoading = app.loading.login;
  return {
    logining: Boolean(loginLoading && loginLoading !== "Stop"),
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
