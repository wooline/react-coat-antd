import { Breadcrumb, Button, Icon, Modal, Table } from "antd";
import RootState from "core/RootState";
import * as React from "react";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { ItemDetail, TableList } from "../type";

interface Props {
  editItem: ItemDetail;
  tableList: TableList;
}

interface State {}

class Component extends React.PureComponent<Props, State> {
  columns: any = [
    {
      title: "头像",
      dataIndex: "avatar",
      render: (src: string) => <img width="30" height="30" src={src} />,
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
    },
  ];
  render() {
    const {
      editItem,
      tableList: { list },
    } = this.props;
    return list ? (
      <DocumentTitle title="管理员设置">
        <div>
          <div className="g-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin/dashboard">
                  <Icon type="home" /> 首页
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>站点设置</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link replace={true} to={""}>
                  全局设置 <Icon type="retweet" />
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="g-content">
            <div className="g-panel g-list">
              <div className="filter">
                <Filter />
              </div>
              <div className="operator" style={{ marginBottom: "20px" }}>
                <Button icon="plus" type="primary">
                  新建总代
                </Button>
              </div>
              <div className="table">
                <Table rowKey="id" pagination={false} columns={this.columns} dataSource={list} />
              </div>
              <Modal visible={editItem && true} footer={null} width={960}>
                dsfdsf
              </Modal>
            </div>
          </div>
        </div>
      </DocumentTitle>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    tableList: state.project.supervisors.tableList,
  };
};

export default connect(mapStateToProps)(Component);
