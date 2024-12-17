import { Tag } from "antd";
import dayjs from "dayjs";

export const usersColumns = [
    {
        title: "User Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email: string) => <Tag color="lime">{email}</Tag>,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (address: string) => <Tag color="purple">{address}</Tag>,
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role: string) => <Tag color="green">{role}</Tag>,
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
