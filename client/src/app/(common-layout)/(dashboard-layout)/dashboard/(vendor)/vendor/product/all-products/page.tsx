"use client";
import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaEllipsisV } from "react-icons/fa";
import { Dropdown, Menu, Input, Button } from "antd";

const TableWithPaginationAndSearch = () => {
  // Sample data
  const data = [
    { id: 1, name: "John Doe", age: 28, email: "john1@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane2@example.com" },
    { id: 3, name: "Sam Green", age: 45, email: "sam3@example.com" },
    { id: 4, name: "Alice Brown", age: 23, email: "alice4@example.com" },
    { id: 5, name: "Bob White", age: 30, email: "bob5@example.com" },
    { id: 6, name: "Charlie Black", age: 29, email: "charlie6@example.com" },
    { id: 7, name: "Diana Blue", age: 32, email: "diana7@example.com" },
    { id: 8, name: "Eve Red", age: 27, email: "eve8@example.com" },
    { id: 9, name: "Frank Yellow", age: 40, email: "frank9@example.com" },
    { id: 10, name: "Grace Purple", age: 36, email: "grace10@example.com" },
    { id: 11, name: "Hank Gray", age: 31, email: "hank11@example.com" },
    { id: 12, name: "Ivy Green", age: 26, email: "ivy12@example.com" },
    { id: 13, name: "Jack Black", age: 37, email: "jack13@example.com" },
    { id: 14, name: "Karen White", age: 28, email: "karen14@example.com" },
    { id: 15, name: "Leo Brown", age: 33, email: "leo15@example.com" },
    { id: 16, name: "Mia Red", age: 29, email: "mia16@example.com" },
    { id: 17, name: "Nina Blue", age: 25, email: "nina17@example.com" },
    { id: 18, name: "Oscar Green", age: 41, email: "oscar18@example.com" },
    { id: 19, name: "Paula Yellow", age: 39, email: "paula19@example.com" },
    { id: 20, name: "Quinn Purple", age: 24, email: "quinn20@example.com" },
    { id: 21, name: "Ruby Gray", age: 38, email: "ruby21@example.com" },
    { id: 22, name: "Steve Black", age: 35, email: "steve22@example.com" },
    { id: 23, name: "Tina White", age: 30, email: "tina23@example.com" },
    { id: 24, name: "Uma Brown", age: 27, email: "uma24@example.com" },
    { id: 25, name: "Victor Red", age: 43, email: "victor25@example.com" },
    { id: 26, name: "Wendy Blue", age: 34, email: "wendy26@example.com" },
    { id: 27, name: "Xander Green", age: 29, email: "xander27@example.com" },
    { id: 28, name: "Yara Yellow", age: 26, email: "yara28@example.com" },
    { id: 29, name: "Zack Purple", age: 31, email: "zack29@example.com" },
    { id: 30, name: "Amy Gray", age: 22, email: "amy30@example.com" },
    { id: 31, name: "Brian Black", age: 32, email: "brian31@example.com" },
    { id: 32, name: "Cathy White", age: 40, email: "cathy32@example.com" },
    { id: 33, name: "David Brown", age: 38, email: "david33@example.com" },
    { id: 34, name: "Ella Red", age: 25, email: "ella34@example.com" },
    { id: 35, name: "Felix Blue", age: 36, email: "felix35@example.com" },
    { id: 36, name: "Grace Green", age: 28, email: "grace36@example.com" },
    { id: 37, name: "Holly Yellow", age: 33, email: "holly37@example.com" },
    { id: 38, name: "Ian Purple", age: 30, email: "ian38@example.com" },
    { id: 39, name: "Judy Gray", age: 42, email: "judy39@example.com" },
    { id: 40, name: "Kyle Black", age: 29, email: "kyle40@example.com" },
    { id: 41, name: "Luna White", age: 26, email: "luna41@example.com" },
    { id: 42, name: "Mason Brown", age: 35, email: "mason42@example.com" },
    { id: 43, name: "Nora Red", age: 27, email: "nora43@example.com" },
    { id: 44, name: "Oliver Blue", age: 44, email: "oliver44@example.com" },
    { id: 45, name: "Penny Green", age: 37, email: "penny45@example.com" },
    { id: 46, name: "Quincy Yellow", age: 30, email: "quincy46@example.com" },
    { id: 47, name: "Ruth Purple", age: 28, email: "ruth47@example.com" },
    { id: 48, name: "Sam Gray", age: 32, email: "sam48@example.com" },
    { id: 49, name: "Terry Black", age: 39, email: "terry49@example.com" },
    { id: 50, name: "Uma White", age: 31, email: "uma50@example.com" },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Action button handler
  const handleAction = (action, id) => {
    alert(`${action} button clicked for item with ID: ${id}`);
  };

  // Function to generate pagination range with folding
  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 5; // Show only 5 page numbers at a time
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage is at the limit
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Generate the range of page numbers
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  // Dropdown menu for actions
  const actionMenu = (id) => (
    <Menu className="w-32">
      <Menu.Item key="edit" onClick={() => handleAction("Edit", id)}>
        Edit
      </Menu.Item>
      <Menu.Item key="duplicate" onClick={() => handleAction("Duplicate", id)}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleAction("Delete", id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="">
      {/* <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64"
          />
          <Button type="primary" className="bg-orange-500">
            Create Product
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Age
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-700">
                    No items found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {item.age}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      <Dropdown overlay={actionMenu(item.id)} trigger={["click"]}>
                        <Button type="text" icon={<FaEllipsisV />} />
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > itemsPerPage && (
          <div className="flex justify-end mt-6 space-x-2">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              icon={<GrPrevious />}
            />

            {getPaginationRange().map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                type={currentPage === pageNumber ? "primary" : "default"}
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              icon={<GrNext />}
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TableWithPaginationAndSearch;