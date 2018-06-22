import * as React from "react";
import RootState from "core/RootState";
import { Button, Modal, Table, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import { TableList, ItemDetail } from "../type";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import DocumentTitle from "react-document-title";

interface Props {
  editItem: ItemDetail;
  tableList: TableList;
}

interface OwnProps {}
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
            <div className="g-panel">
              <div>
                <Button icon="plus" type="primary">
                  新建套餐
                </Button>
              </div>
              <Table rowKey="id" pagination={false} columns={this.columns} dataSource={list} />
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

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  return {
    tableList: state.project.supervisors.tableList,
  };
};
const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
