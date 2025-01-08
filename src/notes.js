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

// import React, { useState, useEffect } from "react"; // Import React and hooks for state management and lifecycle methods
// import axios from "axios"; // Import axios for making HTTP requests

// function App() {
//   // State variables
//   const [data, setData] = useState([]); // Holds the original fetched data
//   const [filteredData, setFilteredData] = useState([]); // Holds the data after filtering or sorting
//   const [sortConfig, setSortConfig] = useState(null); // Tracks the current sorting configuration (key and direction)

//   // State variables for filtering
//   const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Tracks the start and end dates for the date range filter
//   const [revenueRange, setRevenueRange] = useState({ min: "", max: "" }); // Tracks the min and max revenue for the revenue range filter
//   const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" }); // Tracks the min and max net income for the net income range filter

//   // Fetch data when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       const apiKey = "f3C9F0OilsMWoLGSjXACfJRSbbD5rrXp"; // API key for authentication
//       const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`; // API endpoint
//       try {
//         const response = await axios.get(url); // Make GET request to fetch data
//         console.log("API Response:", response.data); // Log the API response for debugging
//         if (response.data.length === 0) {
//           console.warn("No data fetched!"); // Log a warning if the response is empty
//           return;
//         }
//         setData(response.data); // Store the fetched data in state
//         setFilteredData(response.data); // Initially filtered data is the same as the fetched data
//       } catch (error) {
//         console.error("Error fetching data:", error.message); // Log errors during data fetching
//       }
//     };
//     fetchData(); // Call the function to fetch data
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   // Handle sorting logic
//   const handleSort = key => {
//     const direction =
//       sortConfig?.key === key && sortConfig.direction === "asc"
//         ? "desc"
//         : "asc"; // Toggle direction: if already ascending, make descending; otherwise, default to ascending

//     const sortedData = [...filteredData].sort((a, b) => {
//       if (!a[key] || !b[key]) return 0; // If the key is missing in either object, skip sorting for that pair

//       if (key === "date") {
//         // Special handling for dates
//         const dateA = new Date(a[key]); // Converts string to Date object
//         const dateB = new Date(b[key]);
//         return direction === "asc" ? dateA - dateB : dateB - dateA; // Compare dates based on the direction
//       }

//       // Sorting for numeric values
//       return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
//     });

//     setSortConfig({ key, direction }); // Update the sort configuration in state
//     setFilteredData(sortedData); // Update the filtered data with the sorted array
//   };

//   // Applies filters based on user input
//   const applyFilters = () => {
//     let filtered = data; // Start with the full data set

//     // Filter by date range
//     if (dateRange.start || dateRange.end) {
//       filtered = filtered.filter(item => {
//         const itemDate = new Date(item.date); // Convert the date string to a Date object
//         const startDate = dateRange.start ? new Date(dateRange.start) : null; // Convert start date to Date object. Set null if empty
//         const endDate = dateRange.end ? new Date(dateRange.end) : null; // Convert end date to Date object. Null if empty

//         return (
//           (!startDate || itemDate >= startDate) && // Include if no start date or item's date is >= start date
//           (!endDate || itemDate <= endDate) // Include if no end date or item's date is <= end date
//         );
//       });
//     }

//     // Filter by revenue range
//     if (revenueRange.min || revenueRange.max) {
//       filtered = filtered.filter(item => {
//         const revenue = item.revenue || 0; // Default to 0 if revenue is missing
//         return (
//           (!revenueRange.min || revenue >= Number(revenueRange.min)) && // Include if no min or revenue >= min
//           (!revenueRange.max || revenue <= Number(revenueRange.max)) // Include if no max or revenue <= max
//         );
//       });
//     }

//     // Filter by net income range
//     if (netIncomeRange.min || netIncomeRange.max) {
//       filtered = filtered.filter(item => {
//         const netIncome = item.netIncome || 0; // Default to 0 if netIncome is missing
//         return (
//           (!netIncomeRange.min || netIncome >= Number(netIncomeRange.min)) && // Include if no min or net income >= min
//           (!netIncomeRange.max || netIncome <= Number(netIncomeRange.max)) // Include if no max or net income <= max
//         );
//       });
//     }

//     setFilteredData(filtered); // Update the filtered data in state
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setDateRange({ start: "", end: "" }); // Reset date range filter
//     setRevenueRange({ min: "", max: "" }); // Reset revenue range filter
//     setNetIncomeRange({ min: "", max: "" }); // Reset net income range filter
//     setFilteredData(data); // Reset filtered data to the original data
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
//         🍎 AAPL Income Statements 💰
//       </h1>

//       {/* Filters Section */}
//       <div className="mb-6">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {/* Date Range Filter */}
//           <div>
//             <label className="block text-sm font-bold mb-1">Date Range</label>
//             <input
//               type="date"
//               value={dateRange.start}
//               onChange={e =>
//                 setDateRange({ ...dateRange, start: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2"
//             />
//             <input
//               type="date"
//               value={dateRange.end}
//               onChange={e =>
//                 setDateRange({ ...dateRange, end: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2 mt-2"
//             />
//           </div>

//           {/* Revenue Range Filter */}
//           <div>
//             <label className="block text-sm font-bold mb-1">
//               Revenue Range
//             </label>
//             <input
//               type="number"
//               placeholder="Min Revenue"
//               value={revenueRange.min}
//               onChange={e =>
//                 setRevenueRange({ ...revenueRange, min: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2"
//             />
//             <input
//               type="number"
//               placeholder="Max Revenue"
//               value={revenueRange.max}
//               onChange={e =>
//                 setRevenueRange({ ...revenueRange, max: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2 mt-2"
//             />
//           </div>

//           {/* Net Income Range Filter */}
//           <div>
//             <label className="block text-sm font-bold mb-1">
//               Net Income Range
//             </label>
//             <input
//               type="number"
//               placeholder="Min Net Income"
//               value={netIncomeRange.min}
//               onChange={e =>
//                 setNetIncomeRange({ ...netIncomeRange, min: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2"
//             />
//             <input
//               type="number"
//               placeholder="Max Net Income"
//               value={netIncomeRange.max}
//               onChange={e =>
//                 setNetIncomeRange({ ...netIncomeRange, max: e.target.value })
//               }
//               className="border rounded w-full px-3 py-2 mt-2"
//             />
//           </div>
//         </div>

//         {/* Filter Buttons */}
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={applyFilters} // Apply filters on click
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Apply Filters
//           </button>
//           <button
//             onClick={clearFilters} // Clear filters on click
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               {/* Sortable Columns */}
//               <th
//                 onClick={() => handleSort("date")} // Sort by date on click
//                 className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
//               >
//                 Date
//               </th>
//               <th
//                 onClick={() => handleSort("revenue")} // Sort by revenue on click
//                 className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
//               >
//                 Revenue
//               </th>
//               <th
//                 onClick={() => handleSort("netIncome")} // Sort by net income on click
//                 className="border px-4 py-2 sm:px-6 text-left cursor-pointer hover:bg-gray-700 transition-colors"
//               >
//                 Net Income
//               </th>
//               <th className="border px-4 py-2 sm:px-6 text-left">
//                 Gross Profit
//               </th>
//               <th className="border px-4 py-2 sm:px-6 text-left">EPS</th>
//               <th className="border px-4 py-2 sm:px-6 text-left">
//                 Operating Income
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Render Rows */}
//             {filteredData.map((item, index) => (
//               <tr
//                 key={index} // Unique key for each row
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                 } hover:bg-gray-200 transition-colors`}
//               >
//                 <td className="border px-4 py-2 sm:px-6">{item.date}</td>
//                 <td className="border px-4 py-2 sm:px-6">
//                   {item.revenue ? `$${item.revenue.toLocaleString()}` : "N/A"}
//                 </td>
//                 <td className="border px-4 py-2 sm:px-6">
//                   {item.netIncome
//                     ? `$${item.netIncome.toLocaleString()}`
//                     : "N/A"}
//                 </td>
//                 <td className="border px-4 py-2 sm:px-6">
//                   {item.grossProfit
//                     ? `$${item.grossProfit.toLocaleString()}`
//                     : "N/A"}
//                 </td>
//                 <td className="border px-4 py-2 sm:px-6">
//                   {item.eps || "N/A"}
//                 </td>
//                 <td className="border px-4 py-2 sm:px-6">
//                   {item.operatingIncome
//                     ? `$${item.operatingIncome.toLocaleString()}`
//                     : "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;
