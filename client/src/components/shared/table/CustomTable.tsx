"use client";
import React, { useState, ReactNode } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
    header: string;
    key: keyof T;
    render?: (item: T) => ReactNode;
}

interface Action<T> {
    label: string;
    onClick: (item: T) => void;
    icon?: ReactNode;
}

interface ReusableTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    itemsPerPage?: number;
    title?: string;
    onCreate?: () => void;
}

const ReusableTable = <T extends { id: number }>({
    data,
    columns,
    actions = [],
    itemsPerPage = 7,
    title = "Table",
    onCreate,
}: ReusableTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const toggleMenu = (id: number) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
                {onCreate && (
                    <button
                        onClick={onCreate}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded flex items-center"
                    >
                        Create new
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-[#EAEBED] hover:bg-[#F0F0F1] transition duration-150 border-b text-sm">
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    className="py-3 px-2 text-left font-medium text-gray-700"
                                >
                                    {col.header}
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="py-3 px-2 text-left font-medium text-gray-700">
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50 text-sm"
                            >
                                {columns.map((col) => (
                                    <td key={String(col.key)} className="py-3 px-2">
                                        {col.render ? (
                                            col.render(item)
                                        ) : typeof item[col.key] === "string" &&
                                            (item[col.key] as string).startsWith("http") ? (
                                            <img
                                                src={item[col.key] as string}
                                                alt="Image"
                                                className="w-12 h-12 rounded-md object-cover"
                                            />
                                        ) : (
                                            item[col.key] as ReactNode
                                        )}
                                    </td>
                                ))}
                                {actions.length > 0 && (
                                    <td className="py-3 px-2 relative">
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className={`text-gray-500 hover:text-gray-700 focus:outline-none border p-2 rounded ${activeMenuId === item.id ? "bg-[#F0F0F1]" : ""
                                                }`}
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {activeMenuId === item.id && (
                                            <div className="absolute right-[84px] mt-1 w-fit bg-white rounded shadow-lg z-50 border">
                                                {actions.map((action, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => action.onClick(item)}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    >
                                                        {action.icon}
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center font-medium ">
                <div className="flex items-center justify-between w-fit gap-1 mt-6 text-sm">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center px-4 py-[6px] border rounded ${currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-[6px] rounded ${currentPage === i + 1
                                    ? "bg-[#F6F7F8] text-gray-700 border "
                                    : "text-gray-700 hover:bg-gray-50 border"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-4 py-[6px] border rounded ${currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReusableTable;
