import { Avatar, Badge, Button, Pagination, Table } from "antd";
import RootState from "core/RootState";
import { global } from "core/entity/global.type";
import thisModule from "modules/admin";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

require("./NoticeList.less");

const columns = [
  {
    title: "avatar",
    dataIndex: "avatar",
    className: "avatar",
    width: 50,
    render: (text: string) => (text ? <Avatar className="avatar" src={text} /> : null),
  },
  {
    title: "content",
    dataIndex: "title",
    className: "content",
    render: (text: string, item: global.notice.Item) => (
      <div>
        <div className="title">
          {item.unread ? <Badge status="error" /> : null}
          {text}
        </div>
        <p>{item.description}</p>
        <div>
          <div className="datetime">{item.datetime}</div>
          <div className="extra">{item.extra}</div>
        </div>
      </div>
    ),
  },
];

interface Props extends OwnProps {
  dispatch: Dispatch<any>;
  dataSource: global.notice.List;
}

interface OwnProps {
  type: global.notice.NoticeType;
}

interface State {
  selectedRowKeys: string[];
}

class Component extends React.PureComponent<Props, State> {
  state: State = {
    selectedRowKeys: [],
  };
  onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ ...this.state, selectedRowKeys });
  };
  onFilterUnread = () => {
    const {
      dispatch,
      dataSource: { filter },
    } = this.props;
    dispatch(thisModule.actions.getNotices({ ...filter, unread: !filter.unread }));
  };
  onFilterPage = (page: number) => {
    const {
      dispatch,
      dataSource: { filter },
    } = this.props;
    dispatch(thisModule.actions.getNotices({ ...filter, page }));
  };
  public render() {
    const {
      dataSource: { filter, list, summary },
    } = this.props;
    const { selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys,
      columnWidth: 25,
      onChange: this.onSelectChange,
    };
    return (
      <div className="admin-NoticeList">
        {list && summary ? (
          <div className="main">
            <Table showHeader={false} rowKey="id" rowSelection={rowSelection} pagination={false} columns={columns} dataSource={list} />
            <div className="con">
              {hasSelected ? (
                <Button icon="delete" size="small" className="btn" />
              ) : (
                <Button size="small" className="btn" onClick={this.onFilterUnread} type={filter.unread ? "primary" : "default"}>
                  未读
                </Button>
              )}
              <Pagination onChange={this.onFilterPage} className="pagination" size="small" current={filter.page} pageSize={filter.pageSize} total={summary.total} />
            </div>
          </div>
        ) : (
          <div className="main">
            <div className="loading">loading...</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    dataSource: state.project.admin.notices[ownProps.type],
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
