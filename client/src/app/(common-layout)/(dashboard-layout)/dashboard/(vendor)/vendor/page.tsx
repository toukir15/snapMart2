"use client"
import React from "react";
import CountUp from "react-countup";
import { PieChart, Pie, Tooltip, Cell, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

const App = () => {
  const data = [
    { name: "JavaScript", value: 40 },
    { name: "Python", value: 30 },
    { name: "Java", value: 20 },
    { name: "C++", value: 10 },
  ];

  const barData = [
    { name: "JavaScript", students: 400, projects: 240 },
    { name: "Python", students: 300, projects: 139 },
    { name: "Java", students: 200, projects: 980 },
    { name: "C++", students: 278, projects: 390 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className=" min-h-screen p-6">
      {/* Header */}


      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#ffeaea] shadow rounded-lg py-8 px-4">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-4xl font-bold text-[#f76363]">
            <CountUp end={10042} duration={2} separator="," />
          </p>
          <p className="text-gray-500">All running & completed projects</p>
        </div>
        <div className="bg-[#e3fff3] shadow rounded-lg py-8 px-4">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold text-green-600">
            <CountUp end={10042} duration={2} separator="," />
          </p>
          <p className="text-gray-500">+12% Completion rate this month</p>
        </div>
        <div className="bg-[#ffffd8] shadow rounded-lg py-8 px-4">
          <h2 className="text-lg font-semibold">Complete Order</h2>
          <p className="text-4xl font-bold text-[#b4b42b]">
            <CountUp end={923} duration={2} separator="," />
          </p>
          <p className="text-gray-500">+8% Running projects increase</p>
        </div>
        <div className="bg-[#f9e3ff] shadow rounded-lg py-8 px-4">
          <h2 className="text-lg font-semibold">Pending Order</h2>
          <p className="text-4xl font-bold text-[#da56fe]">
            <CountUp end={923} duration={2} separator="," />
          </p>
          <p className="text-gray-500">+8% Running projects increase</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-[60%,39%] gap-4 mb-6">
        {/* Bar Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Chart</h2>
          <div className="h-[400px] rounded-lg flex items-center justify-center">
            <BarChart
              width={850}
              height={350}
              data={barData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" />
              <Bar dataKey="projects" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
          <div className="h-[400px] rounded-lg flex items-center justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </section>


      {/* Other Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4" >
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Name</th>
                <th className="border-b py-2 px-4">Status</th>
                <th className="border-b py-2 px-4">Date</th>
                <th className="border-b py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Daniel Foster</td>
                <td className="border-b py-2 px-4 text-red-600">Failed</td>
                <td className="border-b py-2 px-4">July 12, 2023</td>
                <td className="border-b py-2 px-4 text-red-600">-$569.12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Name</th>
                <th className="border-b py-2 px-4">Status</th>
                <th className="border-b py-2 px-4">Date</th>
                <th className="border-b py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Robert Carter</td>
                <td className="border-b py-2 px-4 text-yellow-600">Pending</td>
                <td className="border-b py-2 px-4">June 14, 2023</td>
                <td className="border-b py-2 px-4 text-green-600">$2,438.71</td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4">Daniel Foster</td>
                <td className="border-b py-2 px-4 text-red-600">Failed</td>
                <td className="border-b py-2 px-4">July 12, 2023</td>
                <td className="border-b py-2 px-4 text-red-600">-$569.12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section >
    </div >
  );
};

export default App;
