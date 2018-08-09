import { Icon, Menu } from "antd";
import { MenuItem } from "core/entity/adminLayout";
import RootState from "core/RootState";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

interface Props extends DispatchProp {
  collapsed: boolean;
  dataSource: MenuItem[];
  pathname: string;
}

interface State {
  pathname: string;
  linksKeys: { [key: string]: string[] };
  foldersKeys: { [key: string]: string[] };
  selectedKey: string;
  openKeys: string[];
}

function mapMenuData(menus: MenuItem[]) {
  const maps: { [key: string]: string[] } = {};
  const links: string[] = [];
  const folders: string[] = [];
  const checkData = (item: MenuItem, parent?: string) => {
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
  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    if (nextProps.pathname !== prevState.pathname) {
      const { selectedKey, openKeys } = getSelectedMenuKeys(prevState.linksKeys, nextProps.pathname);
      return {
        linksKeys: prevState.linksKeys,
        foldersKeys: prevState.foldersKeys,
        selectedKey,
        openKeys,
        pathname: nextProps.pathname,
      };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);
    const { links, folders } = mapMenuData(props.dataSource);
    const { selectedKey, openKeys } = getSelectedMenuKeys(links, this.props.pathname);
    this.state = {
      pathname: "",
      linksKeys: links,
      foldersKeys: folders,
      selectedKey,
      openKeys,
    };
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
      openKeys = this.state.foldersKeys[key];
    }
    this.setState({
      selectedKey: this.state.selectedKey,
      openKeys,
    });
  };
  generateMenu(menusData: MenuItem[]) {
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

const mapStateToProps = (state: RootState) => {
  return {
    collapsed: state.project.admin.siderCollapsed,
    dataSource: state.project.admin.layout.menu,
    pathname: state.router.location.pathname,
  };
};

export default connect(mapStateToProps)(Component);
