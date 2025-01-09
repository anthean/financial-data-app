import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  // function to fetch the data from url
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "f3C9F0OilsMWoLGSjXACfJRSbbD5rrXp";
      const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`;
      try {
        const response = await axios.get(url);
        console.log("API Response:", response.data);
        if (response.data.length === 0) {
          console.warn("No data fetched!");
          return;
        }
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSort = key => {
    const direction =
      // ?. chaining ensures code doesn't throw error if sortConfig is null/undefined
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? // default is ascending bc == "asc"
          // if default is set to asc then it'll swithc to desc when clicked
          // otherwise it's set to asc if no direction has been assigned
          "desc"
        : "asc";

    const sortedData = [...filteredData].sort((a, b) => {
      if (!a[key] || !b[key]) return 0;

      if (key === "date") {
        // convereted to date objects to be sorted
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        // if direction is asc dateA-dateB
        // if direction is desc dateB-dateA
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    });

    // updates the key's current direction (asc or desc)
    setSortConfig({ key, direction });
    // rerenders the data in the table in the newly sorted order
    setFilteredData(sortedData);
  };

  return (
    // horizontal slider for the entire table
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        🍎 AAPL Income Statements 💰
      </h1>

      {/* responsive table wrapper for content inside columns in the table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th
                onClick={() => handleSort("date")}
                className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
              >
                Date
              </th>
              <th
                onClick={() => handleSort("revenue")}
                className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
              >
                Revenue
              </th>
              <th
                onClick={() => handleSort("netIncome")}
                className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
              >
                Net Income
              </th>
              <th className="border px-4 py-2 sm:px-6 text-left">
                Gross Profit
              </th>
              <th className="border px-4 py-2 sm:px-6 text-left">EPS</th>
              <th className="border px-4 py-2 sm:px-6 text-left">
                Operating Income
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="border px-4 py-2 sm:px-6">{item.date}</td>
                <td className="border px-4 py-2 sm:px-6">
                  {item.revenue ? `$${item.revenue.toLocaleString()}` : "N/A"}
                </td>
                <td className="border px-4 py-2 sm:px-6">
                  {item.netIncome
                    ? `$${item.netIncome.toLocaleString()}`
                    : "N/A"}
                </td>
                <td className="border px-4 py-2 sm:px-6">
                  {item.grossProfit
                    ? `$${item.grossProfit.toLocaleString()}`
                    : "N/A"}
                </td>
                <td className="border px-4 py-2 sm:px-6">
                  {item.eps || "N/A"}
                </td>
                <td className="border px-4 py-2 sm:px-6">
                  {item.operatingIncome
                    ? `$${item.operatingIncome.toLocaleString()}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
