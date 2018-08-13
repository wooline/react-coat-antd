import {Breadcrumb, Button, Icon, Modal, Table} from "antd";
import RootState from "core/RootState";
import * as React from "react";
import DocumentTitle from "react-document-title";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {tableColumns} from "utils/typeCheck";
// import Filter from "./Filter";
import {ItemDetail, TableList, ListItem} from "entity/agent";

interface Props {
  editItem: ItemDetail;
  tableList: TableList;
}

class Component extends React.PureComponent<Props, {}> {
  columns = tableColumns<ListItem>([
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "推荐人",
      dataIndex: "parentUsername",
    },
    {
      title: "分红套餐",
      dataIndex: "planName",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
    },
    {
      title: "销售总额",
      dataIndex: "teamSale",
    },
  ]);
  render() {
    const {
      editItem,
      tableList: {list},
    } = this.props;
    return list ? (
      <DocumentTitle title="代理管理">
        <div>
          <div className="g-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/admin/dashboard">
                  <Icon type="home" /> 首页
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>资源管理范例</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link replace={true} to={""}>
                  代理管理 <Icon type="retweet" />
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="g-content">
            <div className="g-panel g-list">
              <div className="filter">dsfd</div>
              <div className="operator" style={{marginBottom: "20px"}}>
                <Button icon="plus" type="primary">
                  新建代理
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
    tableList: state.project.agent.tableList,
  };
};

export default connect(mapStateToProps)(Component);
