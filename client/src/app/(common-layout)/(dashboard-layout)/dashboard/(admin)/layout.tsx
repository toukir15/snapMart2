"use client";
import "@/src/styles/globals.css";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/src/components/icons";
import { AdminSidebarRoutes, VendorSidebarRoutes } from "@/src/const";

const { Header, Content, Sider } = Layout;

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

  // Convert VendorSidebarRoutes to `items` array for Menu
  const menuItems = AdminSidebarRoutes.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.link}>{item.label}</Link>,
  }));

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link href="/vendor">Vendor</Link>,
    },
    {
      title: <span className="text-orange-500 font-medium">{path}</span>,
    },
  ];

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
          <div className="relative top-1">
            <Logo color="white" />
          </div>
          {/* Conditionally render text based on the collapsed state */}
          {!collapsed && (
            <span className="text-xl font-medium relative top-1 text-white">
              SnapMart
            </span>
          )}
        </Link>

        {/* Updated Menu with `items` */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        {/* Header */}
        <Header style={{ padding: 0, background: colorBgContainer }} />

        {/* Main content area */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={breadcrumbItems}
          />

          {/* Main content */}
          <div className="xl:p-6 min-h-[360px] bg-white rounded-lg">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
