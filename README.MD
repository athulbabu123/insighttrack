# InsightTrack – Personal Finance Management System

InsightTrack is a **MERN-stack personal finance management application** that helps users manage income and expenses, track transactions, and visualize financial activity through an interactive dashboard. It also includes an admin panel for managing users, transactions, contact messages, and financial analytics.

## Table of contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Application architecture](#application-architecture)
- [Project structure](#project-structure)
- [State management](#state-management)
- [REST API integration](#rest-api-integration)
- [Transaction management](#transaction-management)
- [Authentication and protected routes](#authentication-and-protected-routes)
- [Admin panel](#admin-panel)
- [Dashboard and analytics](#dashboard-and-analytics)
- [API testing](#api-testing)
- [Installation and setup](#installation-and-setup)
- [Screenshots](#screenshots)
- [What I learned](#what-i-learned)
- [Future improvements](#future-improvements)
- [Project status](#project-status)
- [Author](#author)

## Features

### User features

- Register and log in
- Access a personal financial dashboard
- Add, edit, and delete income and expense transactions
- View transaction history
- Filter transactions by date:
  - Last 1, 2, or 3 weeks
  - Last month
  - Last 6 months
  - Last year
  - Custom date range
- Filter transactions by type: all, income, or expense
- View financial analytics and interactive charts

### Admin features

- Admin authentication and dashboard
- View and manage registered users
- View and manage user transactions
- View contact messages
- View financial analytics

### Analytics

InsightTrack provides visualizations and summaries of:

- Income and expenses
- Transaction categories
- Transaction trends
- Overall transaction activity

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | React.js, JavaScript, HTML5, CSS3, Bootstrap, Ant Design, React Router, Axios, Moment.js, charting libraries |
| Backend | Node.js, Express.js, REST APIs |
| Database | MongoDB, Mongoose |
| Development tools | Git, GitHub, Postman, Visual Studio Code |

## Application architecture

InsightTrack follows a client-server architecture. The React frontend communicates with the Express.js REST API over HTTP, and the backend uses Mongoose to access MongoDB.

```text
React frontend
      │
      │ HTTP requests (Axios)
      ▼
Express.js REST API
      │
      │ Mongoose
      ▼
MongoDB
```

## Project structure

```text
InsightTrack/
├── client/              # React frontend
├── config/              # Application configuration
├── controllers/         # Request handling and business logic
├── middlewares/         # Express middleware
├── models/              # MongoDB/Mongoose models
├── routes/              # REST API routes
├── utils/               # Utility and helper functions
├── .env                 # Environment variables (create locally)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js            # Express server entry point
```

## State management

The application uses React's built-in state management with hooks such as `useState` and `useEffect`. Transaction screens maintain state for transaction data, loading status, filters, selected date range, transaction type, and edit-modal state.

```text
User interaction
      ↓
React state update
      ↓
API request
      ↓
Backend response
      ↓
State update
      ↓
UI re-render
```

The project does not currently use Redux or Redux Toolkit.

## REST API integration

The frontend uses Axios to communicate with the backend REST API. Transaction-related endpoints include:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/transactions/add-transaction` | Create a transaction |
| `POST` | `/transactions/get-transaction` | Retrieve transactions |
| `POST` | `/transactions/edit-transaction` | Update a transaction |
| `POST` | `/transactions/delete-transaction` | Delete a transaction |

## Transaction management

Each transaction can include an amount, type, category, date, description, and associated user. Supported transaction types are **income** and **expense**.

Users can create, edit, delete, view, and filter transactions, then use the resulting data in financial analytics.

### Transaction filters

Transactions can be filtered by date (last 1, 2, or 3 weeks; last month; last 6 months; last year; or a custom date range) and by type (all, income, or expense). Applying filters triggers a transaction API request and updates the displayed results.

## Authentication and protected routes

InsightTrack provides separate authentication flows for users and administrators. Protected user pages check for user information in browser storage and redirect unauthenticated visitors to the appropriate page.

## Admin panel

The admin interface provides admin authentication, user and transaction management, contact-message viewing, and financial analytics. It uses React components and Ant Design components for parts of the interface.

## Dashboard and analytics

The user dashboard summarizes financial activity. Analytics and charts help users understand income, expenses, categories, transaction frequency, and overall financial activity.

## API testing

Backend REST APIs can be tested with Postman. A typical transaction workflow is:

```text
Create transaction
        ↓
Retrieve transactions
        ↓
Update transaction
        ↓
Delete transaction
```

## Installation and setup

### Prerequisites

- Node.js and npm
- A MongoDB connection string

### 1. Clone the repository

```bash
git clone https://github.com/athulbabu123/insighttrack.git
cd insighttrack
```

### 2. Install dependencies

Install the backend dependencies from the project root:

```bash
npm install
```

Install the frontend dependencies:

```bash
cd client
npm install
cd ..
```

### 3. Configure environment variables

Create a `.env` file in the project root and provide your MongoDB connection string and desired port:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Add any other environment variables required by the application configuration.

### 4. Start the backend

From the project root:

```bash
npm start
```

### 5. Start the frontend

In another terminal:

```bash
cd client
npm start
```

The frontend development server will print the local URL where the application can be accessed.

## Screenshots

Screenshots can be added here to show the landing page, user dashboard, transactions, analytics, and admin dashboard.

## What I learned

- Building a full-stack application with the MERN stack
- Developing React components and pages
- Managing UI state with React hooks
- Building REST APIs with Express.js
- Working with MongoDB and Mongoose
- Implementing CRUD operations and handling asynchronous API requests
- Integrating a React frontend with REST APIs
- Implementing authentication and protected routes
- Managing and visualizing financial transaction data
- Using React Router, Ant Design, and Bootstrap
- Testing APIs with Postman and working with Git and GitHub
- Structuring a full-stack web application

## Future improvements

- Implement Redux Toolkit for centralized state management
- Improve authentication and authorization
- Add advanced financial reports and monthly/yearly summaries
- Add budget management and financial goals
- Improve form validation and error handling
- Add automated testing
- Improve responsive design
- Deploy with a production-ready configuration

## Project status

**Completed personal project.** InsightTrack was developed as a practical full-stack project to gain hands-on experience with the MERN stack, REST APIs, database operations, authentication, and financial data visualization.

## Author

**Athul Babu**

- GitHub: [athulbabu123](https://github.com/athulbabu123)
- LinkedIn: [Athul Babu](https://www.linkedin.com/in/athulbabu123/)