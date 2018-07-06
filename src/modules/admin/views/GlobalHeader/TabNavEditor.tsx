import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import RootState from "core/RootState";
import thisModule from "modules/admin";
import React from "react";
import { DispatchProp, connect } from "react-redux";
import { TabNav } from "../../model/index";
import "./TabNavEditor.less";

interface Props extends FormComponentProps, DispatchProp {
  onCancel: () => void;
  curItem: TabNav;
}

interface State {}

class Component extends React.Component<Props, State> {
  onSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((errors, values: { title: string }) => {
      if (!errors) {
        const { title } = values;
        this.props.dispatch(thisModule.actions.updateTabNav({ ...this.props.curItem, title }));
      }
    });
  };
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return (nextProps.curItem !== this.props.curItem || nextProps.form !== this.props.form) && nextProps.curItem !== null;
  }
  render() {
    const { curItem, form } = this.props;
    const titleDecorator = form.getFieldDecorator("title", {
      initialValue: curItem.title,
      rules: [{ required: true, message: "请输入书签名" }],
    });
    return (
      <div className="admin-GlobalHeader-TabNavEditor">
        <h4 className="title">{curItem.id ? "重命名当前书签：" : "将当前页面加入书签："}</h4>
        <Form layout="horizontal" onSubmit={this.onSubmit}>
          {titleDecorator(<Input placeholder="请输入书签名" />)}
          <div className="g-btns">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button onClick={this.props.onCancel}>取消</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const admin = state.project.admin;
  return {
    curItem: admin.curTabNav,
  };
};

export default connect(mapStateToProps)(
  Form.create({
    mapPropsToFields(props: Props) {
      return {
        title: Form.createFormField({
          value: props.curItem ? props.curItem.title : "",
        }),
      };
    },
  })(Component),
);
