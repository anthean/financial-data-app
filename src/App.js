import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  // Filtering state
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [revenueRange, setRevenueRange] = useState({ min: "", max: "" });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" });

  // Error state
  const [error, setError] = useState(""); // Holds error messages

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "f3C9F0OilsMWoLGSjXACfJRSbbD5rrXp";
      const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`; // API endpoint
      try {
        const response = await axios.get(url); // Fetch data
        console.log("API Response:", response.data); // Log response
        if (response.data.length === 0) {
          console.warn("No data fetched!");
          return;
        }
        setData(response.data); // Set data state
        setFilteredData(response.data); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching data:", error.message); // Handle errors
      }
    };
    fetchData(); // Call fetch function
  }, []);

  // Sorting function
  const handleSort = key => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc"; // Toggle sorting direction

    const sortedData = [...filteredData].sort((a, b) => {
      if (!a[key] || !b[key]) return 0; // Skip if key is missing

      if (key === "date") {
        // Handle date sorting
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      // Handle numeric sorting
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    });

    setSortConfig({ key, direction }); // Update sorting state
    setFilteredData(sortedData); // Update filtered data
  };

  // Apply filters
  const applyFilters = () => {
    // Reset error state
    setError("");

    let filtered = data;

    // Validate date range
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      if (startDate > endDate) {
        setError("Start date cannot be later than end date.");
        return;
      }
    }

    // Validate revenue range
    if (
      (revenueRange.min && revenueRange.min < 0) ||
      (revenueRange.max && revenueRange.max < 0)
    ) {
      setError("Revenue range cannot contain negative numbers.");
      return;
    }

    // Validate net income range
    if (
      (netIncomeRange.min && netIncomeRange.min < 0) ||
      (netIncomeRange.max && netIncomeRange.max < 0)
    ) {
      setError("Net income range cannot contain negative numbers.");
      return;
    }

    // Filter by date range
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      });
    }

    // Filter by revenue range
    if (revenueRange.min || revenueRange.max) {
      filtered = filtered.filter(item => {
        const revenue = item.revenue || 0;
        return (
          (!revenueRange.min || revenue >= Number(revenueRange.min)) &&
          (!revenueRange.max || revenue <= Number(revenueRange.max))
        );
      });
    }

    // Filter by net income range
    if (netIncomeRange.min || netIncomeRange.max) {
      filtered = filtered.filter(item => {
        const netIncome = item.netIncome || 0;
        return (
          (!netIncomeRange.min || netIncome >= Number(netIncomeRange.min)) &&
          (!netIncomeRange.max || netIncome <= Number(netIncomeRange.max))
        );
      });
    }

    // Check if no data matches the filters
    if (filtered.length === 0) {
      setError("Nothing found! :(");
    }

    setFilteredData(filtered); // Update filtered data
  };

  // Clear filters
  const clearFilters = () => {
    setDateRange({ start: "", end: "" }); // Reset date range
    setRevenueRange({ min: "", max: "" }); // Reset revenue range
    setNetIncomeRange({ min: "", max: "" }); // Reset net income range
    setError(""); // Clear error messages
    setFilteredData(data); // Reset filtered data
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        🍎 AAPL Income Statements 💰
      </h1>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-bold mb-1">Date Range</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={e =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="border rounded w-full px-3 py-2"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={e =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="border rounded w-full px-3 py-2 mt-2"
            />
          </div>

          {/* Revenue Range Filter */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Revenue Range
            </label>
            <input
              type="number"
              placeholder="Min Revenue"
              value={revenueRange.min}
              onChange={e =>
                setRevenueRange({ ...revenueRange, min: e.target.value })
              }
              className="border rounded w-full px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max Revenue"
              value={revenueRange.max}
              onChange={e =>
                setRevenueRange({ ...revenueRange, max: e.target.value })
              }
              className="border rounded w-full px-3 py-2 mt-2"
            />
          </div>

          {/* Net Income Filter */}
          <div>
            <label className="block text-sm font-bold mb-1">
              Net Income Range
            </label>
            <input
              type="number"
              placeholder="Min Net Income"
              value={netIncomeRange.min}
              onChange={e =>
                setNetIncomeRange({ ...netIncomeRange, min: e.target.value })
              }
              className="border rounded w-full px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max Net Income"
              value={netIncomeRange.max}
              onChange={e =>
                setNetIncomeRange({ ...netIncomeRange, max: e.target.value })
              }
              className="border rounded w-full px-3 py-2 mt-2"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th
                onClick={() => handleSort("date")}
                className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors w-40 whitespace-nowrap"
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
