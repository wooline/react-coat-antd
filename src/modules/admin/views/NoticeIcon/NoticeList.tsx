import { Avatar, Badge, Button, Checkbox, Pagination, Table } from "antd";
import RootState from "core/RootState";
import { notice } from "core/entity/global.type";
import thisModule from "modules/admin";
import React from "react";
import { DispatchProp, connect } from "react-redux";

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
    render: (text: string, item: notice.Item) => (
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

interface Props extends OwnProps, DispatchProp {
  dataSource: notice.List;
}

interface OwnProps {
  type: notice.NoticeType;
}

interface State {
  selectedRowKeys: string[];
}

class Component extends React.PureComponent<Props, State> {
  state: State = {
    selectedRowKeys: [],
  };
  onRowClick = (record: notice.Item) => {
    alert(record.id);
  };
  onDelete = () => {
    this.props.dispatch(
      thisModule.actions.deleteNotice({
        type: this.props.type,
        ids: [...this.state.selectedRowKeys],
        stateCallback: () => {
          this.setState({ ...this.state, selectedRowKeys: [] });
        },
      }),
    );
  };
  onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ ...this.state, selectedRowKeys });
  };
  onSelectAll = e => {
    const selectedRowKeys = e.target.checked ? this.props.dataSource.list!.map(item => item.id) : [];
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
    this.setState({ ...this.state, selectedRowKeys: [] });
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
            <Checkbox className="selectAll" onChange={this.onSelectAll} checked={!!list.length && selectedRowKeys.length === list.length} />
            <Table onRowClick={this.onRowClick} showHeader={false} rowKey="id" rowSelection={rowSelection} pagination={false} columns={columns} dataSource={list} />
            <div className="con">
              {hasSelected ? (
                <Button icon="delete" size="small" className="btn" onClick={this.onDelete} />
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

export default connect(mapStateToProps)(Component);
