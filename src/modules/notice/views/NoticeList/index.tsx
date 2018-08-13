import {Avatar, Badge, Button, Checkbox, Pagination, Table} from "antd";
import RootState from "core/RootState";
import {NoticeType, TableList} from "entity/notice";
import thisModule from "modules/notice";
import React from "react";
import {ntrue} from "core/Const";
import {DispatchProp, connect} from "react-redux";

import "./index.less";

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
    render: (text: string, item) => (
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
  dataSource: TableList;
}

interface OwnProps {
  type: NoticeType;
}

class Component extends React.PureComponent<Props, null> {
  onDelete = () => {
    this.props.dispatch(thisModule.actions.deleteList(this.props.type));
  };
  onSelectChange = (selectedIds: string[]) => {
    this.props.dispatch(thisModule.actions.setSelectedRows({type: this.props.type, selectedIds}));
  };
  onSelectAll = e => {
    const selectedIds = e.target.checked ? this.props.dataSource.list.map(item => item.id) : [];
    this.onSelectChange(selectedIds);
  };
  onFilterUnread = () => {
    this.props.dispatch(thisModule.actions.getTableList({unread: this.props.dataSource.filter.unread ? null : ntrue, page: 1}));
  };
  onFilterPage = (page: number) => {
    this.props.dispatch(thisModule.actions.getTableList({page}));
  };
  public render() {
    const {
      dataSource: {filter, list, summary, selectedIds},
    } = this.props;
    const hasSelected = selectedIds.length > 0;
    const rowSelection = {
      selectedRowKeys: selectedIds,
      columnWidth: 25,
      onChange: this.onSelectChange,
    };
    return (
      <div className="admin-notice-NoticeList">
        {list && (
          <div className="main">
            <Checkbox className="selectAll" onChange={this.onSelectAll} checked={!!list.length && selectedIds.length === list.length} />
            <Table showHeader={false} rowKey="id" rowSelection={rowSelection} pagination={false} columns={columns} dataSource={list} />
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    dataSource: state.project.notice.notices[ownProps.type],
  };
};

export default connect(mapStateToProps)(Component);
