import { Button, Form, Input, DatePicker, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import moment, { Moment } from "moment";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import RootState from "core/RootState";
import { getFormDecorators } from "core/utils";
import thisModule from "../index";
import Lang from "assets/lang";
import { ListFilter } from "../type";
const FormItem = Form.Item;

interface State {}
interface Props extends FormComponentProps, DispatchProp {
  filter: ListFilter;
}

class Component extends React.PureComponent<Props, State> {
  onSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((errors, values: ListFilter) => {
      if (!errors) {
        values.createDate[0] = values.createDate[0] && values.createDate[0].toDate();
        values.createDate[1] = values.createDate[1] && values.createDate[1].toDate();
        this.props.dispatch(thisModule.actions.getTableList(values));
      }
    });
  };

  render() {
    const {
      form,
      filter: { createDate, username, status },
    } = this.props;
    let createDateRange: [Moment, Moment];
    if (createDate) {
      createDateRange = [moment(createDate[0]), moment(createDate[1])];
    } else {
      createDateRange = [null, null];
    }
    const formDecorators = getFormDecorators<ListFilter>(form, {
      username: {
        initialValue: username,
      },
      createDate: {
        initialValue: createDateRange,
      },
      status: {
        initialValue: status,
      },
    });
    form.getFieldDecorator("createdTime");
    return (
      <Form className="g-listFilter" hideRequiredMark layout="inline" onSubmit={this.onSubmit}>
        <FormItem label="用户名">{formDecorators.username(<Input placeholder="搜索用户名" />)}</FormItem>
        <FormItem label="创建时间">{formDecorators.createDate(<DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" showTime />)}</FormItem>
        <FormItem label="状态">
          {formDecorators.status(
            <Select style={{ width: "200px" }}>
              {Lang.supervisor.status.options.map(item => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" className="g-btn-md" htmlType="submit">
            查询
          </Button>
        </FormItem>
        <div className="operator" style={{ marginBottom: "20px" }}>
          <Link to="/admin/agent/primaryAgent/create">
            <Button icon="plus" type="primary">
              新建总代
            </Button>
          </Link>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    filter: state.project.supervisors.tableList.filter,
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
