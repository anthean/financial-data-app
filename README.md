# 🍎 AAPL Income Statements Viewer 💰

This project is a React application that fetches and displays Apple's income statements using the Financial Modeling Prep API. It includes features such as filtering by date, revenue, and net income, sorting columns, and displaying financial data in a responsive table format.

---

## **Features**
- Fetches income statements for Apple Inc. (AAPL) from the Financial Modeling Prep API.
- Sorting functionality for date, revenue, and net income.
- Filtering functionality:
  - Date range (example: 2020–2024).
  - Revenue range.
  - Net income range.
- Error handling for invalid filters (e.g., negative values or incorrect date ranges).
- Responsive design for mobile and desktop devices.

---

## **Technologies Used**
- **React**: Frontend framework.
- **Axios**: For making API requests.
- **TailwindCSS**: For styling the application.
- **JavaScript**: For application logic.

---

### Prerequisites

Ensure you have the following installed:
- **Node.js** (Version 18 or higher)
- **npm** (Version 8 or higher)

## **Project Structure**
```bash
aapl-income-statements/
├── src/
│   ├── components/
│   │   ├── Filters.js
│   │   └── Table.js
│   ├── App.js
│   ├── index.js
│   └── styles/
├── public/
├── .env
├── package.json
└── README.md

```

---
## **Getting Started**

1. Clone the Repository: Clone this project from GitHub to your local machine:

```
git clone https://github.com/anthean/financial-data-app.git
```

2. Navigate to the Project Directory: Go to the folder where the project is located:
```cd aapl-income-statements```

3. Install Dependencies: Install all necessary npm packages by running:
```npm install```

4. Add API Key:

Create a .env file in the root directory of the project:
```touch .env```

Open the .env file and add the following line:
```REACT_APP_API_KEY=your_api_key_here```

Replace your_api_key_here with your Financial Modeling Prep API key. You can your API key by signing up at [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements)

5. Run the Project: Start the React development server:
```npm start```

This will open the app in your default browser at http://localhost:3000.

If you want to prepare the app for deployment, use the following command:
```npm run build```



