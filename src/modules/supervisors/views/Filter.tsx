import { Button, Col, DatePicker, Form, Icon, Row, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Lang from "assets/lang";
import InputWithClear from "components/InputWithClear";
import RootState from "core/RootState";
import { getFormDecorators, FilterCols, FilterRows } from "core/utils";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import thisModule from "../index";
import { ListFilter } from "../type";
const FormItem = Form.Item;

interface State {
  expandForm: boolean;
}
interface Props extends FormComponentProps, DispatchProp {
  filter: ListFilter;
}

class Component extends React.PureComponent<Props, State> {
  state = {
    expandForm: false,
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((errors, values: ListFilter) => {
      if (!errors) {
        this.props.dispatch(thisModule.actions.getTableList(values));
      }
    });
  };
  handleFormReset = event => {
    this.props.form.resetFields();
    this.onSubmit(event);
  };
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  renderSimpleForm() {
    const {
      form,
      filter: { createDate, username, status },
    } = this.props;
    const formDecorators = getFormDecorators<ListFilter>(form, {
      username: {
        initialValue: username,
      },
      createDate: {
        initialValue: createDate || [null, null],
      },
      status: {
        initialValue: status,
      },
    });
    return (
      <Form onSubmit={this.onSubmit} layout="inline">
        <Row {...FilterRows}>
          <Col {...FilterCols}>
            <FormItem label="用户名">{formDecorators.username(<InputWithClear placeholder="搜索用户名" />)}</FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem label="创建时间">{formDecorators.createDate(<DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" showTime className="form-item" />)}</FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem label="状态">
              {formDecorators.status(
                <Select>
                  {Lang.supervisor.status.options.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem>
              <Button type="primary" className="g-btn-md" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                <Icon type="down" /> 展开
              </a>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
  renderAdvancedForm() {
    const {
      form,
      filter: { createDate, username, status },
    } = this.props;
    const formDecorators = getFormDecorators<ListFilter>(form, {
      username: {
        initialValue: username,
      },
      createDate: {
        initialValue: createDate || [null, null],
      },
      status: {
        initialValue: status,
      },
    });
    return (
      <Form onSubmit={this.onSubmit} layout="inline">
        <Row {...FilterRows}>
          <Col {...FilterCols}>
            <FormItem label="用户名">{formDecorators.username(<InputWithClear placeholder="搜索用户名" />)}</FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem label="创建时间">{formDecorators.createDate(<DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" showTime className="form-item" />)}</FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem label="状态">
              {formDecorators.status(
                <Select>
                  {Lang.supervisor.status.options.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col {...FilterCols}>
            <FormItem>
              <Button type="primary" className="g-btn-md" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                <Icon type="up" /> 收起
              </a>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
  render() {
    const { expandForm } = this.state;

    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    filter: state.project.supervisors.tableList.filter,
  };
};

export default connect(mapStateToProps)(Form.create()(Component));
