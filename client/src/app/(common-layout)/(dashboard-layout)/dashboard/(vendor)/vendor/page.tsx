"use client"
import React from "react";
import CountUp from "react-countup";
import { AiOutlineShoppingCart, AiOutlineDollarCircle } from 'react-icons/ai';
import { BsBox } from 'react-icons/bs';
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
  const stats = [
    {
      title: 'Total Products',
      value: 12,
      icon: <BsBox className="text-blue-500 text-2xl" />,
      bg: 'bg-green-100'
    },
    {
      title: 'Total Sales',
      value: 10,
      icon: <AiOutlineShoppingCart className="text-green-500 text-2xl" />,
      bg: 'bg-green-100'
    },
    {
      title: 'Total Revenue',
      value: '$3116',
      icon: <AiOutlineDollarCircle className="text-purple-500 text-2xl" />,
      bg: 'bg-purple-100'
    }
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className=" ">
      {/* Header */}


      {/* Summary Cards */}
      <div className="flex justify-between gap-4 mb-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center bg-white justify-between rounded-lg border border-gray-200 p-4 shadow-sm w-full"
          >
            <div>
              <h4 className="text-gray-500">{stat.title}</h4>
              <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <section className="grid grid-cols-[60%,38%] gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Chart</h2>
          <div className="h-[350px] rounded-lg flex items-center justify-center">
            <BarChart
              width={600}
              height={350}
              data={barData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="2 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" />
              <Bar dataKey="projects" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
          <div className="h-[300px] max-w-[400px] rounded-lg flex items-center justify-center">
            <PieChart width={300} height={400}>
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
