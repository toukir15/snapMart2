import { Tag } from "antd";
import dayjs from "dayjs";


export const usersColumns = [
    {
        title: "Profile Photo",
        dataIndex: "profilePhoto",
        key: "profilePhoto",
        render: (profilePhoto: string) => (
            <img
                src={profilePhoto}
                alt="profilePhoto"
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
            />
        ),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => <Tag color={`${status == "ACTIVE" ? "green" : "red"}`}>{status}</Tag>,
    },
];

export const shopsColumns = [
    {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        render: (logo: string) => (
            <img
                src={logo}
                alt="logo"
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
            />
        ),
    },
    {
        title: "Brand",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        render: (status: string) => {
            console.log(status)
            return <Tag color={`${status ? "green" : "red"}`}>{status ? "Active" : "Block"}</Tag>
        },
    },
];

export const productColumns = [
    {
        title: "ProductName",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Category",
        dataIndex: ["category", "name"],
        key: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price: string) => <Tag color="purple">{price}</Tag>,
    },
    {
        title: "Inventory Count",
        dataIndex: "inventoryCount",
        key: "inventoryCount",
        render: (inventoryCount: string) => <Tag color="green">{inventoryCount}</Tag>,
    },
    {
        title: "Style Code",
        dataIndex: "styleCode",
        key: "styleCode",
        render: (styleCode: string) => <Tag color="green">{styleCode}</Tag>,
    },
    {
        title: "Color",
        dataIndex: "color",
        key: "color",
        render: (color: string) => <Tag color="red">{color}</Tag>,
    },
    {
        title: "DepartMent",
        dataIndex: "department",
        key: "department",
        render: (department: string) => <Tag color="magenta">{department}</Tag>,
    },
];

export const paymentColumns = [
    {
        title: "User Name",
        dataIndex: ["user", "name"],
        key: "name",
    },
    {
        title: "User Email",
        dataIndex: ["user", "email"],
        key: "email",
        render: (email: string) => {
            return <Tag color={"blue"}>{email}</Tag>;
        },
    },
    {
        title: "Is Verified",
        dataIndex: ["user", "isVerified"],
        key: "isVerified",
        render: (isVerified: boolean) => {
            return (
                <Tag color={isVerified ? "green" : "red"}>
                    {isVerified ? "Verified" : "Not Verified"}
                </Tag>
            );
        },
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: string) => {
            return <Tag color="pink">{dayjs(createdAt).format("YYYY-MM-DD")}</Tag>;
        },
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: string) => {
            return <Tag color="gold-inverse">${amount}</Tag>;
        },
    },
];
