import { Icon, Menu } from "antd";
import RootState from "core/RootState";
import { MenuItemData } from "modules/admin/model/type";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

const { SubMenu } = Menu;

interface Props {
  collapsed: boolean;
  dataSource: MenuItemData[];
  pathname: string;
}

interface State {
  selectedKey: string;
  openKeys: string[];
}

interface OwnProps {}

function mapMenuData(menus: MenuItemData[]) {
  const maps: { [key: string]: string[] } = {};
  const links: string[] = [];
  const folders: string[] = [];
  const checkData = (item: MenuItemData, parent?: string) => {
    if (!maps[item.path]) {
      maps[item.path] = [];
    }
    if (parent) {
      maps[item.path].push(parent, ...maps[parent]);
    }
    if (item.children && item.children.length) {
      item.children.forEach(subItem => checkData(subItem, item.path));
      folders.push(item.path);
    } else {
      links.push(item.path);
    }
  };
  menus.forEach(subItem => checkData(subItem));
  return {
    links: links.reduce((pre, cur) => {
      pre[cur] = maps[cur].reverse();
      return pre;
    }, {}),
    folders: folders.reduce((pre, cur) => {
      pre[cur] = [cur, ...maps[cur]].reverse();
      return pre;
    }, {}),
  };
}
function getSelectedMenuKeys(linksKeys: { [key: string]: string[] }, pathname: string) {
  const selectedKeys = Object.keys(linksKeys).filter(key => pathToRegexp(key).test(pathname));
  if (selectedKeys.length) {
    return { selectedKey: selectedKeys[0], openKeys: linksKeys[selectedKeys[0]] };
  } else {
    return { selectedKey: "", openKeys: [] };
  }
}
function getIcon(icon: string | undefined) {
  if (typeof icon === "string" && icon.indexOf("http") === 0) {
    return <img src={icon} alt="icon" className="icon sider-menu-item-img" />;
  }
  if (typeof icon === "string") {
    return <Icon type={icon} />;
  }
  return icon;
}
class Component extends React.Component<Props, State> {
  linksKeys: { [key: string]: string[] };
  foldersKeys: { [key: string]: string[] };
  constructor(props: Props) {
    super(props);
    const { links, folders } = mapMenuData(props.dataSource);
    this.linksKeys = links;
    this.foldersKeys = folders;
    const { selectedKey, openKeys } = getSelectedMenuKeys(this.linksKeys, this.props.pathname);
    this.state = {
      selectedKey,
      openKeys,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.pathname !== this.props.pathname) {
      const { selectedKey, openKeys } = getSelectedMenuKeys(this.linksKeys, nextProps.pathname);
      this.setState({
        selectedKey,
        openKeys,
      });
    }
  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.collapsed !== this.props.collapsed || nextState.openKeys.join(" ") !== this.state.openKeys.join(" ") || nextState.selectedKey !== this.state.selectedKey;
  }
  folderHandler = ({ key }: { key: string }) => {
    let openKeys = [...this.state.openKeys];
    const n = openKeys.indexOf(key);
    if (n > -1) {
      openKeys = openKeys.slice(0, n);
    } else {
      openKeys = this.foldersKeys[key];
    }
    this.setState({
      selectedKey: this.state.selectedKey,
      openKeys,
    });
  };
  generateMenu(menusData: MenuItemData[]) {
    return menusData.map(item => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
            onTitleClick={this.folderHandler}
          >
            {this.generateMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path}>
            {item.target ? (
              <a href={item.path} target={item.target}>
                {getIcon(item.icon)} <span>{item.name}</span>
              </a>
            ) : (
              <Link to={item.path} replace={item.path === this.props.pathname}>
                {getIcon(item.icon)} <span>{item.name}</span>
              </Link>
            )}
          </Menu.Item>
        );
      }
    });
  }
  render() {
    const { collapsed, dataSource } = this.props;
    const { openKeys, selectedKey } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : { openKeys };
    return (
      <Menu key="SiderMenu" theme="dark" mode="inline" {...menuProps} selectedKeys={[selectedKey]} style={{ padding: "16px 0", width: "100%" }}>
        {this.generateMenu(dataSource)}
      </Menu>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const layout = state.project.admin;
  return {
    collapsed: layout.siderCollapsed,
    dataSource: layout.menuData,
    pathname: state.router.location.pathname,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Component);
