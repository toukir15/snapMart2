"use client";
import "@/src/styles/globals.css";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { useState } from "react";
import { FaChartPie, FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { MdPayment } from "react-icons/md";
import { GrAppsRounded } from "react-icons/gr";
// import logo from "../../../public/plant.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "@/src/components/icons";

const { Header, Content, Sider } = Layout;
const items = [
  {
    label: "Dashboard",
    key: "1",
    icon: <FaChartPie className="color" size={20} />,
    link: "/admin/dashboard",
  },
  {
    label: "Create Product",
    key: "5",
    icon: <GrAppsRounded size={20} />,
    link: "/admin/posts",
  },
  {
    label: "Products",
    key: "3",
    icon: <FaRegUser size={20} />,
    link: "/admin/users",
  },
  {
    label: "Order",
    key: "4",
    icon: <MdPayment size={20} />,
    link: "/admin/payments",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentPath = usePathname();
  const path = currentPath.split("/")[2];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for larger screens */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#000",
        }}
      >
        {/* Logo Section */}
        <Link
          href={"/"}
          className="flex justify-center items-center gap-1 px-2 py-4"
        >
          <div>
            <Logo size={40} color={"black"} />
          </div>
          {/* Conditionally render text based on the collapsed state */}
          {!collapsed && (
            <span className="text-xl font-medium relative top-1 ">
              SnapMart
            </span>
          )}
        </Link>

        <Menu defaultSelectedKeys={["1"]} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link className="font-medium" href={item.link}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        {/* Header */}
        <Header style={{ padding: 0, background: colorBgContainer }} />

        {/* Main content area */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="text-green-500 font-medium">{path}</span>
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Main content */}
          <div className="xl:p-6 min-h-[360px] bg-[#F7F7F7] mx-5 rounded-lg">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
