import { Avatar, List } from "antd";
import classNames from "classnames";
import { NoticeItem } from "modules/admin/model/type";
import React from "react";

require("./NoticeList.less");

declare module "antd/lib/list/Item" {
  interface ListItemProps {
    onClick: () => void;
  }
}

interface Props {
  dataSource: NoticeItem[];
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
    const { dataSource, onClear } = this.props;
    if (dataSource.length) {
      return (
        <div className="admin-NoticeList">
          <List className="list" dataSource={dataSource} renderItem={this.createItem} />
          <div className="clear" onClick={onClear}>
            清空信息
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
