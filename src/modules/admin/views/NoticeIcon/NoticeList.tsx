import { Avatar, Table, Pagination, Button, Badge } from "antd";
import { NoticeItem, NoticesChannel } from "modules/admin/model/type";
import React from "react";

require("./NoticeList.less");

const columns = [
  {
    title: "a",
    dataIndex: "avatar",
    className: "avatar",
    width: 50,
    render: (text: string) => (text ? <Avatar className="avatar" src={text} /> : null),
  },
  {
    title: "content",
    dataIndex: "title",
    className: "content",
    render: (text: string, item: NoticeItem) => (
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

interface Props {
  dataSource: NoticesChannel;
  onClick: (item: NoticeItem) => void;
  onFilter: (type: string, page: number, unread: boolean) => void;
}

interface State {
  selectedRowKeys: string[];
}

export default class Component extends React.PureComponent<Props, State> {
  state: State = {
    selectedRowKeys: [],
  };
  onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ ...this.state, selectedRowKeys });
  };
  public render() {
    const {
      dataSource: {
        type,
        list: { pagination, list, filter },
      },
    } = this.props;
    const { selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys,
      columnWidth: 25,
      onChange: this.onSelectChange,
    };
    const onFilterUnread = () => {
      this.props.onFilter(type, pagination.page, !filter.unread);
    };
    const onFilterPage = (page: number, pageSize: number) => {
      this.props.onFilter(type, page, filter.unread);
    };
    return (
      <div className="admin-NoticeList">
        <div className="main">
          <Table showHeader={false} rowKey="id" rowSelection={rowSelection} pagination={false} columns={columns} dataSource={list} />
          <div className="con">
            {hasSelected ? (
              <Button icon="delete" size="small" className="btn" />
            ) : (
              <Button size="small" className="btn" onClick={onFilterUnread} type={filter.unread ? "primary" : "default"}>
                未读
              </Button>
            )}
            <Pagination onChange={onFilterPage} className="pagination" size="small" current={pagination.page} pageSize={pagination.pageSize} total={pagination.total} />
          </div>
        </div>
      </div>
    );
  }
}
