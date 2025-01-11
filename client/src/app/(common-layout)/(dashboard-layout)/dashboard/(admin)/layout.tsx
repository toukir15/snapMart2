"use client";
import "@/src/styles/globals.css";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, SearchIcon } from "@/src/components/icons";
import { AdminSidebarRoutes, VendorSidebarRoutes } from "@/src/const";
import { Input } from "@nextui-org/input";
import { IProductProviderValues, ProductContext } from "@/src/context/product.provider";
import profileImg from "../../../../../../public/profile.jpeg"
import Image from "next/image";

const { Content, Sider } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { productStates } = useContext(
    ProductContext
  ) as IProductProviderValues;
  const { setSearchTerm, searchTerm } = productStates;

  const handleSearchKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSearchOnChange = (e: any) => {
    if (e.target.value === "") {
      setSearchTerm("");
    }
  };

  const menuItems = AdminSidebarRoutes.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.link ? (
      <Link href={item.link}>{item.label}</Link>
    ) : (
      item.label
    ),
    children: item.children
      ? item.children.map((child) => ({
        key: child.key,
        icon: child.icon, // Add icon for nested items
        label: <Link href={child.link}>{child.label}</Link>,
      }))
      : undefined,
  }));

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
        }}
      >

        <Link
          href={"/"}
          className="flex  items-center gap-1 px-6 py-4"
        >
          <div className="relative top-1">
            <Logo color="black" />
          </div>
          {/* Conditionally render text based on the collapsed state */}
          {!collapsed && (
            <span className="text-xl font-medium relative top-1 text-black">
              SnapMart
            </span>
          )}
        </Link>

        {/* Updated Menu with `items` */}
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <header className="py-[12px] px-14 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                onKeyDown={handleSearchKeyPress}
                defaultValue={searchTerm}
                onClear={handleClearSearch}
                onChange={handleSearchOnChange}
                placeholder="Search..."
                color="warning"
                startContent={
                  <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="search"
              />
              <div className="flex items-center space-x-2">
                <div className="border-1 border-gray-300 rounded-full p-[2px]">
                  <Image
                    src={profileImg}
                    alt="User Avatar"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <Content>
          {/* Main content */}
          <div className="xl:p-6 min-h-[calc(100vh-70px)] bg-[#EFF3F4] rounded-lg">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
