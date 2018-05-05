import { Avatar, List, Pagination, Button } from "antd";
import classNames from "classnames";
import { NoticeItem, NoticesChannel } from "modules/admin/model/type";
import React from "react";

require("./NoticeList.less");

declare module "antd/lib/list/Item" {
  interface ListItemProps {
    onClick: () => void;
  }
}

interface Props {
  dataSource: NoticesChannel;
  onClick: (item: NoticeItem) => void;
  onClear: () => void;
}

interface State {}

export default class Component extends React.PureComponent<Props, State> {
  createItem = (item: NoticeItem) => {
    const { onClick } = this.props;
    const handleClick = () => onClick(item);
    return (
      <List.Item className={classNames("item", { read: item.read })} key={item.key || item.id} onClick={handleClick}>
        <List.Item.Meta
          className="meta"
          avatar={item.avatar ? <Avatar className="avatar" src={item.avatar} /> : null}
          title={
            <div className="title">
              {item.title}
              <div className="extra">{item.extra}</div>
            </div>
          }
          description={
            <div>
              <div className="description" title={item.description}>
                {item.description}
              </div>
              <div className="datetime">{item.datetime}</div>
            </div>
          }
        />
      </List.Item>
    );
  };
  public render() {
    const {
      dataSource: {
        type,
        list: { pagination, list },
      },
      onClear,
    } = this.props;
    if (list.length) {
      return (
        <div className="admin-NoticeList">
          <List className="list" dataSource={list} renderItem={this.createItem} />
          <div className="con" onClick={onClear}>
            <Button icon="delete" size="small" className="clear">
              清空
            </Button>
            <Pagination className="pagination" size="small" pageSize={pagination.pageSize} total={pagination.total} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="admin-NoticeList">
          <div className="notFound">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg" alt="not found" />
            <div>没有任何信息</div>
          </div>
        </div>
      );
    }
  }
}
