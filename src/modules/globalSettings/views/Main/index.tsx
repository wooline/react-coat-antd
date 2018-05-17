import { Breadcrumb, Button, Card, Form, Input, InputNumber, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Loading from "components/Loading";
import RootState from "core/RootState";
import { global } from "core/entity/global.type";
import thisModule from "modules/globalSettings";
import * as React from "react";
import { LoadingState } from "react-coat-pkg";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import "./index.less";

type GlobalSettingsData = global.settings.Item;

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  moduleLoading: LoadingState;
  dispatch: Dispatch<any>;
  pathname: string;
  formData: GlobalSettingsData;
}

interface OwnProps {}
interface State {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};
class Component extends React.PureComponent<Props, State> {
  onReset = () => {
    this.props.form.resetFields();
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values: GlobalSettingsData) => {
      if (!err) {
        this.props.dispatch(thisModule.actions.updateGlobalSettings({ ...values }));
      }
    });
  };
  render() {
    const {
      moduleLoading,
      pathname,
      formData,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <DocumentTitle title="全局设置">
        <div className="globalSettings">
          <div className="g-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin/dashboard">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>站点设置</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link replace={true} to={pathname}>
                  全局设置
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <h2>全局设置</h2>
          </div>
          <div className="g-content">
            <Card bordered={false}>
              <Form layout="horizontal" hideRequiredMark onSubmit={this.onSubmit}>
                <FormItem label="主题风格" {...formItemLayout}>
                  {getFieldDecorator("theme", {
                    initialValue: formData.theme,
                  })(
                    <Radio.Group>
                      <Radio value="blue">蓝色系</Radio>
                      <Radio value="red">红色系</Radio>
                      <Radio value="green">绿色系</Radio>
                    </Radio.Group>,
                  )}
                </FormItem>
                <FormItem label="分页条数" help="列表每页显示条数" {...formItemLayout}>
                  {getFieldDecorator("pageSize", {
                    initialValue: formData.pageSize,
                  })(<InputNumber min={10} max={50} />)}
                </FormItem>
                <FormItem label="视频目录" help="视频访问的前缀url" {...formItemLayout}>
                  {getFieldDecorator("videoDir", {
                    initialValue: formData.videoDir,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(<Input placeholder="http://" />)}
                </FormItem>
                <FormItem {...submitFormLayout}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button onClick={this.onReset}>重置</Button>
                </FormItem>
              </Form>
            </Card>
          </div>
          <Loading loading={moduleLoading} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    moduleLoading: state.project.globalSettings.loading.global,
    pathname: state.router.location.pathname,
    formData: state.project.app.projectConfig,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Component));
